"use client";

import MarkdownView from "./MarkdownView";
import { useState } from "react";

type FormProps = {
  actionHTML: (formData: FormData) => Promise<string>;
  actionImage: (base64Image: string) => Promise<string>;
};  


export default function Page({ actionHTML, actionImage }: FormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultado, setResultado] = useState("");
  const [html, setHtml] = useState(true);
  const [print, setPrint] = useState(false);
  const changeToHtml = () => {
    if(!html) {
        setHtml(true);
        setPrint(false);
    }
  }; 

  const changeToPrint = () => {
    if(!print) {
        setPrint(true);
        setHtml(false);
    }
  };

  const handleClick = () => {
    async function downloadPDF(markdown: string) {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "meu-pdf.pdf";
      a.click();
    }
    downloadPDF(resultado);
  }
  return (
    <div className="h-full w-full bg-black text-white flex flex-col items-center justify-center gap-4 p-6">
        <div className="flex gap-1.5">
            <button onClick={changeToHtml} className="w-15 h-10 bg-white text-black transition hover:scale-105 rounded-2xl">HTML</button>
            <button onClick={changeToPrint} className="w-15 h-10 bg-white text-black  transition hover:scale-105 rounded-2xl">Print</button>
        </div>
        {html && (
            <form
                action={async (formData) => {
                    const r = await actionHTML(formData);
                    setResultado(r);
                }}
                className="mx-10 mt-5 w-full max-w-md"
                >
                <input
                    type="text"
                    name="pergunta"
                    placeholder="Qual a URL?"
                    className="h-10 w-full pl-5 bg-white text-black rounded-xl"
                />
            </form>
        )}
        {print && (
            <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                    const base64 = await fileToBase64(selected);
                    const base64Data = base64.split(",")[1];

                    setPreview(URL.createObjectURL(selected));

                    const result = await actionImage(base64Data);
                    setResultado(result);
                }
          }}
            className="w-md bg-white text-gray-400 rounded-xl py-2 px-4 mt-5"
            />
        )}
        
        {resultado && (
            <>
              <MarkdownView content={resultado}/>
              <button onClick={handleClick} className="h-20 w-20 bg-purple-800">BAIXAKI</button>
            </>
        )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}