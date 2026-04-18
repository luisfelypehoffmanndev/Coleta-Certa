import { validateLoginInput } from '../src/domain/auth';

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
});
