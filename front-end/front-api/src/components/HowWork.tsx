export function HowWork() {
    return(
      <div className="flex flex-col w-full max-w-[500px] bg-gray-800 p-4 rounded-lg justify-start px-10">
        <h3 className="font-semibold text-white">Como funciona:</h3>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 py-3 text-left">
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
    );
}