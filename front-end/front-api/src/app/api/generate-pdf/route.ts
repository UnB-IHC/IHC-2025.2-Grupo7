import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { marked } from "marked";

// =========================================================
// FUNÇÕES DE LIMPEZA E ESTILO
// =========================================================

// Limpa caracteres que quebram o pdf-lib e converte símbolos não-WinAnsi.
function sanitize(text: string) {
  return text
    // 1. Remove control chars invisíveis e caractere inválido ""
    .replace(/[^\P{C}\n]/gu, "") 
    .replace(/\uFFFD/g, "")      
    .replace(/\r/g, "")          
    .replace(/\t/g, "    ")      

    // 2. Substitui SÍMBOLOS NÃO-WINANSI por equivalentes ASCII seguros
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/—/g, '--') 
    .replace(/–/g, '-') 
    .replace(/“/g, '"') 
    .replace(/”/g, '"') 
    .replace(/‘/g, "'") 
    .replace(/’/g, "'") 
    .replace(/…/g, '...') 
    .replace(/©/g, '(c)')

    .normalize("NFC");           
}

// Remove apenas a sintaxe de negrito/itálico/inline code para blocos onde o estilo é fixo (como títulos)
function stripMarkdownInline(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "$1")   // remove bold markdown
        .replace(/\*(.*?)\*/g, "$1")       // remove italic markdown
        .replace(/__(.*?)__/g, "$1")
        .replace(/_(.*?)_/g, "$1")
        .replace(/~~(.*?)~~/g, "$1")
        .replace(/`(.*?)`/g, "$1")         // inline code
        .replace(/\n/g, ' ') // Substitui \n por espaço
        .replace(/ +/g, ' ')
        .trim();
}

// =========================================================
// HANDLER PRINCIPAL
// =========================================================

export async function POST(request: Request) {
  try {
    let { markdown } = await request.json();

    if (!markdown || typeof markdown !== "string") {
      return new Response(JSON.stringify({ error: "Markdown is required" }), {
        status: 400,
      });
    }

    // PASSO CRUCIAL: Aplica a sanitização logo no início.
    markdown = sanitize(markdown);

    // --- cria PDF ---
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const margin = 40;
    let y = page.getHeight() - margin;
    const maxWidth = page.getWidth() - margin * 2; 
    const lineHeightRatio = 4; // Espaço extra para a linha (size + 4)

    function newPage() {
      page = pdfDoc.addPage();
      y = page.getHeight() - margin;
    }
    
    // --- FUNÇÃO PARA DESENHO DE TEXTO PLANO (Usada por títulos e código) ---
    // A função 'draw' original é renomeada e simplificada, pois 'drawRichText' fará o trabalho pesado.
    function drawPlainTextBlock(text: string, size: number, f = font, indent = 0) {
        const words = text.split(" ");
        const lines: string[] = [];
        let current = "";

        // 1. Wrapping (envolvimento de linha)
        for (const w of words) {
            const test = current ? `${current} ${w}` : w;
            if (f.widthOfTextAtSize(test, size) > maxWidth) {
                if (current) lines.push(current);
                current = w;
            } else current = test;
        }
        if (current) lines.push(current);
        
        // 2. Drawing (desenho)
        for (const line of lines) {
            const h = size + lineHeightRatio;
            if (y - h <= margin) newPage();

            page.drawText(line, {
                x: margin + indent,
                y,
                size,
                font: f,
                color: rgb(0, 0, 0),
            });
            y -= h;
        }

        y -= 6;
    }
    
    // --- FUNÇÃO PARA DESENHO DE RICH TEXT (Usada por parágrafos e listas) ---
    // --- FUNÇÃO PARA DESENHO DE RICH TEXT (Corrigida para listas) ---
function drawRichText(text: string, size: number, f = font, bF = boldFont, indent = 0) {
    
    // Divide o texto de entrada por quebras de linha LITERAIS.
    // Isso garante que cada item de uma lista (ou linha de um tópico) seja tratado separadamente.
    const linesToDraw = text.split('\n');

    let currentY = y; // Usa a posição y global atual
    const h = size + lineHeightRatio; 

    function drawLine(line: { word: string, font: any }[]) {
        if (currentY - h <= margin) {
            newPage();
            currentY = y;
        }

        let xOffset = margin + indent;
        
        for (const segment of line) {
            page.drawText(segment.word, {
                x: xOffset,
                y: currentY,
                size,
                font: segment.font,
                color: rgb(0, 0, 0),
            });
            // Adiciona a largura da palavra + espaço
            xOffset += segment.font.widthOfTextAtSize(segment.word + ' ', size);
        }
        
        currentY -= h;
    }

    // Processa cada linha de texto como um bloco separado
    for (const singleLineText of linesToDraw) {
        if (singleLineText.trim().length === 0) continue;

        // 1. Prepara segmentos para análise inline (usando **bold** como delimitador)
        const rawSegments = singleLineText
            .replace(/ +/g, ' ')
            .trim()
            .split(/(\*\*.*?\*\*)/g)
            .filter(s => s.length > 0);

        const fullSegments = rawSegments.map(s => {
            const isBold = s.startsWith('**') && s.endsWith('**');
            return {
                text: isBold ? stripMarkdownInline(s) : s, 
                font: isBold ? bF : f,
            };
        });

        // 2. Processa segmentos palavra por palavra para line wrapping
        let currentLine: { word: string, font: any }[] = [];
        
        for (const seg of fullSegments) {
            const words = seg.text.split(' ').filter(w => w.length > 0); 
            
            for (const word of words) {
                
                let testWidth = 0;
                for (const item of currentLine) {
                     testWidth += item.font.widthOfTextAtSize(item.word + ' ', size);
                }
                
                testWidth += seg.font.widthOfTextAtSize(word, size);
                
                if (currentLine.length > 0 && testWidth > maxWidth) {
                    // Quebra de linha por limite de largura
                    drawLine(currentLine);
                    currentLine = [{ word: word, font: seg.font }];
                } else {
                    // Adiciona à linha
                    currentLine.push({ word: word, font: seg.font });
                }
            }
        }

        // Desenha qualquer linha restante do segmento atual
        if (currentLine.length > 0) {
            drawLine(currentLine);
        }
        
        // Adiciona um espaço extra entre os itens da lista, se aplicável,
        // mas a drawLine já cuida do espaçamento básico h.
    }
    
    // Atualiza a posição 'y' global
    y = currentY - 6; 
}

    // --- TOKENIZA MARKDOWN ---
    const tokens = marked.lexer(markdown);

    for (const token of tokens) {
        
        // TITULOS: Usa a função drawPlainTextBlock com boldFont
        if (token.type === "heading") {
          const size = token.depth === 1 ? 26 : token.depth === 2 ? 20 : 16;
          // Usa stripMarkdownInline para remover ** do título, mas mantém boldFont
          drawPlainTextBlock(stripMarkdownInline(token.text), size, boldFont);
        }

        // PARÁGRAFOS: Usa a nova função drawRichText
        if (token.type === "paragraph") {
          drawRichText(token.text, 12, font, boldFont);
        }

        // LISTAS: Usa a nova função drawRichText com indentação
        if (token.type === "list") {
          for (const item of token.items) {
            drawRichText("• " + item.text, 12, font, boldFont, 15);
          }
        }

        // BLOCKQUOTE: Usa a nova função drawRichText com indentação
        if (token.type === "blockquote") {
          drawRichText(token.text, 12, font, boldFont, 20);
        }

        // CÓDIGO: Usa a função drawPlainTextBlock com tamanho 10
        if (token.type === "code") {
          const codeLines = token.text.split("\n");
          for (const line of codeLines) {
            drawPlainTextBlock(line, 10, font, 15);
          }
        }

        // HR (linha horizontal)
        if (token.type === "hr") {
          if (y - 20 <= margin) newPage();
          page.drawLine({
            start: { x: margin, y },
            end: { x: page.getWidth() - margin, y },
            thickness: 1,
            color: rgb(0.2, 0.2, 0.2),
          });
          y -= 20;
        }
      }

      const pdfBytes = await pdfDoc.save();

  // cria um ArrayBuffer normal (remove SharedArrayBuffer)
      const safeBuffer = pdfBytes.slice().buffer;

      return new Response(safeBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=report.pdf",
        },
      });

    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
        status: 500,
      });
  }
}