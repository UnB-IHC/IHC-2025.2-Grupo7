import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Limpa caracteres que quebram PDF
function sanitize(text: string) {
  return text
    .replace(/[^\P{C}\n]/gu, "") // remove control chars invisíveis
    .replace(/\uFFFD/g, "")      // remove caractere inválido "�"
    .replace(/\r/g, "")          // remove CR
    .replace(/\t/g, "    ")      // tab → espaços
    .normalize("NFC");           // normaliza unicode
}

// Remove HTML caso venha algo misturado
function cleanText(text: string) {
  return text
    .replace(/<\/?[^>]+>/g, " ") 
    .replace(/[ ]+/g, " ")
    .trim();
}

export async function POST(request: Request) {
  try {
    let { markdown } = await request.json();

    if (!markdown || typeof markdown !== "string") {
      return new Response(
        JSON.stringify({ error: "Markdown (string) is required" }),
        { status: 400 }
      );
    }

    // Protege o PDF contra caracteres que quebram pdf-lib
    markdown = sanitize(markdown);

    // Cria PDF
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const margin = 40;
    let y = page.getHeight() - margin;
    let maxWidth = page.getWidth() - margin * 2;

    function newPage() {
      page = pdfDoc.addPage();
      y = page.getHeight() - margin;
      maxWidth = page.getWidth() - margin * 2;
    }

    function wrap(text: string, size: number) {
      const words = text.split(" ");
      const lines: string[] = [];
      let current = "";

      for (const w of words) {
        const test = current ? `${current} ${w}` : w;
        
        if (font.widthOfTextAtSize(test, size) > maxWidth) {
          if (current) lines.push(current);
          current = w;
        } else {
          current = test;
        }
      }

      if (current) lines.push(current);
      return lines;
    }

    function draw(text: string, size = 12) {
      const lines = wrap(text, size);

      for (const line of lines) {
        const height = size + 4;

        if (y - height <= margin) {
          newPage();
        }

        page.drawText(line, {
          x: margin,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });

        y -= height;
      }

      y -= 8;
    }

    // Mantém as quebras originais do texto da IA
    const paragraphs = markdown.split(/\n/);

    for (const p of paragraphs) {
      const cleaned = cleanText(p);
      if (cleaned.length > 0) draw(cleaned, 12);
    }

    // Finaliza o PDF
    const pdfBytes = await pdfDoc.save();
    const buffer = pdfBytes.slice().buffer;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=output.pdf",
      },
    });

  } catch (err) {
    console.error("PDF generation error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF" }),
      { status: 500 }
    );
  }
}
