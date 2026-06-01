import { useState } from 'react';
import { Linking, Pressable, Text, TextInput, View } from 'react-native';

import { getLeadHourOptions } from '../domain/preferences';
import { neighborhoods } from '../domain/types';
import { getAppStyles } from '../ui/styles';
import type { NotificationPermissionStatus, ScheduledReminder } from '../services/notifications';
import type { UserProfile } from '../domain/types';

const officialCollectionPage =
  'https://pmsantoangelo.abase.com.br/site/conteudos/5173-coleta-seletiva';

interface ProfileScreenProps {
  user: UserProfile;
  isSavingPreferences: boolean;
  notificationPermissionStatus: NotificationPermissionStatus;
  scheduledReminder: ScheduledReminder | null;
  isSchedulingNotification: boolean;
  hasSchedulableCollection: boolean;
  notificationError: string | null;
  accountError: string | null;
  isSubmittingAccountAction: boolean;
  onNeighborhoodChange: (value: UserProfile['neighborhood']) => void;
  onLeadHoursChange: (value: UserProfile['notificationLeadHours']) => void;
  onNotificationsEnabledChange: (value: UserProfile['notificationsEnabled']) => void;
  onThemeChange: (value: UserProfile['theme']) => void;
  onSignOut: () => void;
  onDeleteAccount: (password: string) => void;
}

function formatReminderDate(dateIso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateIso));
}

function permissionLabel(status: NotificationPermissionStatus) {
  if (status === 'granted') {
    return 'Permissão concedida';
  }

  if (status === 'denied') {
    return 'Permissão negada';
  }

  return 'Aguardando permissão';
}

export function ProfileScreen({
  user,
  isSavingPreferences,
  notificationPermissionStatus,
  scheduledReminder,
  isSchedulingNotification,
  hasSchedulableCollection,
  notificationError,
  accountError,
  isSubmittingAccountAction,
  onNeighborhoodChange,
  onLeadHoursChange,
  onNotificationsEnabledChange,
  onThemeChange,
  onSignOut,
  onDeleteAccount,
}: ProfileScreenProps) {
  const styles = getAppStyles(user.theme);
  const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
  const [isDeleteAccountPasswordVisible, setIsDeleteAccountPasswordVisible] = useState(false);

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
            Antecedência do lembrete: {user.notificationLeadHours}{' '}
            {user.notificationLeadHours === 1 ? 'hora' : 'horas'}
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
          <Text style={styles.sectionTitle}>Notificações</Text>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: user.notificationsEnabled }}
            onPress={() => onNotificationsEnabledChange(!user.notificationsEnabled)}
            style={styles.preferenceToggleRow}
          >
            <View style={styles.legendMetaBlock}>
              <Text style={styles.bodyStrong}>Receber lembretes de coleta</Text>
              <Text style={styles.meta}>
                {user.notificationsEnabled ? 'Lembretes ligados' : 'Lembretes desligados'}
              </Text>
            </View>
            <View
              style={[
                styles.toggleTrack,
                user.notificationsEnabled && styles.toggleTrackActive,
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  user.notificationsEnabled && styles.toggleThumbActive,
                ]}
              />
            </View>
          </Pressable>
          <Text style={styles.body}>{permissionLabel(notificationPermissionStatus)}</Text>
          <Text style={styles.body}>
            {!user.notificationsEnabled
              ? 'Ative os lembretes para agendar notificações da próxima coleta.'
              : !hasSchedulableCollection
                ? 'Sem agenda local confirmada para este bairro.'
              : scheduledReminder
              ? `Próximo lembrete: ${formatReminderDate(scheduledReminder.scheduledAt)}`
              : isSchedulingNotification
                ? 'Agendando lembrete da próxima coleta...'
                : 'Nenhum lembrete agendado ainda.'}
          </Text>
          <Text style={styles.sectionBody}>
            O app agenda automaticamente um lembrete local para a próxima coleta do seu bairro,
            respeitando a antecedência escolhida.
          </Text>
          {notificationError ? <Text style={styles.errorText}>{notificationError}</Text> : null}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: user.theme === 'dark' }}
            onPress={() => onThemeChange(user.theme === 'dark' ? 'light' : 'dark')}
            style={styles.preferenceToggleRow}
          >
            <View style={styles.legendMetaBlock}>
              <Text style={styles.bodyStrong}>Usar tema escuro</Text>
              <Text style={styles.meta}>{user.theme === 'dark' ? 'Tema escuro' : 'Tema claro'}</Text>
            </View>
            <View style={[styles.toggleTrack, user.theme === 'dark' && styles.toggleTrackActive]}>
              <View style={[styles.toggleThumb, user.theme === 'dark' && styles.toggleThumbActive]} />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fonte dos dados</Text>
          <Text style={styles.body}>
            Os conteúdos seguem a página oficial de Coleta Seletiva da Prefeitura de Santo Ângelo.
          </Text>
          <Text style={styles.body}>
            Para horário exato, consulte o mapa oficial por endereço e confirme o setor colorido.
          </Text>
          <Pressable
            accessibilityRole="link"
            style={styles.buttonSecondary}
            onPress={() => Linking.openURL(officialCollectionPage)}
          >
            <Text style={styles.buttonSecondaryText}>Página oficial da coleta seletiva</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.signOutButton} onPress={onSignOut}>
            <Text style={styles.signOutButtonText}>Sair da conta</Text>
          </Pressable>
          {isConfirmingDeletion ? (
            <View style={styles.deleteAccountConfirmation}>
              <Text style={styles.bodyStrong}>Excluir conta permanentemente?</Text>
              <Text style={styles.sectionBody}>
                Informe sua senha para confirmar. Esta ação não poderá ser desfeita.
              </Text>
              <View style={styles.passwordInputWrap}>
                <TextInput
                  accessibilityLabel="Senha para excluir conta"
                  autoFocus
                  secureTextEntry={!isDeleteAccountPasswordVisible}
                  value={deleteAccountPassword}
                  onChangeText={setDeleteAccountPassword}
                  style={styles.passwordInput}
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setIsDeleteAccountPasswordVisible((current) => !current)}
                  style={styles.passwordVisibilityButton}
                >
                  <Text style={styles.passwordVisibilityButtonText}>
                    {isDeleteAccountPasswordVisible ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </Pressable>
              </View>
              {accountError ? <Text style={styles.errorText}>{accountError}</Text> : null}
              <Pressable
                accessibilityRole="button"
                disabled={isSubmittingAccountAction || !deleteAccountPassword}
                style={styles.deleteAccountButton}
                onPress={() => onDeleteAccount(deleteAccountPassword)}
              >
                <Text style={styles.deleteAccountButtonText}>
                  {isSubmittingAccountAction ? 'Excluindo conta...' : 'Confirmar exclusão'}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                style={styles.buttonSecondary}
                onPress={() => {
                  setDeleteAccountPassword('');
                  setIsDeleteAccountPasswordVisible(false);
                  setIsConfirmingDeletion(false);
                }}
              >
                <Text style={styles.buttonSecondaryText}>Cancelar</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              style={styles.deleteAccountButton}
              onPress={() => setIsConfirmingDeletion(true)}
            >
              <Text style={styles.deleteAccountButtonText}>Excluir minha conta</Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
}
