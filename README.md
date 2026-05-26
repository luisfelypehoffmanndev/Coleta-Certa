# Coleta Certa

Aplicativo mobile desenvolvido com `Expo`, `React Native` e `TypeScript` para consultar informações da coleta seletiva de Santo Ângelo, incluindo lixo úmido, lixo seco, calendário por bairro, orientações de separação e canais oficiais.

## Sobre

O Coleta Certa foi projetado para oferecer uma experiência simples e rápida para consulta de coletas e descarte responsável. A base do protótipo segue a página oficial de Coleta Seletiva da Prefeitura de Santo Ângelo e direciona para o mapa oficial quando não há agenda local confirmada.

## Principais funcionalidades

- tela inicial com destaque para a próxima coleta confirmada;
- calendário mensal navegável com identificação por tipo de resíduo;
- orientação para consulta ao mapa oficial quando faltar agenda por bairro;
- seção de orientações rápidas sobre lixo úmido e lixo seco;
- canais oficiais da Novo Mundo, Ecos do Verde e Secretaria de Meio Ambiente;
- notificações locais opcionais para lembretes de coleta;
- preferências persistidas localmente;
- testes automatizados para fluxos principais e regras de domínio.

## Stack

- `Expo`
- `React Native`
- `TypeScript`
- `Jest`
- `@testing-library/react-native`
- `zod`
- `expo-notifications`
- `Firebase Auth`

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

## Firebase Auth

Crie um projeto no Firebase, habilite o provedor **Email/senha** em Authentication e configure as variáveis públicas do Expo:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

Essas chaves identificam o app Firebase no cliente. Não coloque segredos administrativos no projeto mobile.

## Dados e notificações

Alguns bairros possuem agenda local confirmada no protótipo. Para bairros sem agenda estruturada, o app mostra um aviso e direciona ao mapa oficial da Prefeitura.

As notificações são opcionais. O usuário precisa ativar os lembretes em `Configurações`; só então o app solicita permissão do Android e agenda o próximo lembrete local. No Expo Go, notificações podem ter limitações dependendo do aparelho; para validação completa, use uma development build.

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
