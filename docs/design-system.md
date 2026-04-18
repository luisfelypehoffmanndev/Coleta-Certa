# Design System

## Objetivo

O Coleta Certa usa uma linguagem visual voltada para leitura rápida em contexto mobile. A prioridade é destacar a próxima ação do usuário, reduzir ruído visual e manter consistência entre calendário, alertas e orientações.

## Princípios

- hierarquia tipográfica curta e direta;
- contraste suficiente entre conteúdo principal e informações secundárias;
- uso de cor para reforçar tipo de resíduo, nunca como único identificador;
- cards leves e espaçamento previsível para leitura em telas pequenas;
- navegação inferior simples e estável.

## Direção visual

- fundo claro com aparência limpa e utilitária;
- verde como cor primária de navegação e destaque;
- superfícies auxiliares suaves para categorias de resíduos;
- blocos de informação em formato de card;
- foco em legibilidade antes de ornamentação.

## Estrutura de interface

O app atualmente é organizado em quatro áreas principais:

- `Início`: resumo da próxima coleta e agenda imediata
- `Calendário`: visão mensal das coletas
- `Dicas`: orientações rápidas e descarte
- `Config`: preferências e dados locais do usuário

## Implementação

Os estilos compartilhados ficam centralizados em:

- `src/theme/tokens.ts`
- `src/ui/styles.ts`

A implementação visual foi mantida em `React Native StyleSheet`, sem dependência de frameworks de styling adicionais.
