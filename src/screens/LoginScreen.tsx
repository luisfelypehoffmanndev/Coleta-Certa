import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { pilotCredentials } from '../data/mockData';
import { appStyles as styles } from '../ui/styles';

interface LoginScreenProps {
  error: string | null;
  isSubmitting: boolean;
  onSubmit: (email: string, password: string) => void;
}

export function LoginScreen({ error, isSubmitting, onSubmit }: LoginScreenProps) {
  const [email, setEmail] = useState(pilotCredentials.email);
  const [password, setPassword] = useState(pilotCredentials.password);

  return (
    <View style={styles.loginWrap}>
      <View style={styles.authHero}>
        <Text style={styles.eyebrow}>Acesso do usuário</Text>
        <Text style={styles.title}>Entrar no Ecoleta</Text>
        <Text style={styles.subtitle}>
          Nesta etapa, o login é simulado para preparar a futura integração com a API real.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Credenciais do piloto</Text>
        <Text style={styles.sectionBody}>
          Use a conta de demonstração para entrar e testar a sessão persistida.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          accessibilityRole="button"
          style={styles.buttonPrimary}
          onPress={() => onSubmit(email, password)}
        >
          <Text style={styles.buttonPrimaryText}>{isSubmitting ? 'Entrando...' : 'Entrar'}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={styles.buttonSecondary}
          onPress={() => {
            setEmail(pilotCredentials.email);
            setPassword(pilotCredentials.password);
            onSubmit(pilotCredentials.email, pilotCredentials.password);
          }}
        >
          <Text style={styles.buttonSecondaryText}>Entrar com conta demo</Text>
        </Pressable>

        <Text style={styles.meta}>Conta demo: felipe@ecoleta.app / ecoleta123</Text>
      </View>
    </View>
  );
}
