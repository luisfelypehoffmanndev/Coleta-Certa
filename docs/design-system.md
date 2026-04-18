# Direção visual

## Objetivo

Fazer um app utilitário, claro e confiável. A interface precisa responder rápido:

- o que sai hoje;
- quando colocar o lixo para fora;
- onde descartar eletrônicos.

## Decisões de design

- Fundo claro e quente para evitar aparência hospitalar ou pesada.
- Verde profundo como cor principal por associação ambiental, mas sem excesso.
- Cards simples com alto contraste e pouco ruído visual.
- Hierarquia tipográfica curta, com títulos fortes e texto direto.
- Cor sempre acompanhada de texto para acessibilidade.
- Formulário de login discreto e sem excesso de campos, para não competir com a função utilitária do app.

## Tokens atuais

- `background`: areia clara.
- `surface`: branco aquecido.
- `primary`: verde profundo.
- `alert`: terracota para comunicados excepcionais.

## Evolução planejada

- Biblioteca de componentes com tabs, badge e células de calendário.
- Modo de acessibilidade com contraste elevado.
- Estados offline, erro e vazio mais completos.

## Atualização visual de 2026-04-18

- A interface foi realinhada com a identidade visual do arquivo Figma `Coleta certa`.
- `Home`, `Calendário`, `Dicas` e a navegação inferior passaram a seguir a mesma hierarquia visual observada no Figma: topo verde, cards brancos leves, badges por tipo de resíduo e tipografia curta.
- Os tokens foram ajustados para refletir a paleta do layout de referência:
  - verde principal `#10B881`
  - verde escuro `#047957`
  - fundo claro `#F6FBF7`
  - azul informativo `#2563EB`
  - superfícies por resíduo com amarelo, ciano e rosa suave
- O calendário foi redesenhado para reproduzir a composição do frame de setembro de 2026, mantendo a implementação em `React Native` e `StyleSheet`, sem introduzir dependências novas.
- A aba `Dicas` foi aproximada da tela `Tips` do Figma e continuou exibindo os pontos de descarte já existentes no MVP.
- `Login` e `Configurações` foram harmonizados com a mesma linguagem visual para evitar ruptura entre telas desenhadas e telas funcionais.

## Restrições consideradas

- O app continua sem biblioteca de ícones e sem gradientes nativos extras para evitar expandir a stack do MVP.
- O MCP do Figma entrou em rate limit durante a consulta; o alinhamento final usou os frames de `Home` e `Calendar` extraídos antes do limite e preservou a mesma direção visual nas demais telas.
