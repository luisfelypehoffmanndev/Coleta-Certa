# Coleta Certa

Aplicativo mobile desenvolvido com `Expo`, `React Native` e `TypeScript` para centralizar informações de coleta urbana, calendário de resíduos, orientações de reciclagem e pontos de descarte.

## Sobre

O Coleta Certa foi projetado para oferecer uma experiência simples e rápida para consulta de coletas e descarte responsável. A interface prioriza leitura imediata, navegação curta e organização visual inspirada em um fluxo mobile utilitário.

## Principais funcionalidades

- tela inicial com destaque para a próxima coleta;
- calendário mensal com identificação por tipo de resíduo;
- seção de orientações rápidas sobre separação e reciclagem;
- consulta de pontos de descarte;
- preferências persistidas localmente;
- testes automatizados para fluxos principais e regras de domínio.

## Stack

- `Expo`
- `React Native`
- `TypeScript`
- `Jest`
- `@testing-library/react-native`
- `zod`

## Executando o projeto

```bash
npm install
npm run typecheck
npm run test
npm start
```

Comandos auxiliares:

```bash
npm run android
npm run ios
npm run web
```

## Estrutura do projeto

- `src/screens`: telas da aplicação
- `src/domain`: regras de negócio e contratos
- `src/data`: dados mockados e fixtures
- `src/hooks`: orquestração de estado e carregamento
- `src/services`: persistência e acesso a dados
- `src/theme`: tokens de design
- `src/ui`: estilos compartilhados
- `docs`: documentação técnica complementar

## Qualidade

Para validar a aplicação localmente:

```bash
npm run typecheck
npm test
```

## Documentação complementar

- [Design system](./docs/design-system.md)
- [Testing](./docs/testing.md)
- [Security](./docs/security.md)
- [ADR da stack](./docs/adr/0001-stack.md)
