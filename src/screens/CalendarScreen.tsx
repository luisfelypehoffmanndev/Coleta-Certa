import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { getAppStyles, getThemeColors } from '../ui/styles';
import { iconLabels } from '../theme/tokens';
import { WasteIcon } from '../components/WasteIcon';
import { formatScheduleTime, getWasteLabel } from '../domain/schedule';
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
  wasteTypes: WasteType[];
}

function dayTextStyle(
  types: WasteType[],
  colors: ReturnType<typeof getThemeColors>,
) {
  if (types.includes('wet')) {
    return { color: colors.wasteText.wet };
  }

  if (types.includes('dry')) {
    return { color: colors.wasteText.dry };
  }

  return { color: colors.textMuted };
}

function markerStyle(
  types: WasteType[],
  colors: ReturnType<typeof getThemeColors>,
) {
  if (types.includes('wet')) {
    return { color: colors.wasteText.wet };
  }

  if (types.includes('dry')) {
    return { color: colors.wasteText.dry };
  }

  return { color: colors.textMuted };
}

function describeSchedules(schedules: CollectionSchedule[], wasteType: WasteType) {
  const filtered = schedules.filter((item) => item.wasteType === wasteType);

  if (!filtered.length) {
    return 'Sem coleta programada';
  }

  return `${filtered.map((item) => weekdayLabels[item.weekday]).join(', ')} - a partir das ${formatScheduleTime(filtered[0])}`;
}

function legendDetails(schedules: CollectionSchedule[], sectorId: UserProfile['sectorId']) {
  const filtered = schedules.filter((item) => item.sectorId === sectorId);

  return {
    wetDays: describeSchedules(filtered, 'wet'),
    dryDays: describeSchedules(filtered, 'dry'),
  };
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
      const wasteTypes = schedules
        .filter((schedule) => schedule.weekday === date.getDay())
        .map((schedule) => schedule.wasteType);

      days.push({
        date,
        dayNumber: date.getDate(),
        inMonth: date.getMonth() === month,
        wasteTypes,
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
  const sectorSchedules = useMemo(
    () => collectionSchedules.filter((item) => item.sectorId === user.sectorId),
    [collectionSchedules, user.sectorId],
  );
  const calendarRows = useMemo(
    () => buildCalendarRows(visibleMonth, sectorSchedules),
    [visibleMonth, sectorSchedules],
  );
  const collectionDays = useMemo(
    () => {
      const isCurrentMonth =
        visibleMonth.getFullYear() === referenceDate.getFullYear() &&
        visibleMonth.getMonth() === referenceDate.getMonth();
      const listStartDate = isCurrentMonth
        ? new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate())
        : visibleMonth;

      return calendarRows
        .flat()
        .filter((day) => day.inMonth && day.date >= listStartDate)
        .flatMap((day) => day.wasteTypes.map((wasteType) => ({ ...day, wasteType })))
        .slice(0, 4);
    },
    [calendarRows, referenceDate, visibleMonth],
  );
  const { wetDays, dryDays } = legendDetails(collectionSchedules, user.sectorId);
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
                  Boolean(day.wasteTypes.length) && styles.dayCellCollection,
                  {
                    backgroundColor:
                      day.inMonth && day.wasteTypes.length
                        ? colors.waste[day.wasteTypes[0]]
                        : 'transparent',
                  },
                  !day.inMonth && styles.dayCellMuted,
                ]}
              >
                <Text style={[styles.dayNumber, dayTextStyle(day.wasteTypes, colors)]}>
                  {day.dayNumber}
                </Text>
                {day.wasteTypes.length ? (
                  <Text style={[styles.dayMarker, markerStyle(day.wasteTypes, colors)]}>
                    {day.wasteTypes.map((type) => iconLabels[type]).join(' ')}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleSmall}>Próximas coletas do mês</Text>
        {collectionDays.length ? (
          <View style={styles.listBlock}>
            {collectionDays.map((day) => {
              const schedule = sectorSchedules.find(
                (item) => item.weekday === day.date.getDay() && item.wasteType === day.wasteType,
              );

              return (
                <View key={`${day.date.toISOString()}-${day.wasteType}`} style={styles.scheduleCard}>
                  <View style={styles.scheduleCardMain}>
                    <View
                      style={[
                        styles.wasteBadge,
                        { backgroundColor: colors.waste[day.wasteType] },
                      ]}
                    >
                      <WasteIcon color={colors.wasteText[day.wasteType]} type={day.wasteType} />
                    </View>
                    <View style={styles.scheduleCardText}>
                      <Text style={styles.scheduleTitle}>{getWasteLabel(day.wasteType)}</Text>
                      <Text style={styles.scheduleMeta}>{formatCollectionDate(day.date)}</Text>
                    </View>
                  </View>
                  <Text style={styles.scheduleTime}>
                    {schedule ? formatScheduleTime(schedule) : '--:--'}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.noteCardInline}>
            <Text style={styles.noteText}>
              Este setor ainda não tem agenda local cadastrada. Use o mapa oficial
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
            <WasteIcon color={colors.wasteText.wet} type="wet" />
          </View>
          <View style={styles.legendMetaBlock}>
            <Text style={styles.legendTitle}>Lixo úmido</Text>
            <Text style={styles.legendText}>{wetDays}</Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.wasteBadge, { backgroundColor: colors.waste.dry }]}>
            <WasteIcon color={colors.wasteText.dry} type="dry" />
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
