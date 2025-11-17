"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadButton from "../../components/ImageUploadButton";
import SuccessModal from "../../components/SucessModal";
import MarkdownView from "../../components/MarkdownView";

type FormProps = {
  actionHTML: (formData: FormData) => Promise<string>;
  actionImage: (base64Image: string) => Promise<string>;
};

export default function Page({ actionHTML, actionImage }: FormProps) {
  const router = useRouter();

  const [inputMode, setInputMode] = useState<'url' | 'image'>('url');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultado, setResultado] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (file: File | null) => {
    setSelectedImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError("");
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
  };

  const handleModeChange = (mode: 'url' | 'image') => {
    setInputMode(mode);
    setError("");
  };

  async function handleSubmitUrl(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const input = e.currentTarget.elements.namedItem("url") as HTMLInputElement | null;
    const value = input?.value ?? "";

    if (!value) {
      setError("Por favor, insira a URL do seu sistema.");
      return;
    }

    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Protocolo inválido");
      }
    } catch (err) {
      setError("Ops, essa URL não parece válida. (ex: https://meusite.com)");
      return;
    }

    try {
      setIsSubmitting(true);
      const form = new FormData();
      form.set("pergunta", value);
      const r = await actionHTML(form);
      setResultado(r);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setError("Falha ao analisar a URL. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitImage() {
    setError("");

    if (!selectedImageFile) {
      setError("Por favor, selecione uma imagem.");
      return;
    }

    try {
      setIsSubmitting(true);
      const base64 = await fileToBase64(selectedImageFile);
      const base64Data = base64.split(",")[1] ?? "";
      const r = await actionImage(base64Data);
      setResultado(r);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setError("Falha ao enviar a imagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDownloadPdf = () => {
    async function downloadPDF(markdown: string) {
      try {
        const res = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown }),
        });

        if (!res.ok) throw new Error("failed to generate pdf");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "meu-pdf.pdf";
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        setError("Erro ao gerar o PDF.");
      }
    }
    downloadPDF(resultado);
  };

  function handleModalConfirm() {
    setIsModalOpen(false);
    // mantém o comportamento original que redireciona para /resultIa
    router.push("/resultIa");
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="relative min-h-screen bg-gray-900 font-sans">
      <ImageUploadButton
        onImageSelect={handleImageSelect}
        onModeChange={handleModeChange}
        currentMode={inputMode}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{inputMode === 'url' ? 'Inserir URL' : 'Enviar Imagem'}</h1>
            <p className="mt-2 font-medium text-lg text-gray-300">{inputMode === 'url' ? 'Cole a URL principal do seu site ou sistema.' : 'Faça upload de uma imagem do seu sistema.'}</p>

            <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
              <div className={`w-2 h-2 rounded-full ${inputMode === 'url' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-300">Modo: {inputMode === 'url' ? 'URL' : 'Imagem'}</span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmitUrl}>
            <div>
              <label htmlFor="url" className="sr-only">URL</label>

              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="text"
                  autoComplete="off"
                  disabled={inputMode === 'image'}
                  className={`block w-full rounded-full p-4 px-5 font-medium placeholder:text-gray-400 shadow-sm ring-1 sm:text-sm sm:leading-6 transition-all ${inputMode === 'image' ? 'bg-gray-700 text-gray-400 cursor-not-allowed ring-gray-600' : error ? 'bg-gray-800 text-white ring-red-500 focus:ring-red-500' : 'bg-gray-800 text-white ring-white/20 focus:ring-blue-500 focus:ring-2'}`}
                  placeholder={inputMode === 'url' ? 'https://meusite.com' : 'URL não necessária quando imagem é enviada'}
                  title={inputMode === 'image' ? "Campo desativado - Você está no modo imagem" : "Campo para inserir a URL principal do seu sistema."}
                  aria-label={inputMode === 'image' ? "Campo desativado no modo imagem" : "Campo para URL do Sistema"}
                />
              </div>

              {error && (
                <p className="mt-2 pl-4 text-sm text-red-400">{error}</p>
              )}

              {inputMode === 'image' && selectedImageFile && (
                <p className="mt-2 pl-4 text-sm text-green-400">✓ Imagem "{selectedImageFile.name}" selecionada. URL não é necessária.</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={inputMode === 'image' || isSubmitting}
                className="flex-1 justify-center rounded-md bg-indigo-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 ease-in-out transition-all hover:scale-105 duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60"
                title="Clique para enviar a URL."
              >
                {isSubmitting && inputMode === 'url' ? 'Enviando...' : 'Enviar URL'}
              </button>

              <button
                type="button"
                onClick={handleSubmitImage}
                disabled={inputMode === 'url' || isSubmitting}
                className="flex-1 justify-center rounded-md bg-green-700 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-green-500 ease-in-out transition-all hover:scale-105 duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60"
                title="Clique para enviar a imagem selecionada."
              >
                {isSubmitting && inputMode === 'image' ? 'Enviando...' : 'Enviar Imagem'}
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Como funciona:</h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• <span className="text-blue-400">Modo URL</span>: Insira o endereço do seu sistema</li>
              <li>• <span className="text-green-400">Modo Imagem</span>: Faça upload de uma captura de tela</li>
              <li>• Apenas um dos métodos é necessário</li>
            </ul>
          </div>

          {resultado && (
            <div className="mt-6">
              <MarkdownView content={resultado} />

              <div className="mt-4 flex items-center gap-3">
                <button onClick={handleDownloadPdf} className="h-12 px-4 rounded-full bg-purple-800 hover:scale-105 transition-transform text-white">Baixar PDF</button>
                <button onClick={() => { setResultado(""); }} className="h-12 px-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white">Limpar</button>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300">Preview da imagem selecionada:</p>
                  <img src={previewUrl} alt="preview" className="mt-2 w-40 h-40 object-cover rounded-md border border-white/20" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        title={`${inputMode === 'url' ? 'URL' : 'Imagem'} Salva!`}
        message={`Sua ${inputMode === 'url' ? 'URL' : 'imagem'} foi processada com sucesso.`}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}


// small helper
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
