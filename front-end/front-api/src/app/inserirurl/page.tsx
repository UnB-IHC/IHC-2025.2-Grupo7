"use client";

import { useState } from "react";

import SuccessModal from "../../components/SucessModal"; 
import { useRouter } from "next/navigation";

export default function InserirUrl() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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


    setError("");
    console.log("URL salva:", input.value);
    setIsModalOpen(true);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 font-sans dark:bg-black">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Inserir URL</h1>
            <p className="mt-2 font-medium text-lg text-gray-300">
              Cole a URL principal do seu site ou sistema.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="url" className="sr-only">
                URL do Sistema
              </label>

              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="text" 
                  autoComplete="off"
                  onInput={handleInput}
                  className={`
                    block w-full rounded-full bg-gray-800 p-4 px-5 text-white font-medium 
                    placeholder:text-gray-400 shadow-sm ring-1 sm:text-sm sm:leading-6 transition-all
                    ${
                      error
                        ? "ring-red-500 focus:ring-red-500"
                        : "ring-white/20 focus:ring-blue-500 focus:ring-2"
                    }
                  `}
                  placeholder="https://meusite.com"
                  title="Campo para inserir a URL principal do seu sistema."
                  aria-label="Campo para URL do Sistema"
                />
              </div>

              {error && (
                <p className="mt-2 pl-4 text-sm text-red-400">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 ease-in-out transition-all hover:scale-110 duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                title="Clique para enviar a URL."
              >
                Enviar link
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        title="URL Salva!"
        message="Sua URL foi salva com sucesso e está pronta para ser usada."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          router.push("/resultIa");
        }}
      />
    </div>
  );
}