# Guia de Acessibilidade e Usabilidade: Desenvolvimento Web

Este guia orienta a etapa de implementação técnica, assegurando que a interface seja não apenas visualmente fiel, mas estruturalmente robusta e semanticamente correta. Focado na validação de código (HTML/CSS/JS), o documento alinha as diretrizes da WCAG 2.2 e da norma ABNT NBR 17225:2025 para garantir a compatibilidade com tecnologias assistivas, a fluidez da navegação via teclado e a prevenção de erros sistêmicos. É o roteiro definitivo para transformar layouts estáticos em experiências digitais operáveis por qualquer usuário.

<div style="width: 300px; height: 300px; margin: 20px auto;">
  <canvas id="accessibility-chart"></canvas>
</div>

## Heurísticas de Nielsen

### Feedback e Status do Sistema

- [ ] O sistema informa o status das ações? [[Heurística #1]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Existem indicadores visuais (carregamento, sucesso, progresso)? [[Heurística #1]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Botões desabilitados e confirmações quando necessário? [[Heurística #5]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Atalhos disponíveis? [[Heurística #7]](https://www.nngroup.com/articles/ten-usability-heuristics/)

## WCAG 2.2

### Navegação e Interação (Teclado e Foco)

- [ ] Tudo funciona via teclado? [[WCAG 2.1.1]](https://www.w3.org/TR/WCAG22/#keyboard)
- [ ] Foco visível e navegação lógica? [[WCAG 2.4.7]](https://www.w3.org/TR/WCAG22/#focus-visible), [[WCAG 2.4.3]](https://www.w3.org/TR/WCAG22/#focus-order), [[WCAG 2.4.11 - AA]](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum), [[WCAG 2.4.13 - AAA]](https://www.w3.org/TR/WCAG22/#focus-appearance)
- [ ] Sem armadilhas de foco? [[WCAG 2.1.2]](https://www.w3.org/TR/WCAG22/#no-keyboard-trap)
- [ ] Usuário pode pausar/ajustar elementos temporizados? [[WCAG 2.2.1]](https://www.w3.org/TR/WCAG22/#timing-adjustable)
- [ ] Atalhos para pular blocos repetidos? [[WCAG 2.4.1]](https://www.w3.org/TR/WCAG22/#bypass-blocks)

### Estrutura e Semântica

- [ ] Cabeçalhos organizados (`<h1>`–`<h6>`)? [[WCAG 1.3.1]](https://www.w3.org/TR/WCAG22/#info-and-relationships)
- [ ] Comportamento consistente dos componentes? [[WCAG 3.2.3]](https://www.w3.org/TR/WCAG22/#unusual-words)
- [ ] Erros próximos ao campo? [[WCAG 3.3.1]](https://www.w3.org/TR/WCAG22/#error-identification), [[WCAG 3.3.3]](https://www.w3.org/TR/WCAG22/#error-suggestion)
- [ ] HTML válido e semântico? [[WCAG 4.1.2]](https://www.w3.org/TR/WCAG22/#name-role-value), [[WCAG 4.1.1 - A]](https://www.w3.org/TR/WCAG22/#parsing), [[WCAG 1.3.1]](https://www.w3.org/TR/WCAG22/#info-and-relationships)
- [ ] Compatível com tecnologias assistivas? [[WCAG 4.1.2]](https://www.w3.org/TR/WCAG22/#name-role-value)

## Guia de Boas Práticas
- [ ] HTML semântico adequado? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Rótulos precisos para links e botões? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Atalhos de teclado? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Nada de imagens contendo texto? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Zoom a 200% mantém legibilidade? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Fontes ajustáveis? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Busca e FAQ acessíveis? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)
- [ ] Máscaras e autocompletar? [[Guia UK-BR]](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf)

## ABNT NBR 17225:2025

### Navegação e Interação (Teclado e Foco)

- [ ] Foco visível em todos os elementos? [[NBR 5.1.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Foco não escondido? [[NBR 5.1.2]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.3]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Ordem de navegação coerente? [[NBR 5.1.4]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Sem aprisionamento do foco? [[NBR 5.1.6]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Pop-ups e menus acessíveis via teclado? [[NBR 5.1.12]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.7]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)

### Estrutura e Semântica

- [ ] Estrutura semântica (`<h1>`–`<h6>`, `<nav>`, `<main>`)? [[NBR 5.3.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.4.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Campos com `<label>`? [[NBR 5.9.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Erros claros e com sugestões? [[NBR 5.9.9]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Navegação consistente? [[NBR 5.7.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Widgets e players com instrução e feedback? [[NBR 5.1.16]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.8.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Texto ampliável até 200%? [[NBR 5.12.7]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.13.5]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)

## Bibliografia

<a id="FRM1" href="#anchor_1">1.</a> DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. Guia de Boas Práticas para Acessibilidade Digital. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: [https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf). Acesso em: 17 Nov. 2025.

<a id="FRM2" href="#anchor_2">2.</a> ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 17225: Acessibilidade para conteúdo web. Rio de Janeiro: ABNT, 2025.

<a id="FRM2" href="#anchor_2">3.</a> W3C. Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/). Acesso em: 17 Nov. 2025.

<a id="FRM2" href="#anchor_2">4.</a> NIELSEN, Jakob. Usability Engineering. Boston: Academic Press, 1994.