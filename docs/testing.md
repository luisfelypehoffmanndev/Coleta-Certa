# Estratégia de TDD

## Regra de trabalho

Cada comportamento novo deve seguir:

1. teste falhando;
2. implementação mínima;
3. refactor;
4. documentação da decisão e do comportamento.

## Cobertura inicial

- `auth.test.ts`: validação de e-mail e senha para o login do piloto.
- `schedule.test.ts`: ordenação de coletas futuras e derivação do lembrete.
- `schemas.test.ts`: validação de fixtures e rejeição de payload inválido.
- `preferences.test.ts`: fusão das preferências persistidas com o perfil do usuário.
- `App.test.tsx`: login, navegação principal, alteração da antecedência do lembrete e logout.

## Critério mínimo de merge

- `npm run test` passando.
- `npm run typecheck` passando.
- docs atualizadas quando houver mudança de comportamento ou arquitetura.
- risco de segurança revisado se houver dados, auth ou admin envolvidos.
