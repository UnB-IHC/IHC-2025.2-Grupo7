'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMicrophone,
  HiOutlineCamera,
  HiOutlinePause,
  HiOutlinePlay,
} from 'react-icons/hi2';
import { IoContrast } from 'react-icons/io5';
import { FaSoundcloud } from 'react-icons/fa'; // <-- ADICIONADO
import { BsYoutube } from 'react-icons/bs'; // <-- ADICIONADO

// --- DADOS DO CARROSSEL ---
const carouselItems = [
  {
    title: 'ProSAME',
    description: 'Procedimento para Seleção e Adução de Missões Espaciais',
    imageUrl: 'https://placehold.co/1200x256/002244/FFFFFF?text=Slide+1',
  },
  {
    title: 'Missão Artemis',
    description: 'A participação do Brasil na exploração lunar.',
    imageUrl: 'https://placehold.co/1200x256/003366/EEEEFF?text=Slide+2',
  },
  {
    title: 'Novos Satélites',
    description: 'Monitoramento de queimadas e desmatamento.',
    imageUrl: 'https://placehold.co/1200x256/004488/DDDDFF?text=Slide+3',
  },
  {
    title: 'Indústria Espacial',
    description: 'Fomentando a inovação e startups no setor.',
    imageUrl: 'https://placehold.co/1200x256/002255/CCCCCC?text=Slide+4',
  },
];
const AUTOPLAY_INTERVAL = 5000;

// --- COMPONENTES DE ÍCONES SVG ---
const IconFacebook = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9.5h4v-9.5z" />
  </svg>
);

const IconInstagram = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const IconTwitter = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- Ícones de YouTube e SoundCloud removidos ---
// const IconYouTube = ... (REMOVIDO)
// const IconSoundCloud = ... (REMOVIDO)

const socialMediaLinks = [
  { name: 'Facebook', Icon: IconFacebook },
  { name: 'Instagram', Icon: IconInstagram },
  { name: 'Twitter', Icon: IconTwitter },
  { name: 'YouTube', Icon: BsYoutube }, // <-- ATUALIZADO
  { name: 'SoundCloud', Icon: FaSoundcloud }, // <-- ATUALIZADO
];

// --- NOVO: DADOS DAS ÁREAS TEMÁTICAS ---
const thematicAreas = [
  {
    name: 'Governo',
    imgSrc: '/govern.svg',
    altText: 'Ícone da área temática Governo',
  },
  {
    name: 'Capital Humano',
    imgSrc: '/human_capital.svg',
    altText: 'Ícone da área temática Capital Humano',
  },
  {
    name: 'Indústria',
    imgSrc: '/industria.svg',
    altText: 'Ícone da área temática Indústria',
  },
  {
    name: 'Desenvolvimento Tecnológico',
    imgSrc: '/dev_tec.svg',
    altText: 'Ícone da área temática Desenvolvimento Tecnológico',
  },
  {
    name: 'Pesquisa e Desenvolvimento',
    imgSrc: '/pesquisa.svg',
    altText: 'Ícone da área temática Pesquisa e Desenvolvimento',
  },
  {
    name: 'Sistemas Espaciais',
    imgSrc: '/sistemas.svg',
    altText: 'Ícone da área temática Sistemas Espaciais',
  },
];

// --- Componente da Página Principal ---
export default function ResultIA() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isHighContrast]);

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };

  // --- LÓGICA DO CARROSSEL ---
  const totalSlides = carouselItems.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // --- HOOK VLIBRAS (MAIS ROBUSTO) ---
  useEffect(() => {
    const VLIBRAS_ID = 'vlibras-plugin-container';
    const SCRIPT_ID = 'vlibras-plugin-script';

    // 1. Sua checagem original (que está correta)
    // Se o widget já foi injetado, não faz mais nada.
    // Isso resolve o problema do Strict Mode e da navegação.
    if (document.getElementById(VLIBRAS_ID)) {
      return;
    }

    // 2. Cria os DIVs (código original)
    const vwDiv = document.createElement('div');
    vwDiv.id = VLIBRAS_ID;
    vwDiv.setAttribute('vw', 'true');
    vwDiv.className = 'enabled';
    const vwAccessButton = document.createElement('div');
    vwAccessButton.setAttribute('vw-access-button', 'true');
    vwAccessButton.className = 'active';
    const vwPluginWrapper = document.createElement('div');
    vwPluginWrapper.setAttribute('vw-plugin-wrapper', 'true');
    const vwPluginTopWrapper = document.createElement('div');
    vwPluginTopWrapper.className = 'vw-plugin-top-wrapper';
    vwPluginWrapper.appendChild(vwPluginTopWrapper);
    vwDiv.appendChild(vwAccessButton);
    vwDiv.appendChild(vwPluginWrapper);
    document.body.appendChild(vwDiv);

    // 3. Cria o SCRIPT (código original)
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        try {
          new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
        } catch (e) {
          console.error('Erro ao inicializar o widget VLibras:', e);
        }
      } else {
        console.error(
          'Objeto VLibras não encontrado no window após carregar script.',
        );
      }
    };
    script.onerror = () => {
      console.error('Falha ao carregar o script do VLibras.');
    };
    document.body.appendChild(script);

    // 4. A FUNÇÃO DE LIMPEZA FOI REMOVIDA.
    // Não há mais "return () => { ... }"
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans dark:bg-black">
      {/* Skip Link (2.4.1) */}
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-50 rounded-md bg-white px-4 py-2 font-bold text-blue-900 ring-2 ring-blue-900 transition-all focus:not-sr-only dark:bg-black dark:text-yellow-300 dark:ring-yellow-300"
        title="Pular para o conteúdo principal"
      >
        Pular para o conteúdo principal
      </a>

      {/* 1. Header & Navegação */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-yellow-300 dark:bg-black">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Top Bar: Logo e Título */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo_oseb.svg"
                alt="Logo da Agência Espacial Brasileira (AEB)"
                title="Logo da Agência Espacial Brasileira (AEB)"
                className="h-15 w-15" // Seus estilos
              />
              <div>
                <div className="text-md text-gray-500 dark:text-gray-300">
                  AGÊNCIA ESPACIAL BRASILEIRA
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-yellow-300">
                  OBSERVATÓRIO DO SETOR ESPACIAL BRASILEIRO
                </div>
              </div>
            </div>

            {/* --- BOTÕES DE ACESSIBILIDADE --- */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleHighContrast}
                title="Ativar ou desativar modo de alto contraste"
                aria-label="Ativar ou desativar modo de alto contraste"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-300/20 dark:focus-visible:ring-yellow-300"
              >
                <IoContrast className="h-5 w-5" />
                Alto Contraste
              </button>
            </div>
          </div>

          {/* Bottom Bar: Links de Navegação */}
          <nav
            className="flex items-center justify-between py-2"
            aria-label="Navegação principal"
          >
            <ul className="flex gap-6 text-sm font-semibold text-blue-900 dark:text-yellow-300">
              {[
                'Sobre',
                'Setor Espacial',
                'Dados e Indicadores',
                'Publicações',
                'Notícias e Destaques',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    title={`Ir para a seção ${item}`}
                    className="rounded-md p-2 transition-colors duration-300 hover:bg-blue-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:hover:bg-yellow-300 dark:hover:text-black dark:focus-visible:ring-yellow-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <button
              title="Acessar área restrita ou fazer login"
              aria-label="Acessar área restrita ou fazer login"
              className="cursor-pointer rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 dark:bg-yellow-300 dark:text-black dark:font-bold dark:hover:bg-yellow-400 dark:focus-visible:ring-black"
            >
              Área Interna
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Conteúdo Principal */}
      <main
        id="main-content"
        className="container mx-auto max-w-7xl px-4 py-8"
      >
        {/* --- BARRA DE PESQUISA (ATUALIZADA) --- */}
        <section className="mb-8 flex justify-center" role="search">
          <div className="flex w-full max-w-xl items-center gap-2 rounded-md border border-gray-300 p-2 transition-all duration-150 focus-within:ring-2 focus-within:ring-blue-800 dark:border-yellow-300 dark:bg-black dark:focus-within:ring-yellow-300">
            <button
              title="Buscar"
              aria-label="Buscar"
              className="rounded-full p-1"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-600 dark:text-yellow-300" />
            </button>
            <input
              type="text"
              placeholder="O que você procura"
              title="Digite o que você procura"
              aria-label="Campo de busca principal"
              className="flex-1 bg-transparent p-0 outline-none dark:text-white dark:font-bold dark:placeholder-gray-400"
            />
            <button
              title="Buscar por voz"
              aria-label="Iniciar busca por voz"
              className="cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-blue-900 hover:text-white"
            >
              <HiOutlineMicrophone className="h-5 w-5 text-xl text-shadow-blue-800 dark:text-gray-400 dark:hover:text-yellow-300" />
            </button>
          </div>
        </section>

        {/* Seção do Carrossel (ProSAME) */}
        <section
          className="relative mb-8 h-64 overflow-hidden rounded-lg bg-gray-800 text-white dark:border dark:border-yellow-300 dark:bg-black"
          aria-label="Destaques principais"
        >
          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="relative h-full w-full flex-shrink-0"
              >
                <img
                  src={item.imageUrl}
                  alt={`Destaque: ${item.title} - ${item.description}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center bg-black/40 p-8">
                  <div className="max-w-md">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de Navegação (Esquerda/Direita) */}
          <button
            onClick={prevSlide}
            title="Slide anterior"
            aria-label="Ver slide anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-yellow-300/20 dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            title="Próximo slide"
            aria-label="Ver próximo slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-yellow-300/20 dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            <HiChevronRight className="h-6 w-6" />
          </button>

          {/* Botão de Pausar/Continuar (2.2.2) */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? 'Continuar slide' : 'Pausar slide'}
            aria-label={
              isPaused ? 'Continuar slide automático' : 'Pausar slide automático'
            }
            className="absolute bottom-4 left-4 cursor-pointer rounded-full bg-white/20 p-2 text-white hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-yellow-300/20 dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            {isPaused ? (
              <HiOutlinePlay className="h-6 w-6" />
            ) : (
              <HiOutlinePause className="h-6 w-6" />
            )}
          </button>

          {/* Indicadores (Bolinhas) */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                title={`Ir para o slide ${index + 1}`}
                aria-label={`Ir para o slide ${index + 1}: ${
                  carouselItems[index].title
                }`}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index
                    ? 'bg-white dark:bg-yellow-300'
                    : 'bg-white/50 dark:bg-yellow-300/50'
                } hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:hover:bg-yellow-300 dark:focus-visible:ring-yellow-300`}
              ></button>
            ))}
          </div>
        </section>

        {/* Seção de Cartões de Orçamento (Grid 2x2) */}
        <section
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          aria-label="Visão geral do orçamento"
        >
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg bg-blue-900 p-6 text-white dark:border dark:border-yellow-300 dark:bg-black"
              >
                <div>
                  <h3 className="mb-2 text-xl font-bold dark:text-yellow-300">
                    Visão geral de Orçamento Anual
                  </h3>
                  <p className="mb-4 text-sm text-blue-200 dark:text-gray-300">
                    Período de 20xx a 20xx
                  </p>
                </div>
                <a
                  href="#"
                  title="Ver detalhes do orçamento anual"
                  aria-label="Saiba mais sobre a Visão geral de Orçamento Anual"
                  className="self-start rounded-md bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-yellow-300/20 dark:text-yellow-300 dark:hover:bg-yellow-300/30 dark:focus-visible:ring-yellow-300"
                >
                  Saiba mais
                </a>
              </div>
            ))}
        </section>

        {/* --- SEÇÃO DE ÁREAS TEMÁTICAS (ATUALIZADA) --- */}
        <section className="mb-12 text-center">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">
            Áreas Temáticas
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* ATUALIZADO: Mapeando a nova array de objetos */}
            {thematicAreas.map(({ name, imgSrc, altText }) => (
              <a
                href="#"
                key={name}
                className="flex flex-col items-center rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:focus-visible:ring-yellow-300"
                title={`Área Temática: ${name}`}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#2969BD] text-blue-800 dark:border-white dark:bg-zinc-50 dark:text-yellow-300">
                  {/* ATUALIZADO: Substituído span por img */}
                  <img
                    src={imgSrc}
                    alt={altText}
                    className="h-20 w-20" // Ajustado para caber no círculo
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* --- SEÇÃO DE PUBLICAÇÕES --- */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">
            Publicações
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <a
                  href="#"
                  key={index}
                  className="h-64 rounded-lg bg-gray-200 shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 dark:focus-visible:ring-yellow-300"
                  title={`Ver Publicação ${index + 1}`}
                >
                  <img
                    src={`/publi${index + 1}.png`}
                    alt={`Capa da Publicação ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </a>
              ))}
          </div>
        </section>

        {/* --- SEÇÃO DE NOTÍCIAS --- */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">
            Notícias
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <a
                  href="#"
                  key={index}
                  className="block rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:border-yellow-300 dark:focus-visible:ring-yellow-300"
                  title={`Ler notícia: Título da Notícia ${index + 1}`}
                >
                  <div className="h-48 rounded-t-lg bg-blue-800 dark:bg-gray-800">
                    <img
                      src="/noticia.png"
                      alt={`Imagem da Notícia: Título da Notícia ${
                        index + 1
                      }`}
                      className="h-full w-full rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Título da Notícia {index + 1}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </a>
              ))}
          </div>
          <div className="mt-8 text-center">
            <button
              title="Ver mais notícias"
              aria-label="Ver todas as notícias"
              className="cursor-pointer rounded-md bg-blue-900 px-6 py-2 text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 dark:bg-yellow-300 dark:text-black dark:hover:bg-yellow-400 dark:focus-visible:ring-black"
            >
              Ver mais notícias
            </button>
          </div>
        </section>

        {/* --- SEÇÃO DE REDES SOCIAIS --- */}
        <section className="border-t pt-8 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Redes Sociais
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialMediaLinks.map(({ name, Icon }) => (
              <a
                key={name}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                title={`Acessar ${name} da AEB (abre em nova aba)`}
                aria-label={`Acessar o perfil da Agência Espacial Brasileira no ${name} (abre em nova aba)`}
                className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:border-yellow-300 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus-visible:ring-yellow-300"
              >
                {/* Esta renderização funciona perfeitamente
                  com os ícones do react-icons 
                */}
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* 3. Rodapé */}
      <footer className="mt-12 bg-gray-100 py-8 dark:border-t dark:border-yellow-300 dark:bg-black">
        <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 Observatório do Setor Espacial Brasileiro. Todos os direitos
          reservados.
          {/* Links de Mapa do Site e Acessibilidade (2.4.5) */}
          <div className="mt-4 space-x-6">
            <a
              href="/sitemap"
              title="Ver o mapa do site"
              className="hover:underline focus-visible:font-bold focus-visible:underline focus-visible:outline-none dark:text-yellow-300/80 dark:hover:text-yellow-300"
            >
              Mapa do Site
            </a>
            <a
              href="/acessibilidade"
              title="Ver a política de acessibilidade"
              className="hover:underline focus-visible:font-bold focus-visible:underline focus-visible:outline-none dark:text-yellow-300/80 dark:hover:text-yellow-300"
            >
              Acessibilidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}