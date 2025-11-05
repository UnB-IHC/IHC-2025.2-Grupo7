// app/page.tsx

"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SuccessModal from "../components/SucessModal";
import { useRouter } from "next/navigation";
export default function Home() {
  
  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const input = e.currentTarget.elements.namedItem(
      "api-token",
    ) as HTMLInputElement;

    if (!input.value) {
      setError("Ei, parece que você esqueceu de colar sua chave da API aqui! 🔑");
    } else {

      setError("");
      console.log("Token salvo:", input.value);
      setIsModalOpen(true);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-800 font-sans dark:bg-black">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Configuração da API
            </h1>
            <p className="mt-2 font-medium text-lg text-gray-300">
              Insira seu token do Google AI Studio abaixo.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                    ${
                      error
                        ? "ring-red-500 focus:ring-red-500" 
                        : "ring-white/20 focus:ring-blue-500 focus:ring-2" 
                    }
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

              {error && (
                <p className="mt-2 pl-4 text-sm text-red-400">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 ease-in-out transition-all hover:scale-110 duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                title="Clique para salvar e validar sua chave de API."
              >
                Enviar token
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
        title="Envio Confirmado!"
        message="Seu token da API foi salvo com sucesso e já pode ser usado."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          router.push("/inserirurl");
        }}
      />
    </div>
  );
}