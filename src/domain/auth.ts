export function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export function validateLoginInput(email: string, password: string) {
  if (!isValidEmail(email.trim())) {
    return 'Informe um e-mail válido.';
  }

  if (password.trim().length < 6) {
    return 'A senha precisa ter pelo menos 6 caracteres.';
  }

  return null;
}
