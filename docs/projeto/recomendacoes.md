# Ferramentas de Análise Recomendadas

Nosso objetivo é tornar os sites mais acessíveis. Por isso, além da ferramenta que implementamos, também selecionamos outras ferramentas que testamos e aprovamos. Todas são opções práticas e fáceis de usar, pensadas para  ajudar a identificar, corrigir e prevenir barreiras que podem impedir pessoas com deficiência de utilizar produtos digitais de forma eficiente.
A seguir, descrevemos cada uma delas, destacando seus recursos, formas de uso e benefícios.

## 1. WANE

Ferramenta online que identifica e marca problemas de acessibilidade diretamente na própria página, utilizando ícones coloridos para indicar erros, avisos, questões de contraste e elementos de estrutura.

### Como usar:
1. Acesse: [https://wave.webaim.org/](https://wave.webaim.org/)

2. Digite o link do site que você quer analisar.

3. A página será recarregada com ícones na tela, indicando onde há problemas.

4. Clique nos ícones para ver uma explicação clara do problema.

5. Use o painel lateral para ver a lista de erros, contraste e estrutura.

### Vantagens:
- Muito fácil de entender.

- Ótimo para quem não é desenvolvedor.

- Resultado visual: basta olhar os ícones.

- Mostra o problema exatamente no local da página.

### Desvantagens:
- Não pega todos os problemas de acessibilidade.

- Alguns avisos podem precisar de interpretação.

- Só funciona com páginas públicas (para intranets, precisa da extensão).

## 2. AChecker
Ferramenta online que realiza uma varredura automática no site e gera um relatório de acessibilidade detalhado, destacando erros, avisos e recomendações de melhoria. Ela analisa elementos do código, estrutura da página e conformidade com padrões de acessibilidade, oferecendo sugestões práticas para corrigir os problemas identificados.

### Como usar:
1. Acesse: [https://achecks.org/achecker](https://achecks.org/achecker)

2. Cole o link do site a ser avaliado.

3. Escolha o padrão (recomendo WCAG 2.0).

4. Clique em Check It.

5. O relatório será exibido com a lista de problemas e explicações.

### Vantagens:
- Muito simples: só colar o link.

- Relatório fácil de entender.

- Útil para trabalhos, relatórios e estudos.

### Desvantagens:
- Interface simples, meio antiga.

- Não mostra problemas diretamente na página.

## 3. ASES
O ASES é uma ferramenta online desenvolvida pelo Governo Federal do Brasil que analisa automaticamente páginas web e gera um relatório de acessibilidade conforme os padrões nacionais e internacionais. Ele identifica erros, avisos e pontos críticos relacionados à navegação, leitura, estrutura e compatibilidade com tecnologias assistivas. Além disso, fornece explicações e sugestões de correção, ajudando a melhorar a experiência de pessoas com deficiência ao utilizar o site.

### Como usar:
1. Acesse o site do ASES: [https://ases.acessibilidade.gov.br/](https://ases.acessibilidade.gov.br/)

2. No campo principal, cole o link da página que deseja avaliar.

3. Clique em “Avaliar”.

4. Aguarde a análise automática — o sistema irá gerar um relatório com:
   - Erros críticos
   - Avisos
   - Sugestões de melhoria
   - Conformidade com padrões de acessibilidade brasileiros (eMAG) e internacionais

5. Navegue pelas seções do relatório para ver detalhes de cada problema.
6. Use as recomendações para ajustar o código, revisar textos, melhorar estrutura, entre outros pontos.

### Vantagens:
- Ferramenta oficial brasileira, alinhada ao padrão eMAG.

- Interface simples e fácil de usar, ideal para estudantes, pesquisadores e equipes públicas.

- Relatórios claros com explicações sobre cada problema encontrado.

- Permite avaliar páginas individuais sem necessidade de cadastro.

- Bom para diagnósticos rápidos e para uso em trabalhos acadêmicos.

### Desvantagens:
- Pode gerar falsos positivos para sites mais modernos com scripts dinâmicos.

- Analisa apenas a página informada, não o site inteiro.

- Interface não tão moderna quanto outras ferramentas internacionais.

- Não mostra visualmente os erros na própria página (como faz o WAVE).

- Algumas recomendações são técnicas e podem exigir ajuda de um desenvolvedor para corrigir.

## 4. Lighthouse
Ferramenta de auditoria integrada ao Chrome DevTools que avalia automaticamente vários aspectos de uma página, incluindo acessibilidade. Ela gera um relatório com pontuação, identifica problemas e oferece sugestões técnicas de melhoria. Pode ser executada diretamente no navegador ou por linha de comando, permitindo análises rápidas ou integrações em processos de desenvolvimento.

Saiba mais: [https://developer.chrome.com/docs/lighthouse/overview?utm_source=chatgpt.com&hl=pt-br](https://developer.chrome.com/docs/lighthouse/overview?utm_source=chatgpt.com&hl=pt-br)

### Como usar:
1. Abra a página no Chrome.

2. Abra DevTools (F12) → aba Lighthouse.

3. Marque apenas a opção Accessibility (ou marque outras categorias se quiser) e clique Generate report / Run audits. 

4. Aguarde o relatório: ele traz uma pontuação, lista de auditorias que falharam e links de documentação que explicam como corrigir.

5. Use os itens com maior impacto como prioridade (Lighthouse também explica a importância de cada auditoria)

### Vantagens:
- Fácil, rápido e já disponível no Chrome sem instalar nada extra. 

- Dá pontuação e referência técnica — ótimo para acompanhar regressões (CI/CD com Lighthouse CI). 

- Integra bem com performance e melhores práticas (visão única).

### Desvantagens:
- Algumas checagens são automáticas e não capturam problemas que exigem teste com teclado/voz/usuário real.

- Pode variar dependendo do ambiente (em páginas altamente dinâmicas, pode precisar de configuração extra).

- Relatórios são técnicos — designers podem precisar de ajuda para interpretar.

  ## 5. VLIBRAS
  O VLibras é uma ferramenta desenvolvida pelo Governo Federal do Brasil que realiza a tradução automática de conteúdos digitais para Libras (Língua Brasileira de Sinais). Ele funciona como um plugin ou widget que pode ser incorporado ao site, permitindo que pessoas surdas tenham acesso ao conteúdo por meio de um avatar 3D que interpreta textos, áudios e vídeos em Libras. Seu objetivo é tornar páginas web mais inclusivas e acessíveis para a comunidade surda usuária da língua de sinais.

### Como instalar no site:
1. Acesse: [https://www.vlibras.gov.br](https://www.vlibras.gov.br)

2. Vá em "Desenvolvedores".

3. Copie o código de integração.

4. Cole o script no HTML do site, antes do fechamento da tag <body>.

5. A ferramenta aparecerá automaticamente na página.

### Vantagens:
- Ferramenta oficial, gratuita e amplamente utilizada no setor público.

- Facilita a inclusão de pessoas surdas usuárias de Libras.

- Avatar 3D de fácil visualização e compreensão.

- Integração simples em sites.

- Suporta tradução de textos, áudios e vídeos.

### Desvantagens:
- A tradução automática pode não ser perfeita — nuances da Libras podem se perder.

- Depende de conexão estável com a internet.

- Nem todo conteúdo é interpretado exatamente como um tradutor humano faria.

- Requer atenção ao posicionamento para não sobrepor elementos importantes da página.
  

## Considerações finais
Essas ferramentas, quando utilizadas em conjunto, permitem uma avaliação eficiente e contribuem para a criação de sites mais acessíveis e inclusivos.
