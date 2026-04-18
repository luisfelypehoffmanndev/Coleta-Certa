import { Text, View } from 'react-native';

import { appStyles as styles } from '../ui/styles';
import { colors, iconLabels } from '../theme/tokens';
import type { CollectionSchedule, UpcomingCollection, UserProfile, WasteType } from '../domain/types';

interface CalendarScreenProps {
  user: UserProfile;
  collectionSchedules: CollectionSchedule[];
  upcomingCollections: UpcomingCollection[];
}

const weekdayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthLabel = 'Setembro de 2026';

const calendarRows: Array<Array<{ dayNumber: number; inMonth: boolean; wasteType?: WasteType }>> = [
  [
    { dayNumber: 0, inMonth: false },
    { dayNumber: 0, inMonth: false },
    { dayNumber: 1, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 2, inMonth: true, wasteType: 'organic' },
    { dayNumber: 3, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 4, inMonth: true, wasteType: 'organic' },
    { dayNumber: 5, inMonth: true, wasteType: 'recyclable' },
  ],
  [
    { dayNumber: 6, inMonth: true, wasteType: 'general' },
    { dayNumber: 7, inMonth: true, wasteType: 'organic' },
    { dayNumber: 8, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 9, inMonth: true, wasteType: 'organic' },
    { dayNumber: 10, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 11, inMonth: true, wasteType: 'organic' },
    { dayNumber: 12, inMonth: true, wasteType: 'recyclable' },
  ],
  [
    { dayNumber: 13, inMonth: true, wasteType: 'general' },
    { dayNumber: 14, inMonth: true, wasteType: 'organic' },
    { dayNumber: 15, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 16, inMonth: true, wasteType: 'organic' },
    { dayNumber: 17, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 18, inMonth: true, wasteType: 'organic' },
    { dayNumber: 19, inMonth: true, wasteType: 'recyclable' },
  ],
  [
    { dayNumber: 20, inMonth: true, wasteType: 'general' },
    { dayNumber: 21, inMonth: true, wasteType: 'organic' },
    { dayNumber: 22, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 23, inMonth: true, wasteType: 'organic' },
    { dayNumber: 24, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 25, inMonth: true, wasteType: 'organic' },
    { dayNumber: 26, inMonth: true, wasteType: 'recyclable' },
  ],
  [
    { dayNumber: 27, inMonth: true, wasteType: 'general' },
    { dayNumber: 28, inMonth: true, wasteType: 'organic' },
    { dayNumber: 29, inMonth: true, wasteType: 'recyclable' },
    { dayNumber: 30, inMonth: true, wasteType: 'organic' },
    { dayNumber: 0, inMonth: false },
    { dayNumber: 0, inMonth: false },
    { dayNumber: 0, inMonth: false },
  ],
];

function dayTextStyle(type?: WasteType) {
  if (type === 'organic') {
    return { color: '#92400E' };
  }

  if (type === 'recyclable') {
    return { color: '#0891B2' };
  }

  return { color: '#747474' };
}

function markerStyle(type?: WasteType) {
  if (type === 'organic') {
    return { color: '#92400E' };
  }

  if (type === 'recyclable') {
    return { color: '#0891B2' };
  }

  if (type === 'electronic') {
    return { color: '#DC2626' };
  }

  return { color: '#747474' };
}

function legendDetails(schedules: CollectionSchedule[], neighborhood: UserProfile['neighborhood']) {
  const filtered = schedules.filter((item) => item.neighborhood === neighborhood);

  const organicDays = filtered.filter((item) => item.wasteType === 'organic').length
    ? 'Segunda, Quarta, Sexta - 07:00'
    : 'Coleta programada';
  const recyclableDays = filtered.filter((item) => item.wasteType === 'recyclable').length
    ? 'Terça, Quinta, Sábado - 07:00'
    : 'Coleta programada';

  return { organicDays, recyclableDays };
}

export function CalendarScreen({
  user,
  collectionSchedules,
  upcomingCollections,
}: CalendarScreenProps) {
  const { organicDays, recyclableDays } = legendDetails(collectionSchedules, user.neighborhood);
  const electronicEvent = upcomingCollections.find((item) => item.wasteType === 'electronic');

  return (
    <>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitleLight}>Calendário de Coletas</Text>
        <Text style={styles.pageSubtitleLight}>Planeje sua semana</Text>
      </View>

      <View style={styles.calendarMonthRow}>
        <Text style={styles.monthArrow}>{'‹'}</Text>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <Text style={styles.monthArrow}>{'›'}</Text>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.weekdayRow}>
          {weekdayLabels.map((label) => (
            <Text key={label} style={styles.weekdayCell}>
              {label}
            </Text>
          ))}
        </View>

        {calendarRows.map((week, index) => (
          <View key={`week-${index}`} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <View
                key={`${index}-${dayIndex}`}
                style={[
                  styles.dayCell,
                  { backgroundColor: day.inMonth ? colors.waste[day.wasteType ?? 'general'] : 'transparent' },
                  !day.inMonth && styles.dayCellMuted,
                ]}
              >
                {day.inMonth ? (
                  <>
                    <Text style={[styles.dayNumber, dayTextStyle(day.wasteType)]}>{day.dayNumber}</Text>
                    <Text style={[styles.dayMarker, markerStyle(day.wasteType)]}>
                      {day.wasteType ? iconLabels[day.wasteType] : ''}
                    </Text>
                  </>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleSmall}>Legenda:</Text>
      </View>

      <View style={styles.legendList}>
        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.organic }]}>
            <Text style={styles.wasteBadgeText}>{iconLabels.organic}</Text>
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Orgânico</Text>
            <Text style={styles.legendText}>{organicDays}</Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.recyclable }]}>
            <Text style={[styles.wasteBadgeText, styles.wasteBadgeTextCyan]}>
              {iconLabels.recyclable}
            </Text>
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Reciclável</Text>
            <Text style={styles.legendText}>{recyclableDays}</Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.electronic }]}>
            <Text style={[styles.wasteBadgeText, styles.wasteBadgeTextRed]}>
              {iconLabels.electronic}
            </Text>
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Eletrônico</Text>
            <Text style={styles.legendText}>
              {electronicEvent
                ? `${new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                  }).format(new Date(electronicEvent.occursAt))} - ${new Intl.DateTimeFormat('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(electronicEvent.occursAt))} às 17:00`
                : '10 de Outubro - 08:00 às 17:00'}
            </Text>
            <Text style={styles.legendText}>Praça Leônidas Ribas</Text>
          </View>
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteText}>
          Deixe seu lixo na calçada até às 06:30 nos dias de coleta
        </Text>
      </View>
    </>
  );
}
