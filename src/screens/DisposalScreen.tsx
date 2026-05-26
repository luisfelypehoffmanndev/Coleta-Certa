import { Linking, Pressable, Text, View } from 'react-native';

import { buildDisposalMapUrl, getWasteLabel } from '../domain/schedule';
import { colors } from '../theme/tokens';
import { appStyles as styles } from '../ui/styles';
import type { DisposalLocation } from '../domain/types';

interface DisposalScreenProps {
  locations: DisposalLocation[];
}

function DisposalTipIcon({ type }: { type: 'wet' | 'dry' | 'help' }) {
  if (type === 'wet') {
    return (
      <View style={styles.wetIcon}>
        <View style={styles.wetIconLid} />
        <View style={styles.wetIconBin}>
          <View style={styles.wetIconScrap} />
          <View style={styles.wetIconScrapSmall} />
        </View>
      </View>
    );
  }

  if (type === 'dry') {
    return (
      <View style={styles.dryIcon}>
        <View style={styles.dryIconSheet} />
        <View style={styles.dryIconLineLong} />
        <View style={styles.dryIconLineShort} />
      </View>
    );
  }

  return (
    <View style={styles.locationHelpIcon}>
      <View style={styles.locationHelpPin} />
      <View style={styles.locationHelpHole} />
      <View style={styles.locationHelpBase} />
    </View>
  );
}

function buildContactUrl(location: DisposalLocation) {
  const phone = location.address.match(/\((\d{2})\)\s?([\d. -]+)/);

  if (!phone) {
    return buildDisposalMapUrl(location);
  }

  return `tel:+55${phone[1]}${phone[2].replace(/\D/g, '')}`;
}

export function DisposalScreen({ locations }: DisposalScreenProps) {
  return (
    <>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitleLight}>Separação e contatos</Text>
        <Text style={styles.pageSubtitleLight}>Baseado na coleta seletiva de Santo Ângelo</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como separar</Text>
        <View style={styles.listBlock}>
          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: colors.waste.wet }]}>
                <DisposalTipIcon type="wet" />
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Lixo úmido</Text>
                <Text style={styles.legendText}>
                  Restos de comida, cascas, erva-mate, papel higiênico, guardanapos usados,
                  fraldas, absorventes e embalagens contaminadas.
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: '#DBF4FF' }]}>
                <DisposalTipIcon type="dry" />
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Lixo seco</Text>
                <Text style={styles.legendText}>
                  Papel, plástico, embalagens limpas, papelão, garrafas pet, vidro, latinhas,
                  revistas, jornais e potes limpos.
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: colors.primarySoft }]}>
                <DisposalTipIcon type="help" />
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Dúvidas sobre horários</Text>
                <Text style={styles.legendText}>
                  Informe endereço com número, bairro e rua próxima ou ponto de referência.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Canais oficiais</Text>
        <View style={styles.listBlock}>
          {locations.map((location) => (
            <View key={location.id} style={styles.nestedCard}>
              <Text style={styles.bodyStrong}>{location.name}</Text>
              <Text style={styles.meta}>{location.address}</Text>
              <Text style={styles.meta}>
                {location.openingHours} • {location.distanceKm.toFixed(1)} km
              </Text>
              <Text style={styles.meta}>
                Aceita: {location.acceptedWaste.map((item) => getWasteLabel(item)).join(', ')}
              </Text>
              <Pressable
                accessibilityRole="button"
                style={styles.buttonPrimary}
                onPress={() => Linking.openURL(buildContactUrl(location))}
              >
                <Text style={styles.buttonPrimaryText}>Entrar em contato</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
