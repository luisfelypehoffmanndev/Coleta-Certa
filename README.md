# Coleta Certa

Aplicativo mobile em `Expo + React Native + TypeScript` para acompanhar coletas urbanas, orientar a separação correta dos resíduos e destacar pontos de descarte eletrônico.

## Visão geral

O projeto foi estruturado como um MVP mobile com foco em utilidade pública:
- tela inicial com próxima coleta e agenda resumida;
- calendário mensal de coletas;
- dicas rápidas de reciclagem;
- pontos de descarte eletrônico;
- preferências locais por bairro e antecedência de lembrete;
- autenticação simulada com sessão persistida.

A interface atual foi alinhada à identidade visual do Figma de referência, mantendo a implementação em `React Native` com `StyleSheet` e sem introduzir bibliotecas visuais extras.

## Stack

- `Expo`
- `React Native`
- `TypeScript`
- `Jest`
- `Testing Library`
- `zod`

## Funcionalidades atuais

- login demo com sessão local persistida;
- agenda de coleta baseada em dados mockados;
- telas de `Início`, `Calendário`, `Dicas` e `Config`;
- preferências salvas com `AsyncStorage`;
- sessão protegida com `SecureStore`;
- testes automatizados para domínio, autenticação e fluxos principais da interface.

## Rodando localmente

```bash
npm install
npm run typecheck
npm run test
npm start
```

Atalhos úteis:

```bash
npm run android
npm run ios
npm run web
```

## Conta demo

- e-mail: `felipe@ecoleta.app`
- senha: `ecoleta123`

## Estrutura

- `src/screens`: telas e composição da UI.
- `src/domain`: regras de negócio, contratos e schemas.
- `src/data`: fixtures e mocks do piloto.
- `src/hooks`: bootstrap de sessão e dados.
- `src/services`: persistência local e acesso a mocks.
- `src/theme`: tokens visuais.
- `src/ui`: estilos compartilhados.
- `docs`: arquitetura, design, testes e segurança.

## Design

- `Início`, `Calendário` e `Dicas` seguem a identidade visual do arquivo Figma `Coleta certa`.
- O app usa fundo claro, verde como cor primária e cards de leitura rápida.
- O calendário foi redesenhado para refletir a composição visual do frame de setembro de 2026.

Mais contexto em [docs/design-system.md](/home/felype/ecoleta/docs/design-system.md).

## Qualidade

Validação local usada nesta versão:

```bash
npm run typecheck
npm test
```

## Limitações atuais

- backend ainda não conectado;
- notificações push ainda não integradas;
- dados de coletas e ecopontos ainda são mockados;
- autenticação ainda não usa API real.

## Próximos passos

1. Conectar autenticação e cronogramas a uma API real.
2. Evoluir o fluxo de notificações por bairro e tipo de resíduo.
3. Integrar dados reais de ecopontos.
4. Refinar acessibilidade, ícones e estados offline.
