import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import App from '../App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
    (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);
    (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders the login screen before entering the app', async () => {
    render(<App />);

    expect(await screen.findByText('Entrar no Ecoleta')).toBeTruthy();
    expect(screen.getByText('Credenciais do piloto')).toBeTruthy();
  });

  it('renders the tab navigation and home content after login', async () => {
    render(<App />);

    fireEvent.press(await screen.findByText('Entrar'));

    expect(await screen.findByText('Coleta Certa')).toBeTruthy();
    expect(await screen.findByText('Próxima Coleta')).toBeTruthy();
    expect(await screen.findByText('Calendário')).toBeTruthy();
    expect(await screen.findByText('Dicas')).toBeTruthy();
  });

  it('updates the reminder lead time on the home screen after changing it in the profile', async () => {
    render(<App />);

    fireEvent.press(await screen.findByText('Entrar'));
    expect(await screen.findByText('Notificação 12h antes')).toBeTruthy();

    fireEvent.press(screen.getByText('Config'));
    fireEvent.press(await screen.findByText('24h'));
    fireEvent.press(screen.getByText('Início'));

    expect(await screen.findByText('Notificação 24h antes')).toBeTruthy();
  });

  it('returns to the login screen after signing out', async () => {
    render(<App />);

    fireEvent.press(await screen.findByText('Entrar'));
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByText('Sair da conta'));

    await waitFor(() => {
      expect(screen.getByText('Entrar no Ecoleta')).toBeTruthy();
    });
  });
});
