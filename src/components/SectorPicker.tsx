import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { collectionSectors, getSector } from '../domain/sectors';
import type { AppTheme, SectorId } from '../domain/types';
import { getAppStyles } from '../ui/styles';

interface SectorPickerProps {
  selectedSectorId: SectorId;
  onChange: (sectorId: SectorId) => void;
  theme?: AppTheme;
}

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function SectorPicker({ selectedSectorId, onChange, theme }: SectorPickerProps) {
  const styles = getAppStyles(theme);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectedSector = getSector(selectedSectorId);
  const filteredSectors = useMemo(() => {
    const query = normalizeSearch(search.trim());

    if (!query) {
      return [];
    }

    return collectionSectors.filter((sector) => {
      return normalizeSearch(`${sector.name} ${sector.neighborhoods.join(' ')}`).includes(query);
    });
  }, [search]);

  function selectSector(sectorId: SectorId) {
    onChange(sectorId);
    setSearch('');
    setIsOpen(false);
  }

  return (
    <View style={styles.sectorPicker}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Alterar setor"
        onPress={() => setIsOpen((current) => !current)}
        style={styles.sectorPickerSelected}
      >
        <View style={styles.sectorPickerTextBlock}>
          <Text style={styles.sectorPickerLabel}>Setor selecionado</Text>
          <Text style={styles.sectorPickerTitle}>{selectedSector?.name}</Text>
          <Text numberOfLines={2} style={styles.sectorPickerNeighborhoods}>
            {selectedSector?.neighborhoods.join(', ')}
          </Text>
        </View>
        <Text style={styles.sectorPickerAction}>{isOpen ? 'Fechar' : 'Trocar'}</Text>
      </Pressable>

      {isOpen ? (
        <View style={styles.sectorPickerSearchArea}>
          <TextInput
            accessibilityLabel="Pesquisar setor ou bairro"
            autoCapitalize="none"
            autoFocus
            onChangeText={setSearch}
            placeholder="Busque por setor ou bairro"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={search}
          />

          {!search.trim() ? (
            <Text style={styles.meta}>Digite um setor ou bairro para pesquisar.</Text>
          ) : filteredSectors.length ? (
            <View style={styles.sectorPickerResults}>
              {filteredSectors.map((sector) => (
                <Pressable
                  key={sector.id}
                  accessibilityRole="button"
                  onPress={() => selectSector(sector.id)}
                  style={styles.sectorPickerOption}
                >
                  <Text style={styles.sectorPickerOptionTitle}>{sector.name}</Text>
                  <Text style={styles.sectorPickerNeighborhoods}>
                    {sector.neighborhoods.join(', ')}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.meta}>Nenhum setor encontrado.</Text>
          )}
        </View>
      ) : null}
    </View>
  );
}
