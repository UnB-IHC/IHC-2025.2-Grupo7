  "use server"; 

  import { GoogleGenAI } from "@google/genai";
  import axios from "axios";
  import https from "https";

  const sumarioHTML = `
  Analise o seguinte HTML em relação ao sumário de acessibilidade fornecido, considerando as diretrizes da WCAG 2.2, a norma ABNT NBR 17225:2025 e os guias de acessibilidade do Reino Unido e Brasil. Foque apenas nos pontos que podem ser melhorados, sem listar os acertos ou pontos fortes. A análise deve ser prática e detalhada, apontando problemas, riscos de não conformidade e sugestões de ajustes ou correções.

  De acordo com o seguinte sumário: em aspas triplas
  """
  Guia de Boas Práticas para Acessibilidade Digital
  Este guia é um manual prático e didático que apresenta a acessibilidade digital dividida em quatro pilares de atuação, visando criar uma cultura organizacional e fornecer orientações práticas para equipes multidisciplinares.
  Iniciação
  Adote o conceito de Desenho Universal, inserindo a acessibilidade desde o início do projeto.


  Inclua pessoas com deficiência nas etapas de concepção e validação.


  Crie personas diversificadas, considerando usuários que utilizam tecnologias assistivas ou possuem baixo letramento digital.


  Promova a sensibilização da equipe sobre os direitos das pessoas com deficiência e o potencial de mercado representado por esse público.


  Registre formalmente o escopo do projeto e as entregas esperadas.


  Planejamento
  Aprofunde o entendimento sobre tipos de deficiência e diferentes formas de navegação digital.


  Estruture a arquitetura da informação priorizando a autonomia dos usuários.


  Organize o plano de ação, definindo recursos, responsabilidades e cronograma.


  Execução
  Certifique-se de que desenvolvedores e designers compreendam as exigências de acessibilidade.


  Familiarize a equipe com a documentação da WCAG e os obstáculos mais comuns enfrentados por usuários.


  Evite depender de ferramentas automáticas que prometem resolver acessibilidade de modo instantâneo.


  2. Desenvolvimento (incluindo Testes)
  Testes
  Combine testes manuais e automatizados, utilizando tanto softwares de verificação quanto experimentação prática.


  Envolva pessoas com deficiência na fase de testes.


  Garanta que todas as ações possam ser executadas apenas pelo teclado.


  Utilize leitores de tela (como NVDA ou VoiceOver) para validar a navegação.


  Avalie o desempenho em dispositivos móveis e diferentes tamanhos de tela.


  Código e Estrutura
  Aplique semântica HTML adequada, com uso correto de cabeçalhos (<h1> a <h6>) e landmarks (<main>, <nav>, <footer>).


  Forneça rótulos e descrições precisas para botões e links.


  Crie atalhos de teclado, garantindo que o primeiro leve diretamente ao conteúdo principal.


  Prefira HTML e CSS para textos,  evite inserir texto em imagens.


  Insira texto alternativo (alt) em imagens significativas; use alt="" ou CSS para elementos puramente decorativos.


  Certifique-se de que o texto continue legível com zoom de até 200%.


  Evite tamanhos de fonte fixos e permita redimensionamento.


  Inclua campo de busca, bem como páginas de Acessibilidade e FAQ de fácil acesso.


  Garanta acessibilidade total via teclado, com foco visível e ordem de navegação coerente.


  Em formulários, posicione mensagens de erro com bom contraste e próximas aos campos correspondentes.


  Facilite o preenchimento por meio de máscaras de entrada e autocompletar.


  3. Design
  Concepção
  Desenvolva para todos os perfis de usuários, baseando-se no Desenho Universal.


  Ofereça conteúdos multimodais (texto, áudio e formatos alternativos).


  Considere pessoas idosas e com deficiência desde a concepção do projeto.


  Wireframes
  Planeje o layout antecipando ajustes de contraste e tamanho de fonte.


  Dimensione botões para pessoas com limitações motoras, com área mínima de 48x48 pixels em dispositivos móveis.


  Responsividade
  Adote design responsivo, garantindo boa experiência em diferentes telas.


  Priorize o desenvolvimento mobile first.


  Cores e Contraste
  Escolha paletas considerando usuários daltônicos.


  Não use apenas cores para transmitir informações — combine cores, ícones e texto.


  Assegure contraste mínimo de 4.5:1 entre texto e fundo.


  Utilize ferramentas específicas para checar contraste e legibilidade.


  Interface e Experiência
  Mantenha a interface limpa, consistente e organizada.


  Garanta espaçamento adequado entre elementos clicáveis.


  Ofereça opções de modo de alto contraste, tema escuro (dark mode) e ajuste de tamanho de fonte.


  4. Conteúdo
  Linguagem e Termos:
  Use o termo “pessoa com deficiência (PcD)” e especifique o tipo quando necessário (ex.: cega, surda, autista).
  Textos
  Produza textos claros e objetivos, com pontuação adequada para leitores de tela e estrutura simples (sujeito + verbo + complemento).
  Imagens:
  Inclua texto alternativo (alt) em imagens relevantes e descrições adicionais para gráficos ou diagramas. Utilize ícones com texto sempre que possível.
  Vídeos:
  Adicione legendas, audiodescrição e descrição breve do conteúdo, reservando espaço para janela de Libras.
  Áudio e Podcasts:
  Ofereça versão em áudio dos textos, transcrições completas e, quando viável, intérprete ou avatar em Libras.

  Sumário da Norma ABNT NBR 17225:2025
  A NBR 17225:2025 define os requisitos técnicos obrigatórios para garantir acessibilidade na web, alinhando-se às Diretrizes WCAG 2.2 e às legislações nacionais. Seu foco é assegurar conformidade formal, avaliação estruturada e padronização de práticas acessíveis.
  1. Introdução e Requisitos Gerais
  O objetivo é avaliar a aderência aos padrões, identificar falhas e propor ajustes.


  A norma utiliza como referência principal as WCAG 2.2 e outras normas correlatas da ABNT.


  A avaliação envolve ferramentas automáticas (WAVE, Axe, Lighthouse) e análise manual.


  Níveis de Conformidade
  Conformidade Regular: atendimento aos requisitos essenciais (equivalente ao nível AA das WCAG).


  Conformidade Plena: inclui também as recomendações avançadas (equivalente ao nível AAA).
  2. Interação por Teclado
  Foco visível: todos os elementos interativos precisam ter destaque visual perceptível.


  Elemento em foco visível: o item ativo não pode ser oculto por outros componentes.


  Ordem de navegação: a sequência deve ser previsível e coerente.


  Armadilhas de foco: nenhum componente deve prender o foco do teclado.


  3. Conteúdo e Elementos Web
  Estrutura semântica: uso correto de tags HTML (<h1>–<h6>, nav, main, etc.).


  Formulários acessíveis: cada campo deve ter <label>, mensagens de erro claras e sugestões de correção.


  Arquivos acessíveis: imagens precisam de alt, vídeos devem ter legendas e audiodescrição, e PDFs devem estar em formato acessível.


  4. Navegação e Usabilidade
  Compatibilidade com múltiplos dispositivos de entrada (mouse, teclado, toque).


  Componentes personalizados devem ter instruções e resposta visual ao uso.


  A navegação deve ser consistente e intuitiva, com menus e caminhos padronizados.
  5. Recursos de Acessibilidade Adicionais
  Audiodescrição: verificar a narração de imagens e vídeos relevantes.


  Libras: sempre que possível, incluir vídeos com intérprete.


  Conteúdo adicional: pop-ups, tooltips e menus devem ser acessíveis via teclado e fáceis de dispensar.


  6. Elementos Especiais
  Contraste: mínimo de 4.5:1 entre texto e fundo, e 3:1 para botões e títulos grandes.


  Cores: nunca devem ser o único meio de transmitir informação.


  Tipografia: textos devem ser ampliáveis em até 200% sem distorções.


  7. Avaliação e Documentação
  Compatibilidade: testar com leitores de tela e outras tecnologias assistivas.


  Registro: documentar elementos conformes e não conformes.


  Relatório final: apresentar conclusões, prioridades e recomendações de melhorias.


  Tarefa 3 

  WCAG (Web Content Accessibility Guidelines)

  O WCAG é o padrão internacional que estabelece as diretrizes técnicas para garantir que o conteúdo da web seja acessível, estruturado em quatro princípios de atuação. Para a realização deste sumário foi feita de acordo com a WCGA 2.2.

  1. Perceptível
  O conteúdo deve ser apresentado de forma que possa ser compreendido por usuários, independentemente do sentido utilizado.
  Texto Alternativo e Equivalentes:
  Fornecer texto alternativo  para imagens, botões gráficos e controles que transmitam informação.
  Oferecer legendas para todo o conteúdo de áudio em vídeos e audiodescrição para o conteúdo visual relevante.
  Incluir transcrições completas para podcasts e áudios.
  Adaptável:
  O conteúdo não pode depender apenas de cores, formas ou tamanho para transmitir informação.
  Garantir que a estrutura e o conteúdo possam ser apresentados sem perda de informação em diferentes layouts ou tecnologias assistivas.
  2. Operável
  Os componentes da interface e a navegação devem ser operáveis e responsivos.
  Acessibilidade por Teclado:
  Todas as funcionalidades devem ser acessíveis e executáveis somente através do teclado, sem necessidade de mouse.
  O foco do teclado deve ser visível (com destaque claro) e a ordem de navegação  deve ser lógica e coerente.
  Evitar componentes que prendem o foco do teclado, impedindo a saída.
  Tempo Suficiente:
  Garantir que os usuários tenham tempo adequado para ler e interagir com o conteúdo.
  Permitir que o usuário pause, interrompa ou ajuste o tempo de elementos em movimento.
  Navegação:
  Oferecer mecanismos para saltar blocos repetitivos 
  Fornecer títulos de página claros e descritivos.
  3. Compreensível
  A informação e a operação da interface devem ser facilmente compreendidas.
  Leitura:
  Usar linguagem clara, simples e direta (nível de leitura apropriado).
  Utilizar títulos e cabeçalhos para organizar o conteúdo de forma lógica e hierárquica.
  Previsível e Consistente:
  Garantir que os componentes de navegação (menus, links) sejam consistentes em todo o site.
  Os componentes de interface devem se comportar de maneira previsível quando acionados.
  Entrada de Dados e Formulários:
  Fornecer rótulos explícitos e concisos para todos os campos de formulário.
  Inclui instruções claras e sugestões de correção quando erros de entrada forem detectados.
  Apresentar as mensagens de erro de forma acessível e próxima ao campo correspondente.
  4. Robusto
  O conteúdo deve ser robusto o suficiente para ser interpretado de forma confiável por uma ampla variedade de agentes de usuário (navegadores e tecnologias assistivas).
  Compatibilidade e Semântica:
  Utilizar marcação HTML válida e aderente aos padrões.
  Aplicar a semântica correta .
  Garantir que todos os componentes de interface possam ser lidos e operados por tecnologias assistivas.

  Conclusão 
  Pontos em comum
  Propósito Central: Todos visam à criação de um ambiente web acessível e inclusivo, combatendo as barreiras digitais
  Base Técnica: As WCAG (Web Content Accessibility Guidelines) servem como referência técnica fundamental para ambos os documentos brasileiros.
  Aspectos Fundamentais: Há um consenso sobre a importância dos seguintes requisitos técnicos:
  Uso correto da semântica HTML e títulos hierárquicos.
  Garantia de navegação total por teclado com foco visível.
  Contraste adequado e legibilidade do texto.
  Uso de texto alternativo para imagens e recursos multimídia acessíveis (legendas, audiodescrição).

  Principais diferenças
  Finalidade:
  Guia de Boas Práticas: É educativo e estratégico. Seu objetivo é criar uma cultura de acessibilidade e fornecer um manual prático de implementação para as equipes.
  WCAG (Padrão Internacional): É técnico e diretivo. Seu foco é definir objetivamente o que é acessibilidade através de critérios de sucesso para padronização global.
  NBR 17225:2025 (Norma ABNT): É normativo e legal. Seu propósito é estabelecer os requisitos obrigatórios no Brasil para a certificação de conformidade e aplicação da lei.


  Organização:
  Guia de Boas Práticas: Estrutura-se por Áreas de Atuação e Fluxo de Trabalho (Iniciação, Planejamento, Design, Conteúdo).
  WCAG (Padrão Internacional): Estrutura-se por Princípios de Experiência do Usuário (POUR) (Perceptível, Operável, Compreensível, Robusto).
  NBR 17225:2025 (Norma ABNT): Estrutura-se por Critérios Técnicos e Componentes de Interface (Interação por Teclado, Estrutura Semântica, Contraste).


  Linguagem:
  Guia de Boas Práticas: Utiliza um tom didático, prático e acessível, voltado para a sensibilização e execução por parte dos profissionais.
  WCAG (Padrão Internacional): Utiliza uma linguagem formal, técnica e padronizada, típica de especificações internacionais.
  NBR 17225:2025 (Norma ABNT): Adota uma linguagem objetiva, regulatória e de comando, característica de documentos de certificação e conformidade.
  """

  O seguinte HTML segue os checkpoints abordados pelo sumário?

  HTML:


  `;

  async function fetchAndCountTokens(url: string, apiKey: string) {
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
        const ai = new GoogleGenAI({ apiKey: apiKey });
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

export async function htmlAnalysis(url: string, apiKey: string) {
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
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: sumarioHTML + html,
    });

    const preText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    let text = preText ? preText : ""; 
    text = text.replace(/^[\s\S]*?(?=---)/, "").trim();
    return text;  
  } catch (err) {
    throw err;
  }
}
  

//console.log(await htmlAnalysis("https://observatorio.aeb.gov.br/"));

const sumarioIMG = `
  Analise a seguinte imagem em relação ao sumário de acessibilidade fornecido, considerando as diretrizes da WCAG 2.2, a norma ABNT NBR 17225:2025 e os guias de acessibilidade do Reino Unido e Brasil. Foque apenas nos pontos que podem ser melhorados, sem listar os acertos ou pontos fortes. A análise deve ser prática e detalhada, apontando problemas, riscos de não conformidade e sugestões de ajustes ou correções.

  De acordo com o seguinte sumário: em aspas triplas
  """
  Guia de Boas Práticas para Acessibilidade Digital
  Este guia é um manual prático e didático que apresenta a acessibilidade digital dividida em quatro pilares de atuação, visando criar uma cultura organizacional e fornecer orientações práticas para equipes multidisciplinares.
  Iniciação
  Adote o conceito de Desenho Universal, inserindo a acessibilidade desde o início do projeto.


  Inclua pessoas com deficiência nas etapas de concepção e validação.


  Crie personas diversificadas, considerando usuários que utilizam tecnologias assistivas ou possuem baixo letramento digital.


  Promova a sensibilização da equipe sobre os direitos das pessoas com deficiência e o potencial de mercado representado por esse público.


  Registre formalmente o escopo do projeto e as entregas esperadas.


  Planejamento
  Aprofunde o entendimento sobre tipos de deficiência e diferentes formas de navegação digital.


  Estruture a arquitetura da informação priorizando a autonomia dos usuários.


  Organize o plano de ação, definindo recursos, responsabilidades e cronograma.


  Execução
  Certifique-se de que desenvolvedores e designers compreendam as exigências de acessibilidade.


  Familiarize a equipe com a documentação da WCAG e os obstáculos mais comuns enfrentados por usuários.


  Evite depender de ferramentas automáticas que prometem resolver acessibilidade de modo instantâneo.


  2. Desenvolvimento (incluindo Testes)
  Testes
  Combine testes manuais e automatizados, utilizando tanto softwares de verificação quanto experimentação prática.


  Envolva pessoas com deficiência na fase de testes.


  Garanta que todas as ações possam ser executadas apenas pelo teclado.


  Utilize leitores de tela (como NVDA ou VoiceOver) para validar a navegação.


  Avalie o desempenho em dispositivos móveis e diferentes tamanhos de tela.


  Código e Estrutura
  Aplique semântica HTML adequada, com uso correto de cabeçalhos (<h1> a <h6>) e landmarks (<main>, <nav>, <footer>).


  Forneça rótulos e descrições precisas para botões e links.


  Crie atalhos de teclado, garantindo que o primeiro leve diretamente ao conteúdo principal.


  Prefira HTML e CSS para textos,  evite inserir texto em imagens.


  Insira texto alternativo (alt) em imagens significativas; use alt="" ou CSS para elementos puramente decorativos.


  Certifique-se de que o texto continue legível com zoom de até 200%.


  Evite tamanhos de fonte fixos e permita redimensionamento.


  Inclua campo de busca, bem como páginas de Acessibilidade e FAQ de fácil acesso.


  Garanta acessibilidade total via teclado, com foco visível e ordem de navegação coerente.


  Em formulários, posicione mensagens de erro com bom contraste e próximas aos campos correspondentes.


  Facilite o preenchimento por meio de máscaras de entrada e autocompletar.


  3. Design
  Concepção
  Desenvolva para todos os perfis de usuários, baseando-se no Desenho Universal.


  Ofereça conteúdos multimodais (texto, áudio e formatos alternativos).


  Considere pessoas idosas e com deficiência desde a concepção do projeto.


  Wireframes
  Planeje o layout antecipando ajustes de contraste e tamanho de fonte.


  Dimensione botões para pessoas com limitações motoras, com área mínima de 48x48 pixels em dispositivos móveis.


  Responsividade
  Adote design responsivo, garantindo boa experiência em diferentes telas.


  Priorize o desenvolvimento mobile first.


  Cores e Contraste
  Escolha paletas considerando usuários daltônicos.


  Não use apenas cores para transmitir informações — combine cores, ícones e texto.


  Assegure contraste mínimo de 4.5:1 entre texto e fundo.


  Utilize ferramentas específicas para checar contraste e legibilidade.


  Interface e Experiência
  Mantenha a interface limpa, consistente e organizada.


  Garanta espaçamento adequado entre elementos clicáveis.


  Ofereça opções de modo de alto contraste, tema escuro (dark mode) e ajuste de tamanho de fonte.


  4. Conteúdo
  Linguagem e Termos:
  Use o termo “pessoa com deficiência (PcD)” e especifique o tipo quando necessário (ex.: cega, surda, autista).
  Textos
  Produza textos claros e objetivos, com pontuação adequada para leitores de tela e estrutura simples (sujeito + verbo + complemento).
  Imagens:
  Inclua texto alternativo (alt) em imagens relevantes e descrições adicionais para gráficos ou diagramas. Utilize ícones com texto sempre que possível.
  Vídeos:
  Adicione legendas, audiodescrição e descrição breve do conteúdo, reservando espaço para janela de Libras.
  Áudio e Podcasts:
  Ofereça versão em áudio dos textos, transcrições completas e, quando viável, intérprete ou avatar em Libras.

  Sumário da Norma ABNT NBR 17225:2025
  A NBR 17225:2025 define os requisitos técnicos obrigatórios para garantir acessibilidade na web, alinhando-se às Diretrizes WCAG 2.2 e às legislações nacionais. Seu foco é assegurar conformidade formal, avaliação estruturada e padronização de práticas acessíveis.
  1. Introdução e Requisitos Gerais
  O objetivo é avaliar a aderência aos padrões, identificar falhas e propor ajustes.


  A norma utiliza como referência principal as WCAG 2.2 e outras normas correlatas da ABNT.


  A avaliação envolve ferramentas automáticas (WAVE, Axe, Lighthouse) e análise manual.


  Níveis de Conformidade
  Conformidade Regular: atendimento aos requisitos essenciais (equivalente ao nível AA das WCAG).


  Conformidade Plena: inclui também as recomendações avançadas (equivalente ao nível AAA).
  2. Interação por Teclado
  Foco visível: todos os elementos interativos precisam ter destaque visual perceptível.


  Elemento em foco visível: o item ativo não pode ser oculto por outros componentes.


  Ordem de navegação: a sequência deve ser previsível e coerente.


  Armadilhas de foco: nenhum componente deve prender o foco do teclado.


  3. Conteúdo e Elementos Web
  Estrutura semântica: uso correto de tags HTML (<h1>–<h6>, nav, main, etc.).


  Formulários acessíveis: cada campo deve ter <label>, mensagens de erro claras e sugestões de correção.


  Arquivos acessíveis: imagens precisam de alt, vídeos devem ter legendas e audiodescrição, e PDFs devem estar em formato acessível.


  4. Navegação e Usabilidade
  Compatibilidade com múltiplos dispositivos de entrada (mouse, teclado, toque).


  Componentes personalizados devem ter instruções e resposta visual ao uso.


  A navegação deve ser consistente e intuitiva, com menus e caminhos padronizados.
  5. Recursos de Acessibilidade Adicionais
  Audiodescrição: verificar a narração de imagens e vídeos relevantes.


  Libras: sempre que possível, incluir vídeos com intérprete.


  Conteúdo adicional: pop-ups, tooltips e menus devem ser acessíveis via teclado e fáceis de dispensar.


  6. Elementos Especiais
  Contraste: mínimo de 4.5:1 entre texto e fundo, e 3:1 para botões e títulos grandes.


  Cores: nunca devem ser o único meio de transmitir informação.


  Tipografia: textos devem ser ampliáveis em até 200% sem distorções.


  7. Avaliação e Documentação
  Compatibilidade: testar com leitores de tela e outras tecnologias assistivas.


  Registro: documentar elementos conformes e não conformes.


  Relatório final: apresentar conclusões, prioridades e recomendações de melhorias.


  Tarefa 3 

  WCAG (Web Content Accessibility Guidelines)

  O WCAG é o padrão internacional que estabelece as diretrizes técnicas para garantir que o conteúdo da web seja acessível, estruturado em quatro princípios de atuação. Para a realização deste sumário foi feita de acordo com a WCGA 2.2.

  1. Perceptível
  O conteúdo deve ser apresentado de forma que possa ser compreendido por usuários, independentemente do sentido utilizado.
  Texto Alternativo e Equivalentes:
  Fornecer texto alternativo  para imagens, botões gráficos e controles que transmitam informação.
  Oferecer legendas para todo o conteúdo de áudio em vídeos e audiodescrição para o conteúdo visual relevante.
  Incluir transcrições completas para podcasts e áudios.
  Adaptável:
  O conteúdo não pode depender apenas de cores, formas ou tamanho para transmitir informação.
  Garantir que a estrutura e o conteúdo possam ser apresentados sem perda de informação em diferentes layouts ou tecnologias assistivas.
  2. Operável
  Os componentes da interface e a navegação devem ser operáveis e responsivos.
  Acessibilidade por Teclado:
  Todas as funcionalidades devem ser acessíveis e executáveis somente através do teclado, sem necessidade de mouse.
  O foco do teclado deve ser visível (com destaque claro) e a ordem de navegação  deve ser lógica e coerente.
  Evitar componentes que prendem o foco do teclado, impedindo a saída.
  Tempo Suficiente:
  Garantir que os usuários tenham tempo adequado para ler e interagir com o conteúdo.
  Permitir que o usuário pause, interrompa ou ajuste o tempo de elementos em movimento.
  Navegação:
  Oferecer mecanismos para saltar blocos repetitivos 
  Fornecer títulos de página claros e descritivos.
  3. Compreensível
  A informação e a operação da interface devem ser facilmente compreendidas.
  Leitura:
  Usar linguagem clara, simples e direta (nível de leitura apropriado).
  Utilizar títulos e cabeçalhos para organizar o conteúdo de forma lógica e hierárquica.
  Previsível e Consistente:
  Garantir que os componentes de navegação (menus, links) sejam consistentes em todo o site.
  Os componentes de interface devem se comportar de maneira previsível quando acionados.
  Entrada de Dados e Formulários:
  Fornecer rótulos explícitos e concisos para todos os campos de formulário.
  Inclui instruções claras e sugestões de correção quando erros de entrada forem detectados.
  Apresentar as mensagens de erro de forma acessível e próxima ao campo correspondente.
  4. Robusto
  O conteúdo deve ser robusto o suficiente para ser interpretado de forma confiável por uma ampla variedade de agentes de usuário (navegadores e tecnologias assistivas).
  Compatibilidade e Semântica:
  Utilizar marcação HTML válida e aderente aos padrões.
  Aplicar a semântica correta .
  Garantir que todos os componentes de interface possam ser lidos e operados por tecnologias assistivas.

  Conclusão 
  Pontos em comum
  Propósito Central: Todos visam à criação de um ambiente web acessível e inclusivo, combatendo as barreiras digitais
  Base Técnica: As WCAG (Web Content Accessibility Guidelines) servem como referência técnica fundamental para ambos os documentos brasileiros.
  Aspectos Fundamentais: Há um consenso sobre a importância dos seguintes requisitos técnicos:
  Uso correto da semântica HTML e títulos hierárquicos.
  Garantia de navegação total por teclado com foco visível.
  Contraste adequado e legibilidade do texto.
  Uso de texto alternativo para imagens e recursos multimídia acessíveis (legendas, audiodescrição).

  Principais diferenças
  Finalidade:
  Guia de Boas Práticas: É educativo e estratégico. Seu objetivo é criar uma cultura de acessibilidade e fornecer um manual prático de implementação para as equipes.
  WCAG (Padrão Internacional): É técnico e diretivo. Seu foco é definir objetivamente o que é acessibilidade através de critérios de sucesso para padronização global.
  NBR 17225:2025 (Norma ABNT): É normativo e legal. Seu propósito é estabelecer os requisitos obrigatórios no Brasil para a certificação de conformidade e aplicação da lei.


  Organização:
  Guia de Boas Práticas: Estrutura-se por Áreas de Atuação e Fluxo de Trabalho (Iniciação, Planejamento, Design, Conteúdo).
  WCAG (Padrão Internacional): Estrutura-se por Princípios de Experiência do Usuário (POUR) (Perceptível, Operável, Compreensível, Robusto).
  NBR 17225:2025 (Norma ABNT): Estrutura-se por Critérios Técnicos e Componentes de Interface (Interação por Teclado, Estrutura Semântica, Contraste).


  Linguagem:
  Guia de Boas Práticas: Utiliza um tom didático, prático e acessível, voltado para a sensibilização e execução por parte dos profissionais.
  WCAG (Padrão Internacional): Utiliza uma linguagem formal, técnica e padronizada, típica de especificações internacionais.
  NBR 17225:2025 (Norma ABNT): Adota uma linguagem objetiva, regulatória e de comando, característica de documentos de certificação e conformidade.
  """

  A seguinte imagem segue os checkpoints abordados pelo sumário?

  Imagem:


  `;


export async function imageAnalysis(imagemBase64: string, apiKey: string): Promise<string> {
const ai = new GoogleGenAI({ apiKey: apiKey});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
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

  const preText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  let text = preText ? preText : ""; 
  text = text.replace(/^[\s\S]*?(?=---)/, "").trim();
  return text;
}

export async function validateKey(apiKey: string) {
    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Retorne somente true e apenas sem nenhuma mensagem a mais apenas true.",
        });

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if(text === "true") return true;
        else return false;
    } catch (err) {
        throw err;
    }x'
}
