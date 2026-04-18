# Security

## Visão geral

Mesmo sendo um MVP, o projeto já separa dados de sessão, preferências locais e regras de validação para facilitar a evolução para uma arquitetura conectada a backend.

## Medidas adotadas

- validação de estruturas de dados com `zod`;
- separação entre domínio e apresentação;
- persistência de sessão com `SecureStore`;
- persistência de preferências não sensíveis com `AsyncStorage`.

## Observações

Atualmente a aplicação opera com dados locais e fluxos simulados. Qualquer evolução para autenticação real, backend remoto ou recursos administrativos deve incluir revisão específica de segurança, gestão de segredos e controle de acesso.
