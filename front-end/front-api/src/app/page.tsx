// app/page.tsx
"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SuccessModal from "../components/SucessModal";
import ImageUploadButton from "../components/ImageUploadButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<'url' | 'image'>('url');

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    if (file) {
      console.log("Imagem selecionada:", file.name);
      setError("");
    } else {
      console.log("Imagem removida");
    }
  };

  const handleModeChange = (mode: 'url' | 'image') => {
    setInputMode(mode);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    // Validação do token (sempre necessário)
    const input = e.currentTarget.elements.namedItem(
      "api-token",
    ) as HTMLInputElement;

    if (!input.value) {
      setError("Ei, parece que você esqueceu de colar sua chave da API aqui! 🔑");
      return;
    }

    // Validação do modo (URL ou Imagem)
    if (inputMode === 'url') {
      const urlInput = e.currentTarget.elements.namedItem("url") as HTMLInputElement;
      
      if (!urlInput.value) {
        setError("Por favor, insira a URL do seu sistema.");
        return;
      }

      try {
        const url = new URL(urlInput.value);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Protocolo inválido.");
        }
      } catch (e) {
        setError("Ops, essa URL não parece válida. (ex: https://meusite.com)");
        return;
      }
    } else {
      if (!selectedImage) {
        setError("Por favor, selecione uma imagem.");
        return;
      }
    }

    setError("");
    console.log("Token salvo:", input.value);
    
    if (inputMode === 'url') {
      const urlInput = e.currentTarget.elements.namedItem("url") as HTMLInputElement;
      console.log("URL salva:", urlInput.value);
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

  return (
    <div className="relative min-h-screen bg-gray-800 font-sans dark:bg-black">
      {/* Botão de Upload de Imagem */}
      <ImageUploadButton 
        onImageSelect={handleImageSelect} 
        onModeChange={handleModeChange}
        currentMode={inputMode}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Configuração da API
            </h1>
            <p className="mt-2 font-medium text-lg text-gray-300">
              Insira seu token do Google AI Studio abaixo.
            </p>
            
            {/* Indicador de Modo Ativo */}
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full">
              <div className={`w-2 h-2 rounded-full ${
                inputMode === 'url' ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-gray-300">
                Modo: {inputMode === 'url' ? 'URL' : 'Imagem'}
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Campo do Token (sempre visível) */}
            <div>
              <label htmlFor="api-token" className="sr-only">
                Chave da API
              </label>

              <div className="relative mt-2">
                <input
                  id="api-token"
                  name="api-token"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  onInput={handleInput} 
                  className={`
                    block w-full rounded-full bg-gray-900 p-4 pl-5 pr-12 text-white font-medium 
                    placeholder:text-gray-400 shadow-sm ring-1 sm:text-sm sm:leading-6 transition-all
                    ring-white/20 focus:ring-blue-500 focus:ring-2
                  `}
                  placeholder="Cole a chave da sua API aqui.."
                  title="Campo para inserir sua chave de API secreta do Google AI Studio."
                  aria-label="Campo para Chave da API do Google AI Studio"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-white cursor-pointer"
                  onClick={toggleVisibility}
                  title={showPassword ? "Esconder token" : "Mostrar token"}
                  aria-label="Alternar visibilidade da senha"
                >
                  {showPassword ? (
                    <IoEyeOff className="h-5 w-5" />
                  ) : (
                    <IoEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo da URL (apenas no modo URL) */}
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
                        : 'bg-gray-900 text-white ring-white/20 focus:ring-blue-500 focus:ring-2'
                    }
                  `}
                  placeholder={
                    inputMode === 'url' 
                      ? "https://meusite.com" 
                      : "URL não necessária quando imagem é enviada"
                  }
                  title={
                    inputMode === 'image' 
                      ? "Campo desativado - Você está no modo imagem" 
                      : "Campo para inserir a URL principal do seu sistema."
                  }
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 pl-4 text-sm text-red-400">{error}</p>
            )}

            {inputMode === 'image' && selectedImage && (
              <p className="mt-2 pl-4 text-sm text-green-400">
                ✓ Imagem "{selectedImage.name}" selecionada. URL não é necessária.
              </p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 ease-in-out transition-all hover:scale-110 duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                title="Clique para salvar e validar sua chave de API."
              >
                Enviar configurações
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-200 transition-colors hover:text-blue-400 hover:underline"
              title="Abre o Google AI Studio em uma nova aba para você gerar sua chave."
            >
              Não tem uma chave? Crie uma no Google AI Studio
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        title="Configuração Salva!"
        message="Suas configurações foram salvas com sucesso e já podem ser usadas."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          router.push("/inserirurl");
        }}
      />
    </div>
  );
}