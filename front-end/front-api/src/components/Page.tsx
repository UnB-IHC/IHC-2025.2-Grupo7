"use client";

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
    if (!html) {
      setHtml(true);
      setPrint(false);
      setResultado("");
    }
  };

  const changeToPrint = () => {
    if (!print) {
      setPrint(true);
      setHtml(false);
      setResultado("");
    }
  };

  const [loading, setLoading] = useState(false);

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
    setResultado("");
  };

  // ----- NENHUMA LÓGICA FOI ALTERADA ACIMA -----

  return (
    <div className="h-full min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      
      {/* Botões de seleção de modo */}
      <div className="flex gap-3">
        <button
          onClick={changeToHtml}
          className={`py-2 px-5 rounded-lg cursor-pointer text-white font-medium transition-all ${
            html
              ? "bg-blue-600 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          HTML
        </button>
        <button
          onClick={changeToPrint}
          className={`py-2 px-5 rounded-lg cursor-pointer text-white font-medium transition-all ${
            print
              ? "bg-emerald-600 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Print
        </button>
      </div>

      {/* --- MODO HTML (URL) --- */}
      {html && (
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mt-4">Inserir URL</h1>
          <p className="text-gray-400 mt-2">
            Cole a URL principal do seu site ou sistema.
          </p>
          <div className="mt-4 text-xs font-medium py-1 px-3 bg-blue-900 text-blue-300 rounded-full">
            • Modo: URL
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault(); // impede o server action
              setLoading(true);

              const formData = new FormData(e.currentTarget);
              const r = await actionHTML(formData);

              setResultado(r);
              setLoading(false);
            }}
            className="mt-5 w-full"
          >

            <input
              type="text"
              name="pergunta"
              placeholder="https://meusite.com"
              className="h-14 w-full px-5 bg-gray-800 border border-gray-700 text-white rounded-full placeholder-gray-500 text-base"
            />
            {/* O 'action' do form cuida do envio, sem precisar de botão extra */}
          </form>
        </div>
      )}

      {/* --- MODO PRINT (IMAGEM) --- */}
      {print && (
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mt-4">Inserir Imagem</h1>
          <p className="text-gray-400 mt-2">
            Faça upload de uma captura de tela.
          </p>
          <div className="mt-4 text-xs font-medium py-1 px-3 bg-green-900 text-green-300 rounded-full">
            • Modo: Imagem
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const selected = e.target.files?.[0];
              if (!selected) return;

              setLoading(true);          // ativa spinner imediatamente

              await new Promise(res => setTimeout(res, 20));
              // ^ dá tempo do React atualizar a UI (re-render) antes do async pesado

              const base64 = await fileToBase64(selected);
              const base64Data = base64.split(",")[1];

              setPreview(URL.createObjectURL(selected));

              const result = await actionImage(base64Data);
              setResultado(result);

              setLoading(false);         // desativa spinner
            }}
            className="mt-6 block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-emerald-700 file:text-white hover:file:bg-emerald-900 duration-300 transition-colors
              cursor-pointer"
          />
        </div>
      )}

      {/* --- Bloco "Como Funciona" --- */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg mt-6">
        <h3 className="font-semibold text-white">Como funciona:</h3>
        <ul className="list-disc list-inside mt-2 text-gray-300 text-sm space-y-1">
          <li>
            <span className="font-semibold text-blue-400">Modo URL:</span>{" "}
            Insira o endereço do seu sistema
          </li>
          <li>
            <span className="font-semibold text-green-400">Modo Imagem:</span>{" "}
            Faça upload de uma captura de tela
          </li>
          <li>Apenas um dos métodos é necessário</li>
          <li>Para o modo foto, o tamanho máximo é <strong>200 KB</strong></li>
        </ul>
      </div>
    
      {!loading && !resultado && (
        <div className="h-12"></div>
      )}

      {loading && (
            <div className="flex justify-center items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-400 border-t-transparent"></div>
            </div>
      )}

      {resultado && (
        <div className="w-full max-w-3xl flex flex-col items-center gap-4 mt-6">
          <button
            onClick={handleClick}
            className="h-12 px-8 bg-gray-400 text-white font-bold rounded-lg transition hover:bg-gray-700 cursor-pointer"
          >
            Baixar PDF
          </button>
        </div>
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