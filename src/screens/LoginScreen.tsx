import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { neighborhoods, type Neighborhood } from '../domain/types';
import { appStyles as styles } from '../ui/styles';

interface LoginScreenProps {
  error: string | null;
  isSubmitting: boolean;
  onSignIn: (email: string, password: string) => void;
  onSignUp: (name: string, email: string, password: string, neighborhood: Neighborhood) => void;
}

type AuthMode = 'signIn' | 'signUp';

export function LoginScreen({ error, isSubmitting, onSignIn, onSignUp }: LoginScreenProps) {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [neighborhood, setNeighborhood] = useState<Neighborhood>('Centro');
  const isSignUp = mode === 'signUp';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.loginKeyboardAvoider}
    >
      <ScrollView
        contentContainerStyle={styles.loginWrap}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.authHero}>
          <Text style={styles.eyebrow}>Acesso do usuário</Text>
          <Text style={styles.title}>Entrar no Coleta Certa</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta para consultar a coleta seletiva do seu bairro.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {isSignUp ? 'Criar conta' : 'Entrar com e-mail'}
          </Text>
          <Text style={styles.sectionBody}>
            {isSignUp
              ? 'Informe seus dados para configurar bairro e preferências iniciais.'
              : 'Informe seu e-mail e senha para continuar.'}
          </Text>

          {isSignUp ? (
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Nome</Text>
              <TextInput
                accessibilityLabel="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>
          ) : null}

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              autoCapitalize="none"
              accessibilityLabel="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordInputWrap}>
              <TextInput
                secureTextEntry={!isPasswordVisible}
                accessibilityLabel="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsPasswordVisible((current) => !current)}
                style={styles.passwordVisibilityButton}
              >
                <Text style={styles.passwordVisibilityButtonText}>
                  {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
                </Text>
              </Pressable>
            </View>
          </View>

          {isSignUp ? (
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Bairro</Text>
              <View style={styles.chipRow}>
                {neighborhoods.map((item) => {
                  const selected = item === neighborhood;

                  return (
                    <Pressable
                      key={item}
                      accessibilityRole="button"
                      onPress={() => setNeighborhood(item)}
                      style={[styles.choiceChip, selected && styles.choiceChipActive]}
                    >
                      <Text style={[styles.choiceChipText, selected && styles.choiceChipTextActive]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            style={styles.buttonPrimary}
            onPress={() =>
              isSignUp
                ? onSignUp(name, email, password, neighborhood)
                : onSignIn(email, password)
            }
          >
            <Text style={styles.buttonPrimaryText}>
              {isSubmitting ? 'Aguarde...' : isSignUp ? 'Criar conta' : 'Entrar'}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.buttonSecondary}
            onPress={() => setMode(isSignUp ? 'signIn' : 'signUp')}
          >
            <Text style={styles.buttonSecondaryText}>
              {isSignUp ? 'Já tenho conta' : 'Criar nova conta'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
