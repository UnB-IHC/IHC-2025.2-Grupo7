# **Ferramentas, Tecnologias e Referências da Solução Desenvolvida**

## **Descrição Geral da Ferramenta Implementada**

A equipe desenvolveu um **site de análise de acessibilidade** que integra diretamente com a **API do Google Gemini**, permitindo avaliar páginas web a partir de **um link** ou **uma imagem capturada/enviada pelo usuário**.
A ferramenta utiliza como base o **pocket de heurísticas**, incluindo:

* Heurísticas de Nielsen
* WCAG 2.2
* Guia de Boas Práticas de Acessibilidade Digital
* ABNT NBR 17225:2025

O objetivo principal é **automatizar uma análise inicial**, gerando insights, alertas e sugestões de melhoria com base nos critérios de acessibilidade definidos no projeto.

---

## **Arquitetura e Tecnologias Utilizadas**

### **Integração com API de IA**

* **Google Gemini API**
  Utilizada para interpretar o conteúdo enviado pelo usuário (URL ou imagem) e gerar uma análise contextualizada com base nos critérios de acessibilidade do pocket.

### **Frontend e Interface**

* **Next.js**
  O projeto está estruturado em Next.js, garantindo desempenho, modularização e suporte otimizado para React.

* **Tailwind CSS**
  Responsável pelo estilo do site, aplicado por meio de PostCSS.

* **TypeScript**
  Toda a base do site foi construída em TypeScript, garantindo maior segurança, tipagem estática e organização do código.

### **Processamento e Geração de Relatórios**

O site permite ao usuário **baixar um PDF** da análise realizada. Para isso, utilizamos duas bibliotecas fundamentais:

#### **1. Conversão de Markdown para HTML — `marked`**

* Usada para transformar o texto gerado pelo Gemini (formatado em Markdown) em HTML.
* Permite estilização, estruturação e compatibilidade com PDF.

#### **2. Conversão de HTML para PDF — `puppeteer`**

* O HTML gerado é renderizado em um ambiente headless (Chromium) pelo Puppeteer.
* Em seguida, é convertido em um **PDF totalmente formatado**, pronto para download.
* Garante precisão visual e permite customização de layout (margens, fontes, cabeçalhos etc.)

### **Fluxo da Ferramenta**

1. **Usuário envia link ou imagem**
2. **O sistema coleta informações da página** (HTML ou imagem processada)
3. **A API do Gemini gera a análise** com base no pocket
4. **O texto é convertido em Markdown estruturado**
5. **Markdown → HTML (via marked)**
6. **HTML → PDF (via puppeteer)**
7. **Usuário baixa o relatório completo**

---

## **Referências e Diretrizes Utilizadas**

### **WCAG — Web Content Accessibility Guidelines**

* **Versão:** WCAG 2.2
* **Nível de Conformidade Meta:** AA
* **Link:** [https://www.w3.org/WAI/WCAG22/](https://www.w3.org/WAI/WCAG22/)
* Fundamentou os critérios de perceptibilidade, operabilidade, compreensibilidade e robustez.

### **ABNT NBR 17225:2025**

* Norma brasileira que adapta e complementa as WCAG.
* Aplicada para alinhar o site aos requisitos utilizados em auditorias oficiais no Brasil.

### **Heurísticas de Nielsen**

* Usadas para análises de usabilidade (feedback, correspondência com o mundo real, consistência, prevenção de erros etc.)

### **Guia de Boas Práticas de Acessibilidade Digital**

* Base para recomendações práticas, como:

  * HTML semântico
  * design responsivo
  * contraste
  * testes com PcD
  * práticas editoriais inclusivas

---

## **Metodologia de Análise Aplicada**

### **Etapas do Processo**

1. Coleta da página ou imagem enviada
2. Leitura semântica e contextual via Gemini
3. Classificação dos problemas usando o pocket
4. Organização das sugestões em categorias (Nielsen, WCAG, NBR, Boas Práticas)
5. Geração de relatório em Markdown
6. Conversão e exportação em PDF

### **Critérios Avaliados**

* **Perceptibilidade** (alt text, contraste, multimídia)
* **Operabilidade** (teclado, navegação, tempo)
* **Compreensibilidade** (conteúdo, previsibilidade, formulários)
* **Robustez** (HTML semântico, compatibilidade com leitores de tela)
* **Usabilidade geral** (feedback, controle, padrão, consistência)


