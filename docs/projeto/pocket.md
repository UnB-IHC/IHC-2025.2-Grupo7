# **Pocket de Avaliação de Usabilidade e Acessibilidade**

Este pocket resume os principais critérios avaliados na interface do sistema com base em quatro referenciais fundamentais: **Heurísticas de Nielsen**, **WCAG 2.2**, **Guia de Boas Práticas para Acessibilidade Digital** e **ABNT NBR 17225:2025**. Ele funciona como um **checklist rápido** para identificar barreiras e apoiar decisões de design acessível. 

---

## **1. Heurísticas de Nielsen (Usabilidade)**

Estamos avaliando a interface com base nas 10 Heurísticas de Usabilidade de Nielsen, um dos modelos mais reconhecidos internacionalmente para análise da facilidade de uso em sistemas digitais.
Essa abordagem é fundamental porque essas heurísticas permitem identificar rapidamente problemas de usabilidade, como falta de clareza, inconsistências, dificuldade de navegação, erros e ausência de feedback que comprometem diretamente a experiência do usuário.

*Objetivo: garantir que a interface seja intuitiva, consistente, clara e eficiente.*

<div style="width: 280px; height: 280px; margin: 10px auto;">
  <canvas id="chart-nielsen"></canvas>
</div>

### **Feedback e Status – Visibilidade do Sistema**
- [ ] O sistema informa o status das ações?
- [ ] Existem indicadores visuais (carregamento, sucesso, progresso)?

### **Correspondência com o Mundo Real – Linguagem e Ícones**

- [ ] Linguagem familiar ao usuário?
- [ ] Informações organizadas logicamente?
- [ ] Ícones compreensíveis e universais?

### **Controle e Liberdade**

- [ ] Há como cancelar ações?
- [ ] Existe opção de desfazer (Undo) ou cancelar em formulários?

### **Consistência e Padrões**

- [ ] Interface consistente em ícones, termos e fluxos?
- [ ] Menus e elementos mantêm posição e sentido?

### **Prevenção de Erros**

- [ ] O design evita erros antes que aconteçam?
- [ ] Botões desabilitados e confirmações quando necessário?

### **Reconhecimento vs. Memorização**

- [ ] Opções visíveis, minimizando memorização?
- [ ] Uso de menus claros, listas e rótulos identificáveis?

### **Flexibilidade e Eficiência**

- [ ] Navegação adequada a iniciantes e experientes?
- [ ] Atalhos disponíveis?

### **Design Estético e Minimalista**

- [ ] Interface limpa e focada no essencial?
- [ ] Sem excesso de elementos que distraem?

### **Ajuda em Erros**

- [ ] Mensagens de erro claras e específicas?
- [ ] Orientação sobre como corrigir o erro?

### **Ajuda e Documentação**

- [ ] Ajuda acessível e bem estruturada?
- [ ] FAQs e tooltips quando necessário?

---

## **2. WCAG 2.2 (Acessibilidade Web)**

Estamos analisando o site com base nas Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2), o padrão internacional mais adotado para garantir que pessoas com deficiência consigam acessar e utilizar conteúdos digitais.
Essa avaliação é essencial porque a WCAG assegura que o conteúdo seja perceptível, operável, compreensível e robusto, reduzindo barreiras e promovendo inclusão para milhões de usuários.

*Objetivo: tornar o conteúdo perceptível, operável, compreensível e robusto para todos.*

<div style="width: 280px; height: 280px; margin: 10px auto;">
  <canvas id="chart-wcag"></canvas>
</div>

### **Perceptível – Texto e Imagens**

- [ ] Todas as imagens têm alt adequado?
- [ ] Elementos gráficos possuem descrição?

**Multimídia**

- [ ] Vídeos com legendas e audiodescrição?
- [ ] Áudios possuem transcrição?

**Adaptabilidade**

- [ ] Informação não depende só de cor ou forma?
- [ ] Layout não perde conteúdo em diferentes orientações?

### **Operável**

**Teclado**

- [ ] Tudo funciona via teclado?
- [ ] Foco visível e navegação lógica?
- [ ] Sem armadilhas de foco?

**Tempo**

- [ ] Usuário pode pausar/ajustar elementos temporizados?

**Navegação**

- [ ] Atalhos para pular blocos repetidos?
- [ ] Títulos de páginas claros?

### **Compreensível**

- [ ] Linguagem simples e direta?
- [ ] Cabeçalhos organizados (`<h1>`–`<h6>`)?
- [ ] Comportamento consistente dos componentes?

**Formulários**

- [ ] Rótulos claros?
- [ ] Erros próximos ao campo?
- [ ] Instruções compreensíveis?

### **Robusto**

- [ ] HTML válido e semântico?
- [ ] Compatível com tecnologias assistivas?

---

## **3. Guia de Boas Práticas para Acessibilidade Digital**

Estamos utilizando como referência o Guia de Boas Práticas para Acessibilidade Digital, que complementa a WCAG ao apresentar orientações práticas sobre processos, equipes, testes, design e produção de conteúdo.
Essa referência é importante porque trata a acessibilidade como parte integral do fluxo de trabalho, garantindo que ela não seja apenas um checklist final, mas um processo contínuo de melhoria.

*Objetivo: incorporar acessibilidade no processo, não apenas no resultado final.*

<div style="width: 280px; height: 280px; margin: 10px auto;">
  <canvas id="chart-guia"></canvas>
</div>

### **Iniciação e Planejamento**

- [ ] Acessibilidade desde o início?
- [ ] Participação de pessoas com deficiência?
- [ ] Personas diversas definidas?
- [ ] Arquitetura prioriza autonomia?

### **Desenvolvimento e Testes**

**Testes**

- [ ] Testes manuais + automatizados?
- [ ] PcDs participam dos testes?
- [ ] Teste com leitores de tela?
- [ ] Navegação por teclado testada?

**Código**

- [ ] HTML semântico adequado?
- [ ] Rótulos precisos para links e botões?
- [ ] Atalhos de teclado?
- [ ] Nada de imagens contendo texto?
- [ ] Alt correto em imagens significativas?
- [ ] Zoom a 200% mantém legibilidade?
- [ ] Fontes ajustáveis?
- [ ] Busca e FAQ acessíveis?

**Formulários**

- [ ] Erros com bom contraste e posição correta?
- [ ] Máscaras e autocompletar?

### **Design**

- [ ] Conteúdo em múltiplos formatos?
- [ ] Botões ≥ 48×48px?
- [ ] Design responsivo?
- [ ] Cores adequadas a daltonismo?
- [ ] Contraste mínimo 4.5:1?
- [ ] Espaçamento entre elementos clicáveis?
- [ ] Opções de alto contraste/dark mode?

### **Conteúdo**

- [ ] Termo “Pessoa com Deficiência (PcD)” corretamente usado?
- [ ] Texto simples e claro?
- [ ] Gráficos possuem descrição extra?
- [ ] Vídeos com Libras/legendas/audiodescrição?
- [ ] Podcasts com transcrições?

---

## **4. ABNT NBR 17225:2025**

*Objetivo: garantir a conformidade com o padrão brasileiro obrigatório para acessibilidade digital.*

<div style="width: 280px; height: 280px; margin: 10px auto;">
  <canvas id="chart-abnt"></canvas>
</div>

### **Requisitos Gerais e Avaliação**

- [ ] Avaliação com WAVE, Axe, Lighthouse?
- [ ] Compatibilidade com leitores de tela?
- [ ] Atende ao nível AA da WCAG?

### **Interação por Teclado**

- [ ] Foco visível em todos os elementos?
- [ ] Foco não escondido?
- [ ] Ordem de navegação coerente?
- [ ] Sem aprisionamento do foco?

### **Conteúdo e Elementos Web**

- [ ] Estrutura semântica (`<h1>`–`<h6>`, `<nav>`, `<main>`)?
- [ ] Campos com `<label>`?
- [ ] Erros claros e com sugestões?
- [ ] Alt em imagens?
- [ ] Vídeos com legendas/audiodescrição?
- [ ] PDFs acessíveis?

### **Navegação e Usabilidade**

- [ ] Navegação consistente?
- [ ] Widgets e players com instrução e feedback?

### **Recursos Adicionais**

- [ ] Fazer isso
- [ ] Audiodescrição em imagens relevantes?
- [ ] Possibilidade de Libras?
- [ ] Pop-ups e menus acessíveis via teclado?
- [ ] Contraste mínimo conforme norma?
- [ ] Cor não é o único sinal?
- [ ] Texto ampliável até 200%?