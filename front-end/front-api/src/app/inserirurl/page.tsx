// app/inserirurl/page.tsx
"use client";

import { useState } from "react";
import SuccessModal from "../../components/SucessModal";
import ImageUploadButton from "../../components/ImageUploadButton";
import { useRouter } from "next/navigation";

export default function InserirUrl() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<'url' | 'image'>('url');

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    if (file) {
      console.log("Imagem selecionada:", file.name);
      setError(""); // Limpa erros quando imagem é selecionada
    } else {
      console.log("Imagem removida");
    }
  };

  const handleModeChange = (mode: 'url' | 'image') => {
    setInputMode(mode);
    setError(""); // Limpa erros ao mudar o modo
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validação baseada no modo atual
    if (inputMode === 'url') {
      const input = e.currentTarget.elements.namedItem("url") as HTMLInputElement;

      if (!input.value) {
        setError("Por favor, insira a URL do seu sistema.");
        return;
      }

      try {
        const url = new URL(input.value);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Protocolo inválido.");
        }
      } catch (e) {
        setError("Ops, essa URL não parece válida. (ex: https://meusite.com)");
        return;
      }
    } else {
      // Modo imagem
      if (!selectedImage) {
        setError("Por favor, selecione uma imagem.");
        return;
      }
    }

    setError("");
    
    // Log dos dados baseado no modo
    if (inputMode === 'url') {
      const input = e.currentTarget.elements.namedItem("url") as HTMLInputElement;
      console.log("URL salva:", input.value);
    } else {
      console.log("Imagem salva:", selectedImage?.name);
    }
    
    setIsModalOpen(true);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
  };

  const getTitle = () => {
    return inputMode === 'url' ? "Inserir URL" : "Enviar Imagem";
  };

  const getDescription = () => {
    return inputMode === 'url' 
      ? "Cole a URL principal do seu site ou sistema."
      : "Faça upload de uma imagem do seu sistema.";
  };

  const getPlaceholder = () => {
    return inputMode === 'url' 
      ? "https://meusite.com"
      : "URL não necessária quando imagem é enviada";
  };

  return (
    <div className="relative min-h-screen bg-gray-900 font-sans dark:bg-black">
      {/* Botão de Upload de Imagem */}
      <ImageUploadButton 
        onImageSelect={handleImageSelect} 
        onModeChange={handleModeChange}
        currentMode={inputMode}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{getTitle()}</h1>
            <p className="mt-2 font-medium text-lg text-gray-300">
              {getDescription()}
            </p>
            
            {/* Indicador de Modo Ativo */}
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
              <div className={`w-2 h-2 rounded-full ${
                inputMode === 'url' ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-gray-300">
                Modo: {inputMode === 'url' ? 'URL' : 'Imagem'}
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="url" className="sr-only">
                {inputMode === 'url' ? "URL do Sistema" : "Campo desativado - Modo Imagem"}
              </label>

              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="text" 
                  autoComplete="off"
                  onInput={handleInput}
                  disabled={inputMode === 'image'}
                  className={`
                    block w-full rounded-full p-4 px-5 font-medium 
                    placeholder:text-gray-400 shadow-sm ring-1 sm:text-sm sm:leading-6 transition-all
                    ${
                      inputMode === 'image'
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed ring-gray-600'
                        : error
                          ? 'bg-gray-800 text-white ring-red-500 focus:ring-red-500'
                          : 'bg-gray-800 text-white ring-white/20 focus:ring-blue-500 focus:ring-2'
                    }
                  `}
                  placeholder={getPlaceholder()}
                  title={
                    inputMode === 'image' 
                      ? "Campo desativado - Você está no modo imagem" 
                      : "Campo para inserir a URL principal do seu sistema."
                  }
                  aria-label={
                    inputMode === 'image' 
                      ? "Campo desativado no modo imagem" 
                      : "Campo para URL do Sistema"
                  }
                />
              </div>

              {error && (
                <p className="mt-2 pl-4 text-sm text-red-400">{error}</p>
              )}

              {inputMode === 'image' && selectedImage && (
                <p className="mt-2 pl-4 text-sm text-green-400">
                  ✓ Imagem "{selectedImage.name}" selecionada. URL não é necessária.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 ease-in-out transition-all hover:scale-110 duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                title={`Clique para enviar ${inputMode === 'url' ? 'a URL' : 'a imagem'}.`}
              >
                {inputMode === 'url' ? 'Enviar URL' : 'Enviar Imagem'}
              </button>
            </div>
          </form>

          {/* Informação sobre os modos */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Como funciona:</h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• <span className="text-blue-400">Modo URL</span>: Insira o endereço do seu sistema</li>
              <li>• <span className="text-green-400">Modo Imagem</span>: Faça upload de uma captura de tela</li>
              <li>• Apenas um dos métodos é necessário</li>
            </ul>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        title={`${inputMode === 'url' ? 'URL' : 'Imagem'} Salva!`}
        message={`Sua ${inputMode === 'url' ? 'URL' : 'imagem'} foi salva com sucesso e está pronta para ser usada.`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          router.push("/resultIa");
        }}
      />
    </div>
  );
}