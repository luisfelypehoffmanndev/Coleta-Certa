import { Pressable, Text, View } from 'react-native';

import { getLeadHourOptions } from '../domain/preferences';
import { neighborhoods } from '../domain/types';
import { appStyles as styles } from '../ui/styles';
import type { UserProfile } from '../domain/types';

interface ProfileScreenProps {
  user: UserProfile;
  isSavingPreferences: boolean;
  onNeighborhoodChange: (value: UserProfile['neighborhood']) => void;
  onLeadHoursChange: (value: UserProfile['notificationLeadHours']) => void;
  onSignOut: () => void;
}

export function ProfileScreen({
  user,
  isSavingPreferences,
  onNeighborhoodChange,
  onLeadHoursChange,
  onSignOut,
}: ProfileScreenProps) {
  return (
    <>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitleLight}>Configurações</Text>
        <Text style={styles.pageSubtitleLight}>Preferências do app e dados da conta</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <Text style={styles.body}>Nome: {user.name}</Text>
          <Text style={styles.body}>E-mail: {user.email}</Text>
          <Text style={styles.body}>Cidade: {user.city}</Text>
          <Text style={styles.body}>Bairro: {user.neighborhood}</Text>
          <Text style={styles.body}>
            Antecedência do lembrete: {user.notificationLeadHours} horas
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <Text style={styles.sectionBody}>
            Estas opções já alteram o conteúdo do app e ficam salvas no aparelho.
          </Text>

          <View style={styles.chipRow}>
            {neighborhoods.map((neighborhood) => {
              const selected = neighborhood === user.neighborhood;

              return (
                <Pressable
                  key={neighborhood}
                  accessibilityRole="button"
                  onPress={() => onNeighborhoodChange(neighborhood)}
                  style={[styles.choiceChip, selected && styles.choiceChipActive]}
                >
                  <Text style={[styles.choiceChipText, selected && styles.choiceChipTextActive]}>
                    {neighborhood}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.chipRow}>
            {getLeadHourOptions().map((leadHours) => {
              const selected = leadHours === user.notificationLeadHours;

              return (
                <Pressable
                  key={leadHours}
                  accessibilityRole="button"
                  onPress={() => onLeadHoursChange(leadHours)}
                  style={[styles.choiceChip, selected && styles.choiceChipActive]}
                >
                  <Text style={[styles.choiceChipText, selected && styles.choiceChipTextActive]}>
                    {leadHours}h
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.meta}>
            {isSavingPreferences ? 'Salvando preferências...' : 'Preferências salvas localmente.'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Segurança e confiança</Text>
          <Text style={styles.body}>
            Login obrigatório, controle de acesso por papel e auditoria ficam previstos desde a base.
          </Text>
          <Text style={styles.body}>
            Contratos de dados são validados com schema para evitar payloads inconsistentes.
          </Text>
          <Pressable accessibilityRole="button" style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Ver documentação no repositório</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.signOutButton} onPress={onSignOut}>
            <Text style={styles.signOutButtonText}>Sair da conta</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
