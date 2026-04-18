# Ecoleta

Aplicativo mobile em `Expo + React Native + TypeScript` para lembrar dias e horários de coleta, orientar a separação correta e localizar pontos de descarte eletrônico.

## Estado atual

Esta iteração implementa a base do MVP mobile com:
- autenticação simulada com sessão persistida;
- interface alinhada à identidade visual do Figma de referência;
- navegação por abas entre `Início`, `Calendário`, `Ecopontos` e `Perfil`;
- preferências locais de bairro e antecedência do lembrete;
- domínio tipado para agendas, alertas, usuário e ecopontos;
- validação de contratos com `zod`;
- testes automatizados para autenticação, regras de agenda, schemas e fluxos principais da interface;
- documentação inicial de arquitetura, design, TDD e segurança.

O backend, o painel admin e as notificações push reais ainda não foram conectados. A interface atual usa dados mockados para travar o domínio e permitir evolução orientada a testes. As preferências principais do usuário já são persistidas localmente com `AsyncStorage`, e a sessão do piloto é mantida com `SecureStore`.

## Fluxo atual do usuário

1. entrar com a conta demo;
2. acessar a agenda da cidade piloto;
3. trocar bairro e antecedência do lembrete no `Perfil`;
4. consultar os ecopontos;
5. encerrar a sessão no `Perfil`.

Conta demo:
- `felipe@ecoleta.app`
- `ecoleta123`

## Como rodar

```bash
npm install
npm run test
npm run typecheck
npm start
```

## Estrutura

- `src/screens`: composição principal da interface.
- `src/data`: fixtures e dados mockados do piloto.
- `src/domain`: contratos, schemas e regras de negócio.
- `src/hooks`: estado de autenticação e bootstrap de dados.
- `src/services`: persistência local e serviços mockados.
- `src/theme`: tokens visuais.
- `src/ui`: estilos compartilhados.
- `docs`: decisões de arquitetura, design, TDD e segurança.

## Atualização visual recente

- `Início`, `Calendário` e `Dicas` foram reestilizados para seguir a composição do Figma `Coleta certa`.
- A aba `Dicas` mantém a função prática do MVP e combina orientações rápidas com pontos de descarte.
- Tokens visuais e estilos compartilhados foram revistos para manter consistência entre telas funcionais e telas de referência.

## Decisões relevantes

- `Expo`: reduz atrito para Android e iOS no MVP.
- `UI simples`: utilitário público precisa priorizar leitura e confiança.
- `Schemas na base`: previne inconsistências quando a API real entrar.
- `Mocks primeiro`: permite aplicar TDD antes de existir backend completo.
- `SecureStore` para sessão: separa dados de autenticação das preferências comuns do app.

## Próximos passos

1. Substituir a autenticação mockada por API real.
2. Criar painel admin para cronogramas, ecopontos e alertas.
3. Integrar notificações push por bairro e tipo de resíduo.
4. Substituir os mocks do piloto por dados reais validados via backend.
