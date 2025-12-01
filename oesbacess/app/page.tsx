'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiOutlineMicrophone,
  HiOutlinePause,
  HiOutlinePlay,
} from 'react-icons/hi2';
import { IoContrast } from 'react-icons/io5';
import { FaSoundcloud } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';

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

const navItems = [
  { label: 'Início', href: '#' },
  { 
    label: 'Sobre', 
    href: '#sobre',
    subItems: [
        { label: 'Institucional', href: '#' },
        { label: 'Quem Somos', href: '#' },
        { label: 'Nossa História', href: '#' },
        { label: 'Organograma', href: '#' },
    ]
  },
  { 
    label: 'Setor Espacial', 
    href: '#setor',
    subItems: [
        { label: 'Programa Espacial', href: '#' },
        { label: 'Centro de Lançamento', href: '#' },
        { label: 'Missões Atuais', href: '#' },
    ]
  },
  { 
    label: 'Dados e Indicadores', 
    href: '#dados',
    subItems: [
        { label: 'Painéis BI', href: '#' },
        { label: 'Dados Abertos', href: '#' },
        { label: 'Relatórios Estatísticos', href: '#' },
    ]
  },
  { 
    label: 'Publicações', 
    href: '#publicacoes',
    subItems: [
        { label: 'Revistas', href: '#' },
        { label: 'Artigos Técnicos', href: '#' },
        { label: 'Legislação', href: '#' },
    ]
  },
  { label: 'Notícias e Destaques', href: '#noticias' },
  { 
      label: 'Dúvidas Frequentes', 
      href: '#faq',
      subItems: [
        { label: 'Como participar', href: '#' },
        { label: 'Bolsas de Pesquisa', href: '#' },
        { label: 'Fale Conosco', href: '#' },
    ]
  }, 
];

const publicationItems = [
  {
    title: 'Relatório de Gestão 2024',
    src: '/publi1.png', 
    alt: 'Capa do Relatório de Gestão 2024, fundo azul com gráficos de desempenho',
    link: '#'
  },
  {
    title: 'Revista Espacial Brasileira',
    src: '/publi2.png', 
    alt: 'Capa da Revista Espacial Brasileira, destaque para a missão Artemis',
    link: '#'
  },
  {
    title: 'Catálogo da Indústria Espacial',
    src: '/publi3.png',
    alt: 'Capa do Catálogo da Indústria, mostrando mapa do Brasil e satélites',
    link: '#'
  },
  {
    title: 'Boletim de Monitoramento',
    src: '/publi4.png',
    alt: 'Capa do Boletim de Monitoramento Ambiental via Satélite',
    link: '#'
  },
];

const newsItems = [
  {
    title: 'Lançamento do Satélite CBERS-6',
    date: '01/12/2025',
    src: '/noticia.png',
    alt: 'Imagem ilustrativa para o lançamento do satélite CBERS-6',
    summary: 'Novo satélite permitirá monitoramento noturno da Amazônia com tecnologia SAR.',
    link: '#'
  },
  {
    title: 'Parceria Brasil-EUA na NASA',
    date: '28/11/2025',
    src: '/noticia.png',
    alt: 'Imagem ilustrativa sobre a parceria Brasil e NASA',
    summary: 'Acordo assinado para intercâmbio de pesquisadores e desenvolvimento conjunto.',
    link: '#'
  },
  {
    title: 'Workshop de Astronomia em Brasília',
    date: '20/11/2025',
    src: '/noticia.png',
    alt: 'Imagem ilustrativa do Workshop de Astronomia',
    summary: 'Evento reuniu mais de 500 estudantes para observar o céu da capital.',
    link: '#'
  },
];

const thematicAreas = [
  { name: 'Governo', imgSrc: '/govern.svg', altText: 'Ícone representando Governo' },
  { name: 'Capital Humano', imgSrc: '/human_capital.svg', altText: 'Ícone representando Capital Humano' },
  { name: 'Indústria', imgSrc: '/industria.svg', altText: 'Ícone representando Indústria' },
  { name: 'Desenvolvimento Tecnológico', imgSrc: '/dev_tec.svg', altText: 'Ícone representando Desenvolvimento Tecnológico' },
  { name: 'Pesquisa e Desenvolvimento', imgSrc: '/pesquisa.svg', altText: 'Ícone representando Pesquisa e Desenvolvimento' },
  { name: 'Sistemas Espaciais', imgSrc: '/sistemas.svg', altText: 'Ícone representando Sistemas Espaciais' },
];

const socialMediaLinks = [
  { 
    name: 'Facebook', 
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9.5h4v-9.5z" />
      </svg>
    ) 
  },
  { 
    name: 'Instagram', 
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ) 
  },
  { 
    name: 'Twitter', 
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ) 
  },
  { name: 'YouTube', Icon: BsYoutube },
  { name: 'SoundCloud', Icon: FaSoundcloud },
];

export default function ResultIA() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [activeLink, setActiveLink] = useState('Início'); 

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
    const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) setIsPaused(true);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  useEffect(() => {
    const VLIBRAS_ID = 'vlibras-plugin-container';
    const SCRIPT_ID = 'vlibras-plugin-script';

    if (document.getElementById(VLIBRAS_ID)) return;

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

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        try {
          new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
        } catch (e) {
          console.error('Erro VLibras:', e);
        }
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans dark:bg-black">

      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-50 rounded-md bg-white px-4 py-2 font-bold text-blue-900 ring-2 ring-blue-900 transition-all focus:not-sr-only dark:bg-black dark:text-yellow-300 dark:ring-yellow-300"
      >
        Pular para o conteúdo principal
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-yellow-300 dark:bg-black">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo_oseb.svg"
                alt="Logo da Agência Espacial Brasileira (AEB)"
                className="h-15 w-15"
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

            <div className="flex items-center gap-4">
              <button
                onClick={toggleHighContrast}
                title="Ativar ou desativar modo de alto contraste"
                aria-label="Ativar ou desativar modo de alto contraste"
                aria-pressed={isHighContrast}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-300/20 dark:focus-visible:ring-yellow-300"
              >
                <IoContrast className="h-5 w-5" aria-hidden="true" />
                Alto Contraste
              </button>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-between py-2" aria-label="Navegação principal">
            <ul className="flex flex-wrap gap-2 text-sm font-semibold text-blue-900 dark:text-yellow-300">
              {navItems.map((item, index) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                return (
                  <li key={index} className="group relative">
                    <a
                      href={item.href}
                      aria-current={activeLink === item.label ? 'page' : undefined}
                      aria-haspopup={hasSubItems ? 'true' : undefined}
                      className={`flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:focus-visible:ring-yellow-300 ${
                          activeLink === item.label 
                          ? 'bg-blue-100 text-blue-900 underline decoration-2 underline-offset-4 dark:bg-yellow-300 dark:text-black' 
                          : 'hover:bg-blue-900 hover:text-white dark:hover:bg-yellow-300 dark:hover:text-black'
                      }`}
                      onClick={() => !hasSubItems && setActiveLink(item.label)}
                    >
                      {item.label}
                      {hasSubItems && (
                        <HiChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                      )}
                    </a>

                    {hasSubItems && (
                      <ul 
                        className="
                          absolute left-0 top-full z-50 mt-1 hidden min-w-[200px] w-auto
                          rounded-md border border-gray-200 bg-white shadow-lg 
                          group-hover:block group-focus-within:block
                          dark:border-yellow-300 dark:bg-black
                        "
                        role="menu"
                        aria-label={`Submenu de ${item.label}`}
                      >
                        {item.subItems?.map((subItem, subIndex) => (
                          <li key={subIndex} role="none">
                            <a
                              href={subItem.href}
                              role="menuitem"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-900 focus-visible:bg-gray-100 focus-visible:text-blue-900 focus-visible:outline-none dark:text-gray-300 dark:hover:bg-yellow-300 dark:hover:text-black dark:focus-visible:bg-yellow-300 dark:focus-visible:text-black"
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            
            <button
              title="Acessar área restrita"
              aria-label="Acessar área restrita ou fazer login"
              className="mt-2 sm:mt-0 cursor-pointer rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 dark:bg-yellow-300 dark:text-black dark:font-bold dark:hover:bg-yellow-400 dark:focus-visible:ring-black"
            >
              Área Interna
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content" className="container mx-auto max-w-7xl px-4 py-8">
        
        <section className="mb-8 flex justify-center" role="search">
          <form 
            className="flex w-full max-w-xl items-center gap-2 rounded-md border border-gray-300 p-2 transition-all duration-150 focus-within:ring-2 focus-within:ring-blue-800 dark:border-yellow-300 dark:bg-black dark:focus-within:ring-yellow-300" 
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="search-input" className="sr-only">Digite sua busca</label>
            <button type="submit" title="Buscar" aria-label="Realizar busca" className="rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:focus-visible:ring-yellow-300">
              <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-600 dark:text-yellow-300" aria-hidden="true" />
            </button>
            <input
              id="search-input"
              type="text"
              placeholder="O que você procura?"
              className="flex-1 bg-transparent p-0 outline-none dark:text-white dark:font-bold dark:placeholder-gray-400"
            />
            <button type="button" title="Buscar por voz" aria-label="Iniciar busca por voz" className="cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-blue-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:focus-visible:ring-yellow-300">
              <HiOutlineMicrophone className="h-5 w-5 text-xl dark:text-gray-400 dark:hover:text-yellow-300" aria-hidden="true" />
            </button>
          </form>
        </section>

        <section
          className="relative mb-8 h-64 overflow-hidden rounded-lg bg-gray-800 text-white dark:border dark:border-yellow-300 dark:bg-black"
          aria-roledescription="carousel"
          aria-label="Destaques principais"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isPaused ? 'none' : 'transform 500ms ease-in-out' 
            }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="relative h-full w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${carouselItems.length}`}
              >
                <img
                  src={item.imageUrl}
                  alt={`Destaque: ${item.title} - ${item.description}`}
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute inset-0 flex items-center  to-transparent pl-12 pr-16 md:pl-24 md:pr-24">
                  <div className="max-w-xl pb-8"> {/* pb-8 para garantir que não encoste nos botões de baixo */}
                    <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                    <p className="text-lg leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            title="Slide anterior"
            aria-label="Ver slide anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/70 p-3 text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:border-yellow-300 dark:bg-black dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            <HiChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <button
            onClick={nextSlide}
            title="Próximo slide"
            aria-label="Ver próximo slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/70 p-3 text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:border-yellow-300 dark:bg-black dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            <HiChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? 'Continuar slide' : 'Pausar slide'}
            aria-label={isPaused ? 'Continuar slide automático' : 'Pausar slide automático'}
            aria-pressed={isPaused}
            className="absolute bottom-4 left-4 cursor-pointer rounded-full border border-white/20 bg-black/70 p-3 text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:border-yellow-300 dark:bg-black dark:hover:bg-yellow-300/40 dark:focus-visible:ring-yellow-300"
          >
            {isPaused ? <HiOutlinePlay className="h-6 w-6" aria-hidden="true" /> : <HiOutlinePause className="h-6 w-6" aria-hidden="true" />}
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                title={`Ir para o slide ${index + 1}`}
                aria-label={`Ir para o slide ${index + 1}: ${carouselItems[index].title}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index
                    ? 'bg-white dark:bg-yellow-300'
                    : 'bg-white/50 dark:bg-yellow-300/50'
                } hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:hover:bg-yellow-300 dark:focus-visible:ring-yellow-300`}
              ></button>
            ))}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" aria-label="Visão geral do orçamento">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg bg-blue-900 p-6 text-white dark:border dark:border-yellow-300 dark:bg-black">
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-yellow-300">Visão geral de Orçamento</h3>
                <p className="mb-4 text-sm text-blue-200 dark:text-gray-300">Período de 2024 a 2025</p>
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

        <section id="setor" className="mb-12 text-center">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">Áreas Temáticas</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {thematicAreas.map(({ name, imgSrc, altText }) => (
              <a
                href="#"
                key={name}
                className="flex flex-col items-center rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:focus-visible:ring-yellow-300"
                title={`Área Temática: ${name}`}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#2969BD] text-blue-800 dark:border-white dark:bg-zinc-50 dark:text-yellow-300">
                  <img src={imgSrc} alt={altText} className="h-20 w-20" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="publicacoes" className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">Publicações</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publicationItems.map((item, index) => (
              <a
                href={item.link}
                key={index}
                className="group relative h-64 overflow-hidden rounded-lg bg-gray-200 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 dark:focus-visible:ring-yellow-300"
                title={`Ver detalhes: ${item.title}`}
              >
                <img
                  src={item.src} 
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-white font-medium">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="noticias" className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-blue-900 dark:text-yellow-300">Notícias</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <a
                href={item.link}
                key={index}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 dark:border-yellow-300 dark:focus-visible:ring-yellow-300"
                title={`Ler notícia completa: ${item.title}`}
              >
                <div className="h-48 w-full bg-blue-800 dark:bg-gray-800">
                  <img
                    src={item.src} 
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-2 text-xs font-bold text-blue-600 dark:text-yellow-300">
                    {item.date}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              title="Ver mais notícias antigas"
              aria-label="Ver todas as notícias"
              className="cursor-pointer rounded-md bg-blue-900 px-6 py-2 text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 dark:bg-yellow-300 dark:text-black dark:hover:bg-yellow-400 dark:focus-visible:ring-black"
            >
              Ver mais notícias
            </button>
          </div>
        </section>

        <section className="border-t pt-8 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">Redes Sociais</h3>
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
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 bg-gray-100 py-8 dark:border-t dark:border-yellow-300 dark:bg-black">
        <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 Observatório do Setor Espacial Brasileiro. Todos os direitos reservados.
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