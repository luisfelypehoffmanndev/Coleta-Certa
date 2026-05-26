import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import App from '../App';

async function signIn() {
  fireEvent.changeText(await screen.findByLabelText('E-mail'), 'felipe@coletacerta.app');
  fireEvent.changeText(screen.getByLabelText('Senha'), 'ecoleta123');
  fireEvent.press(screen.getByText('Entrar'));
}

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
    (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);
    (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders the login screen before entering the app', async () => {
    render(<App />);

    expect(await screen.findByText(/Entrar no Coleta Certa/)).toBeTruthy();
    expect(screen.getByText('Entrar com e-mail')).toBeTruthy();
  });

  it('renders the tab navigation and home content after login', async () => {
    render(<App />);

    await signIn();

    expect(await screen.findByText('Coleta Certa')).toBeTruthy();
    expect(await screen.findByText('Próxima coleta')).toBeTruthy();
    expect(await screen.findByText('Calendário')).toBeTruthy();
    expect(await screen.findByText('Dicas')).toBeTruthy();
  });

  it('updates the reminder lead time in the profile', async () => {
    render(<App />);

    await signIn();
    expect(await screen.findByText('Coleta Certa')).toBeTruthy();

    fireEvent.press(screen.getByText('Config'));
    expect(await screen.findByText('Antecedência do lembrete: 12 horas')).toBeTruthy();

    fireEvent.press(await screen.findByText('24h'));

    expect(await screen.findByText('Antecedência do lembrete: 24 horas')).toBeTruthy();
  });

  it('shows the official map fallback when the selected neighborhood has no local schedule', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByText('Sanches'));
    fireEvent.press(screen.getByText('Início'));

    expect(await screen.findByText(/não tem agenda local confirmada/)).toBeTruthy();
    expect(screen.getAllByText('Abrir mapa oficial →').length).toBeGreaterThan(0);
  });

  it('lets the user enable collection reminders from the profile', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    expect(await screen.findByText('Lembretes desligados')).toBeTruthy();

    fireEvent.press(screen.getByText('Receber lembretes de coleta'));

    expect(await screen.findByText('Lembretes ligados')).toBeTruthy();
  });

  it('returns to the login screen after signing out', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByText('Sair da conta'));

    await waitFor(() => {
      expect(screen.getByText(/Entrar no Coleta Certa/)).toBeTruthy();
    });
  });

  it('creates a new account from the sign up form', async () => {
    render(<App />);

    fireEvent.press(await screen.findByText('Criar nova conta'));
    fireEvent.changeText(await screen.findByLabelText('Nome'), 'Felipe');
    fireEvent.changeText(screen.getByLabelText('E-mail'), 'felipe@coletacerta.app');
    fireEvent.changeText(screen.getByLabelText('Senha'), 'ecoleta123');
    fireEvent.press(screen.getAllByText('Criar conta')[1]);

    expect(await screen.findByText('Coleta Certa')).toBeTruthy();
  });
});
