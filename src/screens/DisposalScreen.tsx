import { Linking, Pressable, Text, View } from 'react-native';

import { buildDisposalMapUrl, getWasteLabel } from '../domain/schedule';
import { colors, iconLabels } from '../theme/tokens';
import { appStyles as styles } from '../ui/styles';
import type { DisposalLocation } from '../domain/types';

interface DisposalScreenProps {
  locations: DisposalLocation[];
}

export function DisposalScreen({ locations }: DisposalScreenProps) {
  return (
    <>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitleLight}>Dicas de Reciclagem</Text>
        <Text style={styles.pageSubtitleLight}>Aprenda como separar corretamente</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas Gerais</Text>
        <View style={styles.listBlock}>
          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: colors.waste.organic }]}>
                <Text style={styles.wasteBadgeText}>{iconLabels.organic}</Text>
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Reduza o consumo</Text>
                <Text style={styles.legendText}>
                  Prefira produtos com menos embalagens e reutilize sempre que possível.
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: '#DBF4FF' }]}>
                <Text style={[styles.wasteBadgeText, styles.wasteBadgeTextCyan]}>
                  {iconLabels.recyclable}
                </Text>
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Lave e seque embalagens</Text>
                <Text style={styles.legendText}>
                  Materiais limpos melhoram a triagem e evitam contaminar recicláveis.
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { minHeight: 90 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.wasteBadge, { backgroundColor: colors.waste.electronic }]}>
                <Text style={[styles.wasteBadgeText, styles.wasteBadgeTextRed]}>
                  {iconLabels.electronic}
                </Text>
              </View>
              <View style={styles.legendMetaBlock}>
                <Text style={styles.legendTitle}>Separe eletrônicos</Text>
                <Text style={styles.legendText}>
                  Pilhas, cabos e aparelhos devem ir para pontos de descarte específicos.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pontos de descarte</Text>
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
                onPress={() => Linking.openURL(buildDisposalMapUrl(location))}
              >
                <Text style={styles.buttonPrimaryText}>Abrir rota</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
