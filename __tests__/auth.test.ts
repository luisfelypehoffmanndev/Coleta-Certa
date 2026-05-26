import { validateLoginInput, validateSignUpInput } from '../src/domain/auth';

describe('auth domain', () => {
  it('rejects invalid email input', () => {
    expect(validateLoginInput('email-invalido', '123456')).toBe('Informe um e-mail válido.');
  });

  it('rejects short passwords', () => {
    expect(validateLoginInput('felipe@ecoleta.app', '123')).toBe(
      'A senha precisa ter pelo menos 6 caracteres.',
    );
  });

  it('accepts valid credentials shape', () => {
    expect(validateLoginInput('felipe@ecoleta.app', 'ecoleta123')).toBeNull();
  });

  it('rejects sign up without a name', () => {
    expect(validateSignUpInput('', 'felipe@ecoleta.app', 'ecoleta123')).toBe('Informe seu nome.');
  });

  it('accepts valid sign up input', () => {
    expect(validateSignUpInput('Felipe', 'felipe@ecoleta.app', 'ecoleta123')).toBeNull();
  });
});
