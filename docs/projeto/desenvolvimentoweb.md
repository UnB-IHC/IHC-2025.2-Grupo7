# Guia de Acessibilidade e Usabilidade: Desenvolvimento Web

Este guia orienta a etapa de implementação técnica, assegurando que a interface seja não apenas visualmente fiel, mas estruturalmente robusta e semanticamente correta. Focado na validação de código (HTML/CSS/JS), o documento alinha as diretrizes da WCAG 2.2 e da norma ABNT NBR 17225:2025 para garantir a compatibilidade com tecnologias assistivas, a fluidez da navegação via teclado e a prevenção de erros sistêmicos. É o roteiro definitivo para transformar layouts estáticos em experiências digitais operáveis por qualquer usuário.

<div style="width: 300px; height: 300px; margin: 20px auto;">
  <canvas id="accessibility-chart"></canvas>
</div>

## Heurísticas de Nielsen

- **Feedback e Status do Sistema**

- [ ] O sistema informa o status das ações? [[Heurística #1]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Existem indicadores visuais (carregamento, sucesso, progresso)? [[Heurística #1]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Botões desabilitados e confirmações quando necessário? [[Heurística #5]](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [ ] Atalhos disponíveis? [[Heurística #7]](https://www.nngroup.com/articles/ten-usability-heuristics/)

## WCAG 2.2

- **Navegação e Interação (Teclado e Foco)**

- [ ] Tudo funciona via teclado? [[WCAG 2.1.1]](https://www.w3.org/TR/WCAG22/#keyboard)
- [ ] Foco visível e navegação lógica? [[WCAG 2.4.7]](https://www.w3.org/TR/WCAG22/#focus-visible), [[WCAG 2.4.3]](https://www.w3.org/TR/WCAG22/#focus-order), [[WCAG 2.4.11 - AA]](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum), [[WCAG 2.4.13 - AAA]](https://www.w3.org/TR/WCAG22/#focus-appearance)
- [ ] Sem armadilhas de foco? [[WCAG 2.1.2]](https://www.w3.org/TR/WCAG22/#no-keyboard-trap)
- [ ] Usuário pode pausar/ajustar elementos temporizados? [[WCAG 2.2.1]](https://www.w3.org/TR/WCAG22/#timing-adjustable)
- [ ] Atalhos para pular blocos repetidos? [[WCAG 2.4.1]](https://www.w3.org/TR/WCAG22/#bypass-blocks)

-----

- **Estrutura e Semântica**

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

- **Navegação e Interação (Teclado e Foco)**

- [ ] Foco visível em todos os elementos? [[NBR 5.1.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Foco não escondido? [[NBR 5.1.2]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.3]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Ordem de navegação coerente? [[NBR 5.1.4]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Sem aprisionamento do foco? [[NBR 5.1.6]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Pop-ups e menus acessíveis via teclado? [[NBR 5.1.12]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.1.7]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)

-----

- **Estrutura e Semântica**

- [ ] Estrutura semântica (`<h1>`–`<h6>`, `<nav>`, `<main>`)? [[NBR 5.3.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.4.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Campos com `<label>`? [[NBR 5.9.1]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Erros claros e com sugestões? [[NBR 5.9.9]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Navegação consistente? [[NBR 5.7.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Widgets e players com instrução e feedback? [[NBR 5.1.16]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.8.15]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)
- [ ] Texto ampliável até 200%? [[NBR 5.12.7]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf), [[NBR 5.13.5]](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf)

## Referências Bibliográficas 

<a id="FRM1" href="#anchor_1">1.</a> DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. Guia de Boas Práticas para Acessibilidade Digital. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: [https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf). Acesso em: 17 Nov. 2025.

<a id="FRM2" href="#anchor_2">2.</a> ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 17225: Acessibilidade para conteúdo web. Rio de Janeiro: ABNT, 2025.

<a id="FRM3" href="#anchor_2">3.</a> W3C. Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/). Acesso em: 17 Nov. 2025.

<a id="ref1" href="#anchor_1">4.</a> Google – Chrome for Developers. Documentação e Ferramentas para Desenvolvedores. Disponível em: [https://developer.chrome.com/](https://developer.chrome.com/). Acesso em: 17 Nov. 2025.

<a id="ref2" href="#anchor_2">5.</a> W3C. Success Criterion 1.3.1: Info and Relationships. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#info-and-relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships). Acesso em: 17 Nov. 2025.

<a id="ref3" href="#anchor_3">6.</a> W3C. Success Criterion 2.1.1: Keyboard. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#keyboard](https://www.w3.org/TR/WCAG22/#keyboard). Acesso em:  17 Nov. 2025.

<a id="ref4" href="#anchor_4">7.</a> W3C. Success Criterion 2.1.2: No Keyboard Trap. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#no-keyboard-trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap). Acesso em: 17 Nov. 2025.

<a id="ref5" href="#anchor_5">8.</a> W3C. Success Criterion 2.2.1: Timing Adjustable. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#timing-adjustable](https://www.w3.org/TR/WCAG22/#timing-adjustable). Acesso em: 17 Nov. 2025.

<a id="ref6" href="#anchor_6">9.</a> W3C. Success Criterion 2.4.1: Bypass Blocks. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#bypass-blocks](https://www.w3.org/TR/WCAG22/#bypass-blocks). Acesso em: 17 Nov. 2025.

<a id="ref7" href="#anchor_7">10.</a> W3C. Success Criterion 2.4.3: Focus Order. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#focus-order](https://www.w3.org/TR/WCAG22/#focus-order). Acesso em: 17 Nov. 2025.

<a id="ref8" href="#anchor_8">11.</a> W3C. Success Criterion 2.4.7: Focus Visible. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#focus-visible](https://www.w3.org/TR/WCAG22/#focus-visible). Acesso em: 17 Nov. 2025.

<a id="ref9" href="#anchor_9">12.</a> W3C. Success Criterion 2.4.11: Focus Not Obscured (Minimum). In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum). Acesso em: 17 Nov. 2025.

<a id="ref10" href="#anchor_10">13.</a> W3C. Success Criterion 2.4.13: Focus Appearance. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#focus-appearance](https://www.w3.org/TR/WCAG22/#focus-appearance). Acesso em: 17 Nov. 2025.

<a id="ref11" href="#anchor_11">14.</a> W3C. Success Criterion 3.2.3: Consistent Navigation. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#consistent-navigation](https://www.w3.org/TR/WCAG22/#consistent-navigation). Acesso em: 17 Nov. 2025.

<a id="ref12" href="#anchor_12">15.</a> W3C. Success Criterion 3.3.1: Error Identification. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#error-identification](https://www.w3.org/TR/WCAG22/#error-identification). Acesso em: 17 Nov. 2025.

<a id="ref13" href="#anchor_13">16.</a> W3C. Success Criterion 3.3.3: Error Suggestion. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#error-suggestion](https://www.w3.org/TR/WCAG22/#error-suggestion). Acesso em: 17 Nov. 2025.

<a id="ref14" href="#anchor_14">17.</a> W3C. Success Criterion 4.1.1: Parsing. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#parsing](https://www.w3.org/TR/WCAG22/#parsing). Acesso em: 17 Nov. 2025.

<a id="ref15" href="#anchor_15">18.</a> W3C. Success Criterion 4.1.2: Name, Role, Value. In: Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/#name-role-value](https://www.w3.org/TR/WCAG22/#name-role-value). Acesso em: 17 Nov. 2025.

<a id="FRM2" href="#anchor_2">19.</a> NIELSEN, Jakob. Usability Engineering. Boston: Academic Press, 1994.
