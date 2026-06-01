import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { getAppStyles, getThemeColors } from '../ui/styles';
import { iconLabels } from '../theme/tokens';
import { getWasteLabel } from '../domain/schedule';
import type { CollectionSchedule, UserProfile, WasteType } from '../domain/types';

interface CalendarScreenProps {
  user: UserProfile;
  collectionSchedules: CollectionSchedule[];
  referenceDate: Date;
}

const weekdayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CalendarDay {
  date: Date;
  dayNumber: number;
  inMonth: boolean;
  wasteType?: WasteType;
}

function dayTextStyle(
  type: WasteType | undefined,
  colors: ReturnType<typeof getThemeColors>,
) {
  if (type === 'wet') {
    return { color: colors.wasteText.wet };
  }

  if (type === 'dry') {
    return { color: colors.wasteText.dry };
  }

  return { color: colors.textMuted };
}

function markerStyle(
  type: WasteType | undefined,
  colors: ReturnType<typeof getThemeColors>,
) {
  if (type === 'wet') {
    return { color: colors.wasteText.wet };
  }

  if (type === 'dry') {
    return { color: colors.wasteText.dry };
  }

  return { color: colors.textMuted };
}

function getWasteTextStyle(type: WasteType, styles: ReturnType<typeof getAppStyles>) {
  if (type === 'dry') {
    return styles.wasteBadgeTextCyan;
  }

  return undefined;
}

function legendDetails(schedules: CollectionSchedule[], neighborhood: UserProfile['neighborhood']) {
  const filtered = schedules.filter((item) => item.neighborhood === neighborhood);

  const wetDays = filtered.filter((item) => item.wasteType === 'wet').length
    ? 'Conforme setor no mapa oficial - a partir das 10:00'
    : 'Coleta programada';
  const dryDays = filtered.filter((item) => item.wasteType === 'dry').length
    ? 'Conforme setor no mapa oficial - a partir das 10:00'
    : 'Coleta programada';

  return { wetDays, dryDays };
}

function addMonths(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(/^\w/, (char) => char.toUpperCase());
}

function buildCalendarRows(monthDate: Date, schedules: CollectionSchedule[]) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  const rows: CalendarDay[][] = [];

  for (let week = 0; week < 6; week += 1) {
    const days: CalendarDay[] = [];

    for (let day = 0; day < 7; day += 1) {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + week * 7 + day);
      const match = schedules.find((schedule) => schedule.weekday === date.getDay());

      days.push({
        date,
        dayNumber: date.getDate(),
        inMonth: date.getMonth() === month,
        wasteType: match?.wasteType,
      });
    }

    rows.push(days);
  }

  return rows;
}

function formatCollectionDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
    .format(date)
    .replace('.', '');
}

export function CalendarScreen({
  user,
  collectionSchedules,
  referenceDate,
}: CalendarScreenProps) {
  const styles = getAppStyles(user.theme);
  const colors = getThemeColors(user.theme);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1),
  );
  const neighborhoodSchedules = useMemo(
    () => collectionSchedules.filter((item) => item.neighborhood === user.neighborhood),
    [collectionSchedules, user.neighborhood],
  );
  const calendarRows = useMemo(
    () => buildCalendarRows(visibleMonth, neighborhoodSchedules),
    [visibleMonth, neighborhoodSchedules],
  );
  const collectionDays = useMemo(
    () =>
      calendarRows
        .flat()
        .filter((day): day is CalendarDay & { wasteType: WasteType } => {
          return day.inMonth && Boolean(day.wasteType);
        }),
    [calendarRows],
  );
  const { wetDays, dryDays } = legendDetails(collectionSchedules, user.neighborhood);
  const monthLabel = getMonthLabel(visibleMonth);

  return (
    <>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitleLight}>Calendário de Coletas</Text>
        <Text style={styles.pageSubtitleLight}>Planeje sua semana</Text>
      </View>

      <View style={styles.calendarMonthRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setVisibleMonth((current) => addMonths(current, -1))}
          style={styles.monthArrowButton}
        >
          <Text style={styles.monthArrow}>{'‹'}</Text>
        </Pressable>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setVisibleMonth((current) => addMonths(current, 1))}
          style={styles.monthArrowButton}
        >
          <Text style={styles.monthArrow}>{'›'}</Text>
        </Pressable>
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
                  day.wasteType && styles.dayCellCollection,
                  {
                    backgroundColor:
                      day.inMonth && day.wasteType ? colors.waste[day.wasteType] : 'transparent',
                  },
                  !day.inMonth && styles.dayCellMuted,
                ]}
              >
                <Text style={[styles.dayNumber, dayTextStyle(day.wasteType, colors)]}>
                  {day.dayNumber}
                </Text>
                {day.wasteType ? (
                  <Text style={[styles.dayMarker, markerStyle(day.wasteType, colors)]}>
                    {iconLabels[day.wasteType]}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleSmall}>Dias de coleta no mês</Text>
        {collectionDays.length ? (
          <View style={styles.listBlock}>
            {collectionDays.map((day) => {
              const schedule = neighborhoodSchedules.find(
                (item) => item.weekday === day.date.getDay() && item.wasteType === day.wasteType,
              );

              return (
                <View key={day.date.toISOString()} style={styles.scheduleCard}>
                  <View style={styles.scheduleCardMain}>
                    <View
                      style={[
                        styles.wasteBadge,
                        { backgroundColor: colors.waste[day.wasteType] },
                      ]}
                    >
                      <Text style={[styles.wasteBadgeText, getWasteTextStyle(day.wasteType, styles)]}>
                        {iconLabels[day.wasteType]}
                      </Text>
                    </View>
                    <View style={styles.scheduleCardText}>
                      <Text style={styles.scheduleTitle}>{getWasteLabel(day.wasteType)}</Text>
                      <Text style={styles.scheduleMeta}>{formatCollectionDate(day.date)}</Text>
                    </View>
                  </View>
                  <Text style={styles.scheduleTime}>
                    {String(schedule?.startHour ?? 10).padStart(2, '0')}:00
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.noteCardInline}>
            <Text style={styles.noteText}>
              Este bairro ainda não tem agenda local cadastrada no protótipo. Use o mapa oficial
              por endereço para confirmar o setor.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleSmall}>Legenda:</Text>
      </View>

      <View style={styles.legendList}>
        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.wet }]}>
            <Text style={styles.wasteBadgeText}>{iconLabels.wet}</Text>
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Lixo úmido</Text>
            <Text style={styles.legendText}>{wetDays}</Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.dry }]}>
            <Text style={[styles.wasteBadgeText, styles.wasteBadgeTextCyan]}>
              {iconLabels.dry}
            </Text>
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Lixo seco</Text>
            <Text style={styles.legendText}>{dryDays}</Text>
          </View>
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteText}>
          Consulte o mapa oficial por endereço e clique na região colorida para ver dia e turno.
        </Text>
      </View>
    </>
  );
}
