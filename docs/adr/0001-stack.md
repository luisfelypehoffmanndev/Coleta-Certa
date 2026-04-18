# ADR 0001: Base técnica do MVP

## Contexto

O produto precisa sair para Android e iOS com velocidade, manter uma interface simples e crescer depois para autenticacao, notificacoes e integracao com backend.

## Decisão

- Mobile em `Expo + React Native + TypeScript`.
- Domínio separado da interface.
- Validação de contratos com `zod`.
- Testes iniciais com `jest-expo`.
- `AsyncStorage` para preferências locais.
- `SecureStore` para a sessão do usuário.

## Motivo

- Expo simplifica build, testes em dispositivo e evolução para notificações.
- Separar domínio da UI facilita TDD e reduz regressão.
- Schema runtime protege a integração futura com API.
- Jest com preset Expo cobre regras de negócio e renderização básica do app.
- Sessão e preferências têm requisitos de armazenamento diferentes e foram separadas desde cedo.

## Consequências

- O MVP fica rápido para iterar.
- Recursos nativos muito específicos podem exigir ajuste futuro.
- A base já suporta crescimento para backend real sem refatoração estrutural ampla.
