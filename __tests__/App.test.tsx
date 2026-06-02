import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import App from '../App';

async function signIn() {
  fireEvent.changeText(await screen.findByLabelText('E-mail'), 'felipe@coletacerta.app');
  fireEvent.changeText(screen.getByLabelText('Senha'), 'ecoleta123');
  fireEvent.press(screen.getByText('Entrar'));
}

describe('App', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
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

  it('lets the user schedule a reminder one hour before collection', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByText('1h'));

    expect(await screen.findByText('Antecedência do lembrete: 1 hora')).toBeTruthy();
  });

  it('searches sectors by neighborhood and sector name', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByLabelText('Alterar setor'));
    fireEvent.changeText(await screen.findByLabelText('Pesquisar setor ou bairro'), 'Casaroto');

    expect(await screen.findByText(/Casaroto, Jardim das Palmeiras/)).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText('Pesquisar setor ou bairro'), 'Setor 08');
    expect(await screen.findByText(/Aeroporto, A.F.P.M., Aguiar/)).toBeTruthy();
  });

  it('lets the user enable collection reminders from the profile', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    expect(await screen.findByText('Lembretes desligados')).toBeTruthy();

    fireEvent.press(screen.getByText('Receber lembretes de coleta'));

    expect(await screen.findByText('Lembretes ligados')).toBeTruthy();
  });

  it('lets the user enable dark theme from the profile', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    expect(await screen.findByText('Tema claro')).toBeTruthy();

    fireEvent.press(screen.getByText('Usar tema escuro'));

    expect(await screen.findByText('Tema escuro')).toBeTruthy();
  });

  it('opens a nearby electronic waste collection search from the tips screen', async () => {
    const openUrl = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Dicas'));
    fireEvent.press(await screen.findByText('Ver ponto mais próximo no mapa'));

    expect(openUrl).toHaveBeenCalledWith(
      'https://www.google.com/maps/search/?api=1&query=ponto+de+coleta+de+lixo+eletronico+perto+de+mim',
    );
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

  it('deletes the account after confirmation and returns to login', async () => {
    render(<App />);

    await signIn();
    fireEvent.press(await screen.findByText('Config'));
    fireEvent.press(await screen.findByText('Excluir minha conta'));
    fireEvent.changeText(await screen.findByLabelText('Senha para excluir conta'), 'ecoleta123');
    fireEvent.press(await screen.findByText('Confirmar exclusão'));

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
