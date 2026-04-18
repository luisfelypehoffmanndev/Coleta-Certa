# Segurança

## Princípios adotados

- Segurança entra antes da API real.
- Contratos externos são tratados como não confiáveis.
- Dados sensíveis não devem aparecer em logs.
- Todo recurso administrativo futuro exigirá autorização explícita e auditoria.

## O que está implementado nesta iteração

- Schemas de validação para usuário, agenda, ecoponto e alerta.
- Separação entre domínio e apresentação para evitar lógica crítica dispersa.
- Sessão local persistida com `SecureStore`.
- Preferências não sensíveis persistidas com `AsyncStorage`.
- Documentação de requisitos de autenticação, autorização e auditoria.

## Requisitos obrigatórios para a próxima fase

- Login com token curto e refresh controlado.
- Hash forte de senha.
- Rate limit em autenticação.
- Papéis separados: `user` e `admin`.
- Trilhas de auditoria para alterações operacionais.
- Segredos fora do código e por ambiente.
- Sanitização de logs e monitoramento.

## Riscos conhecidos

- O app ainda usa dados mockados locais.
- A autenticação ainda é simulada e não há verificação contra backend real.
- Não há backend para aplicar controles de acesso reais.
