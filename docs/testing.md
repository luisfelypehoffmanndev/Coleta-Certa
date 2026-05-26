# Testing

## Visão geral

O projeto possui cobertura automatizada para validar regras centrais de domínio e fluxos essenciais da interface. A suíte foi pensada para reduzir regressões nas partes mais sensíveis do MVP.

## Escopo atual

Os testes cobrem principalmente:

- autenticação local simulada;
- ordenação e cálculo de próximas coletas;
- validação de dados com schema;
- persistência de preferências;
- fluxo principal de navegação da aplicação;
- fallback para mapa oficial quando não há agenda local;
- ativação de lembretes de coleta no perfil.

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

## Observações

As APIs nativas de notificação são mockadas em `jest.setup.ts`. Os testes validam o fluxo de ativação e estados de interface; entrega real de notificação deve ser validada em aparelho físico ou development build.
