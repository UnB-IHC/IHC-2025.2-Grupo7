    "use server"; 

    import { GoogleGenAI } from "@google/genai";
    import axios from "axios";
    import https from "https";

    const ai = new GoogleGenAI({ apiKey: "AIzaSyDNKl4krc3qNVKsxodUaOR9nRMo4kKiIqc" });

    const sumarioHTML = `
    Analise o seguinte HTML em relação ao sumário de acessibilidade fornecido, considerando as diretrizes da WCAG 2.2, a norma ABNT NBR 17225:2025, os guias de acessibilidade do Reino Unido e Brasil e também Heurísticas de Nielsen. Foque apenas nos pontos que podem ser melhorados, sem listar os acertos ou pontos fortes. A análise deve ser prática e detalhada, apontando problemas, riscos de não conformidade e sugestões de ajustes ou correções.

    De acordo com o seguinte sumário: em aspas triplas
    """
  1. Heurísticas de Nielsen (Usabilidade)

  Estamos avaliando a interface com base nas 10 Heurísticas de Usabilidade de Nielsen, um dos modelos mais reconhecidos internacionalmente para análise da facilidade de uso em sistemas digitais.
  Essa abordagem é fundamental porque essas heurísticas permitem identificar rapidamente problemas de usabilidade, como falta de clareza, inconsistências, dificuldade de navegação, erros e ausência de feedback que comprometem diretamente a experiência do usuário.
  Feedback e Status
  Visibilidade do Status do Sistema


  O sistema informa o usuário sobre o que está acontecendo (status, carregamentos, ações) com feedback adequado e em tempo razoável?


  Existem indicadores visuais claros, como barras de progresso, ícones de carregamento ou mensagens de sucesso (ex: "Pedido enviado com sucesso!")?


  Correspondência com o Mundo Real
  Linguagem e Ícones


  A linguagem do sistema é familiar ao usuário, evitando jargões técnicos?


  As informações são apresentadas em ordem lógica e natural?


  Os ícones (ex: carrinho de compras, lixeira) são familiares e correspondem a conceitos do mundo real?


  Controle e Liberdade
  Cancelamento e Undo


  O usuário tem formas claras de cancelar ações?


  Existem opções fáceis de "Desfazer" (como Ctrl+Z) ou "Cancelar" (em formulários) para corrigir erros?


  Consistência e Padrões
  Interface e Navegação


  A interface é consistente? (Palavras, ícones e ações têm o mesmo significado em todo o site)


  Menus e ícones (como a lupa de busca) permanecem nos mesmos locais e com os mesmos significados em todas as páginas?


  Prevenção de Erros
  Design Preventivo


  O design ajuda a prevenir erros antes que ocorram?


  O sistema usa mecanismos de prevenção (ex: desabilitar botões de envio até o preenchimento, pedir confirmação antes de excluir)?


  Reconhecimento em vez de Memorização
  Interface e Memória


  O sistema minimiza a carga de memória do usuário tornando opções e informações visíveis?


  A interface utiliza reconhecimento (ex: menus rotulados, listas de "vistos recentemente") em vez de exigir que o usuário memorize comandos?


  Flexibilidade e Eficiência
  Atalhos e Usuários Experientes


  O sistema atende tanto usuários novatos quanto experientes?


  Existem atalhos (ex: Ctrl+C) para usuários avançados, mantendo interações visuais para iniciantes?


  Design Estético e Minimalista
  Interface Limpa


  A interface é simples, objetiva e foca no essencial?


  O design evita informações desnecessárias que possam distrair o usuário?


  Ajuda em Erros
  Mensagens de Erro


  As mensagens de erro são claras, específicas e construtivas (evitam códigos de erro)?


  As mensagens ajudam o usuário a corrigir o erro (ex: "Senha incorreta. Tente novamente...")?


  Ajuda e Documentação
  Suporte ao Usuário


  O sistema oferece ajuda acessível, mesmo sendo intuitivo?


  Existem seções de "Ajuda" ou FAQs bem estruturadas, ou dicas flutuantes (tooltips) para ícones complexos?



  2. WCAG 2.2 (Acessibilidade Web)

  Estamos analisando o site com base nas Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2), o padrão internacional mais adotado para garantir que pessoas com deficiência consigam acessar e utilizar conteúdos digitais.
  Essa avaliação é essencial porque a WCAG assegura que o conteúdo seja perceptível, operável, compreensível e robusto, reduzindo barreiras e promovendo inclusão para milhões de usuários.

  Perceptível
  Texto e Imagens


  Imagens, botões gráficos e controles informativos possuem texto alternativo (alt) adequado?


  Multimídia


  Vídeos pré-gravados possuem legendas e audiodescrição?


  Podcasts e áudios possuem transcrições completas?


  Adaptabilidade


  A informação não depende apenas de cores, formas ou tamanho para ser transmitida?


  Estrutura e conteúdo podem ser apresentados em diferentes layouts (ex: modo retrato/paisagem) sem perda de informação?


  Operável
  Teclado


  Todas as funcionalidades podem ser executadas apenas pelo teclado?


  O foco do teclado é claramente visível?


  A ordem de navegação pelo teclado (Tab) é lógica e coerente?


  Nenhum componente "prende" o teclado (armadilha de foco)?


  Tempo


  O usuário pode pausar, interromper ou ajustar tempo de elementos em movimento?


  Navegação


  Existem mecanismos para "saltar blocos" repetitivos?


  Títulos de páginas são claros e descritivos?


  Compreensível
  Leitura e Consistência


  A linguagem é clara, simples e direta?


  Conteúdo organizado com títulos e cabeçalhos (hierarquia de <h1> a <h6>)?


  Menus e links de navegação consistentes em todo o site?


  Componentes se comportam de maneira previsível?


  Formulários


  Campos de formulário possuem rótulos explícitos e concisos?


  Instruções claras e sugestões de correção em erros?


  Mensagens de erro próximas ao campo correspondente?


  Robusto
  HTML e Tecnologias Assistivas


  Site utiliza marcação HTML válida e aderente aos padrões?


  HTML semântico correto (nav, main, button, etc.)?


  Todos os componentes podem ser lidos e operados por tecnologias assistivas?



  3. Guia de Boas Práticas para Acessibilidade Digital

  Estamos utilizando como referência o Guia de Boas Práticas para Acessibilidade Digital, que complementa a WCAG ao apresentar orientações práticas sobre processos, equipes, testes, design e produção de conteúdo.
  Essa referência é importante porque trata a acessibilidade como parte integral do fluxo de trabalho, garantindo que ela não seja apenas um checklist final, mas um processo contínuo de melhoria.
  Iniciação e Planejamento
  Acessibilidade desde o início (Desenho Universal)?


  Pessoas com deficiência incluídas na concepção e validação?


  Personas diversificadas (usuários com tecnologias assistivas ou baixo letramento digital)?


  Arquitetura da informação prioriza autonomia do usuário?


  Desenvolvimento e Testes
  Testes


  Testes manuais e automatizados combinados?


  Pessoas com deficiência envolvidas na fase de testes?


  Funcionalidades acessíveis via teclado?


  Testes com leitores de tela (NVDA, VoiceOver)?


  Código


  Semântica HTML adequada (<h1>-<h6>, main, nav, footer)?


  Botões e links com rótulos precisos?


  Atalhos de teclado para acesso direto ao conteúdo principal?


  Texto via HTML/CSS, evitando imagens de texto?


  Imagens significativas com alt; decorativas com alt="" ou CSS?


  Texto legível com zoom de 200%?


  Tamanho de fonte ajustável?


  Campo de busca e páginas de FAQ/Acessibilidade acessíveis?


  Formulários


  Mensagens de erro com bom contraste e próximas aos campos?


  Máscaras de entrada e autocompletar facilitando preenchimento?


  Design
  Conteúdo disponível em múltiplos modos (texto, áudio, formatos alternativos)?


  Botões mobile ≥ 48×48 pixels?


  Design responsivo (mobile first)?


  Paleta de cores considera daltonismo e combina ícones/texto para transmitir informação?


  Contraste mínimo de 4.5:1 entre texto e fundo?


  Espaçamento adequado entre elementos clicáveis?


  Opções de alto contraste, dark mode e ajuste de fonte?


  Conteúdo
  Termo correto "pessoa com deficiência (PcD)" utilizado?


  Textos claros, objetivos e simples (sujeito + verbo + complemento)?


  Gráficos e diagramas complexos possuem descrições adicionais?


  Vídeos com legendas, audiodescrição e espaço para Libras?


  Áudios e podcasts com transcrições completas?



  4. ABNT NBR 17225:2025

  Estamos analisando a conformidade da interface com a ABNT NBR 17225:2025, norma brasileira que estabelece critérios obrigatórios para acessibilidade digital alinhados à WCAG.
  Essa análise é relevante porque a NBR 17225 representa o padrão normativo recomendado no Brasil, utilizado em órgãos públicos, licitações e auditorias formais, garantindo aderência às exigências legais nacionais.

  Requisitos Gerais e Avaliação
  Avaliação combina ferramentas automáticas (WAVE, Axe, Lighthouse) e análise manual?


  Avaliação testa compatibilidade com leitores de tela e tecnologias assistivas?


  Site atende à conformidade Regular (Nível AA WCAG)?


  Interação por Teclado
  Todos os elementos interativos possuem foco visível?


  Foco nunca oculto por outros componentes?


  Sequência de navegação (Tab) coerente?


  Nenhum componente prende o foco do teclado?


  Conteúdo e Elementos Web
  Estrutura semântica correta (<h1>-<h6>, nav, main, etc.)?


  Campos de formulário com <label> associado?


  Mensagens de erro claras com sugestões de correção?


  Imagens com texto alternativo (alt)?


  Vídeos com legendas e audiodescrição?


  Documentos (PDFs) em formato acessível?


  Navegação e Usabilidade
  Navegação consistente e intuitiva (menus padronizados)?


  Componentes personalizados (widgets, players) possuem instruções e resposta visual?


  Recursos Adicionais e Elementos Especiais
  Audiodescrição para imagens e vídeos relevantes?


  Vídeos com intérprete de Libras quando possível?


  Pop-ups, tooltips e menus acessíveis via teclado e fáceis de dispensar?


  Contraste mínimo 4.5:1 (texto/fundo) e 3:1 (botões e títulos grandes)?


  Cor não é único meio de transmitir informação?


  Textos ampliáveis até 200% sem distorção ou perda de funcionalidade?
  """

    O seguinte HTML segue os checkpoints abordados pelo sumário?
    Retorne somente a análise sem introdução de que foi feita a análise.

    HTML:


    `;

    async function fetchAndCountTokens(url: string) {
      let html;  
      try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        const { data } = await axios.get(url, {
          httpsAgent: agent,
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html",
          }
        });
        html = data;
      } catch (error) {
        return error;
      } finally { 
        try {
          
          const countTokensResponse = await ai.models.countTokens({
            model: "gemini-2.0-flash",
            contents: sumarioHTML + html,
          });

          console.log("Quantidade de tokens: " + countTokensResponse.totalTokens);
        } catch (err) {
          console.error(err);
        }
      }
    }

  export async function htmlAnalysis(url: string) {
    let html;
    try {
      const agent = new https.Agent({ rejectUnauthorized: false });
      
        const { data } = await axios.get(url, {
          httpsAgent: agent,
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html",
          }
        });
      
        html = data;
    } catch (error) {
      throw error;
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: sumarioHTML + html,
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      return text ? text : ""; 
    } catch (err) {
      throw err;
    }
  }
    

  //console.log(await htmlAnalysis("https://observatorio.aeb.gov.br/"));

  const sumarioIMG = `
    Analise a seguinte imagem em relação ao sumário de acessibilidade fornecido, considerando as diretrizes da WCAG 2.2, a norma ABNT NBR 17225:2025, os guias de acessibilidade do Reino Unido e Brasil e também Heurísticas de Nielsen. Foque apenas nos pontos que podem ser melhorados, sem listar os acertos ou pontos fortes. A análise deve ser prática e detalhada, apontando problemas, riscos de não conformidade e sugestões de ajustes ou correções.

    De acordo com o seguinte sumário: em aspas triplas
    """
  1. Heurísticas de Nielsen (Usabilidade)

  Estamos avaliando a interface com base nas 10 Heurísticas de Usabilidade de Nielsen, um dos modelos mais reconhecidos internacionalmente para análise da facilidade de uso em sistemas digitais.
  Essa abordagem é fundamental porque essas heurísticas permitem identificar rapidamente problemas de usabilidade, como falta de clareza, inconsistências, dificuldade de navegação, erros e ausência de feedback que comprometem diretamente a experiência do usuário.
  Feedback e Status
  Visibilidade do Status do Sistema


  O sistema informa o usuário sobre o que está acontecendo (status, carregamentos, ações) com feedback adequado e em tempo razoável?


  Existem indicadores visuais claros, como barras de progresso, ícones de carregamento ou mensagens de sucesso (ex: "Pedido enviado com sucesso!")?


  Correspondência com o Mundo Real
  Linguagem e Ícones


  A linguagem do sistema é familiar ao usuário, evitando jargões técnicos?


  As informações são apresentadas em ordem lógica e natural?


  Os ícones (ex: carrinho de compras, lixeira) são familiares e correspondem a conceitos do mundo real?


  Controle e Liberdade
  Cancelamento e Undo


  O usuário tem formas claras de cancelar ações?


  Existem opções fáceis de "Desfazer" (como Ctrl+Z) ou "Cancelar" (em formulários) para corrigir erros?


  Consistência e Padrões
  Interface e Navegação


  A interface é consistente? (Palavras, ícones e ações têm o mesmo significado em todo o site)


  Menus e ícones (como a lupa de busca) permanecem nos mesmos locais e com os mesmos significados em todas as páginas?


  Prevenção de Erros
  Design Preventivo


  O design ajuda a prevenir erros antes que ocorram?


  O sistema usa mecanismos de prevenção (ex: desabilitar botões de envio até o preenchimento, pedir confirmação antes de excluir)?


  Reconhecimento em vez de Memorização
  Interface e Memória


  O sistema minimiza a carga de memória do usuário tornando opções e informações visíveis?


  A interface utiliza reconhecimento (ex: menus rotulados, listas de "vistos recentemente") em vez de exigir que o usuário memorize comandos?


  Flexibilidade e Eficiência
  Atalhos e Usuários Experientes


  O sistema atende tanto usuários novatos quanto experientes?


  Existem atalhos (ex: Ctrl+C) para usuários avançados, mantendo interações visuais para iniciantes?


  Design Estético e Minimalista
  Interface Limpa


  A interface é simples, objetiva e foca no essencial?


  O design evita informações desnecessárias que possam distrair o usuário?


  Ajuda em Erros
  Mensagens de Erro


  As mensagens de erro são claras, específicas e construtivas (evitam códigos de erro)?


  As mensagens ajudam o usuário a corrigir o erro (ex: "Senha incorreta. Tente novamente...")?


  Ajuda e Documentação
  Suporte ao Usuário


  O sistema oferece ajuda acessível, mesmo sendo intuitivo?


  Existem seções de "Ajuda" ou FAQs bem estruturadas, ou dicas flutuantes (tooltips) para ícones complexos?



  2. WCAG 2.2 (Acessibilidade Web)

  Estamos analisando o site com base nas Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2), o padrão internacional mais adotado para garantir que pessoas com deficiência consigam acessar e utilizar conteúdos digitais.
  Essa avaliação é essencial porque a WCAG assegura que o conteúdo seja perceptível, operável, compreensível e robusto, reduzindo barreiras e promovendo inclusão para milhões de usuários.

  Perceptível
  Texto e Imagens


  Imagens, botões gráficos e controles informativos possuem texto alternativo (alt) adequado?


  Multimídia


  Vídeos pré-gravados possuem legendas e audiodescrição?


  Podcasts e áudios possuem transcrições completas?


  Adaptabilidade


  A informação não depende apenas de cores, formas ou tamanho para ser transmitida?


  Estrutura e conteúdo podem ser apresentados em diferentes layouts (ex: modo retrato/paisagem) sem perda de informação?


  Operável
  Teclado


  Todas as funcionalidades podem ser executadas apenas pelo teclado?


  O foco do teclado é claramente visível?


  A ordem de navegação pelo teclado (Tab) é lógica e coerente?


  Nenhum componente "prende" o teclado (armadilha de foco)?


  Tempo


  O usuário pode pausar, interromper ou ajustar tempo de elementos em movimento?


  Navegação


  Existem mecanismos para "saltar blocos" repetitivos?


  Títulos de páginas são claros e descritivos?


  Compreensível
  Leitura e Consistência


  A linguagem é clara, simples e direta?


  Conteúdo organizado com títulos e cabeçalhos (hierarquia de <h1> a <h6>)?


  Menus e links de navegação consistentes em todo o site?


  Componentes se comportam de maneira previsível?


  Formulários


  Campos de formulário possuem rótulos explícitos e concisos?


  Instruções claras e sugestões de correção em erros?


  Mensagens de erro próximas ao campo correspondente?


  Robusto
  HTML e Tecnologias Assistivas


  Site utiliza marcação HTML válida e aderente aos padrões?


  HTML semântico correto (nav, main, button, etc.)?


  Todos os componentes podem ser lidos e operados por tecnologias assistivas?



  3. Guia de Boas Práticas para Acessibilidade Digital

  Estamos utilizando como referência o Guia de Boas Práticas para Acessibilidade Digital, que complementa a WCAG ao apresentar orientações práticas sobre processos, equipes, testes, design e produção de conteúdo.
  Essa referência é importante porque trata a acessibilidade como parte integral do fluxo de trabalho, garantindo que ela não seja apenas um checklist final, mas um processo contínuo de melhoria.
  Iniciação e Planejamento
  Acessibilidade desde o início (Desenho Universal)?


  Pessoas com deficiência incluídas na concepção e validação?


  Personas diversificadas (usuários com tecnologias assistivas ou baixo letramento digital)?


  Arquitetura da informação prioriza autonomia do usuário?


  Desenvolvimento e Testes
  Testes


  Testes manuais e automatizados combinados?


  Pessoas com deficiência envolvidas na fase de testes?


  Funcionalidades acessíveis via teclado?


  Testes com leitores de tela (NVDA, VoiceOver)?


  Código


  Semântica HTML adequada (<h1>-<h6>, main, nav, footer)?


  Botões e links com rótulos precisos?


  Atalhos de teclado para acesso direto ao conteúdo principal?


  Texto via HTML/CSS, evitando imagens de texto?


  Imagens significativas com alt; decorativas com alt="" ou CSS?


  Texto legível com zoom de 200%?


  Tamanho de fonte ajustável?


  Campo de busca e páginas de FAQ/Acessibilidade acessíveis?


  Formulários


  Mensagens de erro com bom contraste e próximas aos campos?


  Máscaras de entrada e autocompletar facilitando preenchimento?


  Design
  Conteúdo disponível em múltiplos modos (texto, áudio, formatos alternativos)?


  Botões mobile ≥ 48×48 pixels?


  Design responsivo (mobile first)?


  Paleta de cores considera daltonismo e combina ícones/texto para transmitir informação?


  Contraste mínimo de 4.5:1 entre texto e fundo?


  Espaçamento adequado entre elementos clicáveis?


  Opções de alto contraste, dark mode e ajuste de fonte?


  Conteúdo
  Termo correto "pessoa com deficiência (PcD)" utilizado?


  Textos claros, objetivos e simples (sujeito + verbo + complemento)?


  Gráficos e diagramas complexos possuem descrições adicionais?


  Vídeos com legendas, audiodescrição e espaço para Libras?


  Áudios e podcasts com transcrições completas?



  4. ABNT NBR 17225:2025

  Estamos analisando a conformidade da interface com a ABNT NBR 17225:2025, norma brasileira que estabelece critérios obrigatórios para acessibilidade digital alinhados à WCAG.
  Essa análise é relevante porque a NBR 17225 representa o padrão normativo recomendado no Brasil, utilizado em órgãos públicos, licitações e auditorias formais, garantindo aderência às exigências legais nacionais.

  Requisitos Gerais e Avaliação
  Avaliação combina ferramentas automáticas (WAVE, Axe, Lighthouse) e análise manual?


  Avaliação testa compatibilidade com leitores de tela e tecnologias assistivas?


  Site atende à conformidade Regular (Nível AA WCAG)?


  Interação por Teclado
  Todos os elementos interativos possuem foco visível?


  Foco nunca oculto por outros componentes?


  Sequência de navegação (Tab) coerente?


  Nenhum componente prende o foco do teclado?


  Conteúdo e Elementos Web
  Estrutura semântica correta (<h1>-<h6>, nav, main, etc.)?


  Campos de formulário com <label> associado?


  Mensagens de erro claras com sugestões de correção?


  Imagens com texto alternativo (alt)?


  Vídeos com legendas e audiodescrição?


  Documentos (PDFs) em formato acessível?


  Navegação e Usabilidade
  Navegação consistente e intuitiva (menus padronizados)?


  Componentes personalizados (widgets, players) possuem instruções e resposta visual?


  Recursos Adicionais e Elementos Especiais
  Audiodescrição para imagens e vídeos relevantes?


  Vídeos com intérprete de Libras quando possível?


  Pop-ups, tooltips e menus acessíveis via teclado e fáceis de dispensar?


  Contraste mínimo 4.5:1 (texto/fundo) e 3:1 (botões e títulos grandes)?


  Cor não é único meio de transmitir informação?


  Textos ampliáveis até 200% sem distorção ou perda de funcionalidade?
  """

    A seguinte imagem segue os checkpoints abordados pelo sumário?
    
    Retorne somente a análise sem introdução de que foi realizada uma análise.

    Imagem:


    `;


  export async function imageAnalysis(imagemBase64: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: sumarioIMG },
            {
              inlineData: {
                mimeType: "image/png", // ou image/jpeg dependendo do arquivo
                data: imagemBase64, // base64 sem o prefixo data:image/png;base64,
              },
            },
          ],
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? text : ""; 
  }

export async function validateKey(apiKey: string) {
  try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Retorne somente true e apenas sem nenhuma mensagem a mais apenas true.",
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if(text === "true") return true;
      else return false;
  } catch (err) {
      throw err;
  }
}