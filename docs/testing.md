# Testing

## Visão geral

O projeto possui cobertura automatizada para validar regras centrais de domínio e fluxos essenciais da interface. A suíte foi pensada para reduzir regressões nas partes mais sensíveis do MVP.

## Escopo atual

Os testes cobrem principalmente:

- autenticação local simulada;
- ordenação e cálculo de próximas coletas;
- validação de dados com schema;
- persistência de preferências;
- fluxo principal de navegação da aplicação.

## Execução

```bash
npm test
```

Para verificação estática de tipos:

```bash
npm run typecheck
```

## Ferramentas

- `Jest`
- `jest-expo`
- `@testing-library/react-native`
