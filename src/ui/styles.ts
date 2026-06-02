import { StatusBar, StyleSheet } from 'react-native';

import { colors as lightColors, darkColors, radii, spacing, typography } from '../theme/tokens';
import type { AppTheme } from '../domain/types';

const statusBarInset = (StatusBar.currentHeight ?? 0) + 4;

function createAppStyles(colors: typeof lightColors) {
  return StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  authenticatedKeyboardAvoider: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  contentWithTabs: {
    paddingBottom: 96,
  },
  topHeader: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 18,
    paddingTop: statusBarInset + spacing.md,
    paddingBottom: spacing.sm,
    gap: 6,
  },
  topHeaderHero: {
    backgroundColor: colors.backgroundAccent,
    paddingHorizontal: 18,
    paddingTop: statusBarInset + 12,
    paddingBottom: 14,
    gap: spacing.xs,
  },
  pageTitleLight: {
    color: colors.onPrimary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  pageSubtitleLight: {
    color: colors.onPrimary,
    fontSize: typography.body,
  },
  heroCard: {
    marginHorizontal: 12,
    gap: spacing.xs,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandBadge: {
    width: 26,
    height: 26,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadgeText: {
    color: colors.onPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  brandTextBlock: {
    gap: spacing.xxs,
    flex: 1,
  },
  brandTitle: {
    color: colors.primaryDark,
    fontSize: typography.title,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pinDot: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: radii.pill,
  },
  locationText: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
  nextCollectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: spacing.xs,
  },
  nextCollectionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextCollectionEyebrow: {
    color: colors.primaryDark,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  nextCollectionTitle: {
    color: colors.text,
    fontSize: typography.hero,
    fontWeight: '700',
  },
  nextCollectionSubtitle: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
    lineHeight: 20,
  },
  timePill: {
    minWidth: 70,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  timePillText: {
    color: colors.primaryDark,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
  },
  wasteInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wasteInlineTextLight: {
    color: colors.text,
    fontSize: typography.bodyLg,
  },
  section: {
    marginTop: spacing.md,
    marginHorizontal: 18,
    gap: spacing.sm,
  },
  sectionCompact: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.hero,
    fontWeight: '700',
  },
  sectionTitleSmall: {
    color: colors.text,
    fontSize: typography.titleSm,
    fontWeight: '700',
  },
  sectionBody: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  scheduleCardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    paddingRight: spacing.sm,
  },
  scheduleCardText: {
    flex: 1,
    gap: 2,
  },
  scheduleTitle: {
    color: colors.text,
    fontSize: typography.bodySm,
    fontWeight: '500',
  },
  scheduleMeta: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
  },
  scheduleTime: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
  },
  wasteBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wasteBadgeText: {
    color: colors.wasteText.wet,
    fontSize: typography.bodySm,
    fontWeight: '700',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tipBullet: {
    color: colors.primary,
    fontSize: typography.body,
    lineHeight: 18,
  },
  tipText: {
    color: colors.tipText,
    fontSize: typography.bodyLg,
    lineHeight: 20,
    flex: 1,
  },
  tipLink: {
    color: colors.info,
    fontSize: typography.body,
  },
  alertCard: {
    marginHorizontal: 18,
    marginTop: spacing.md,
    backgroundColor: colors.alertSurface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.alertBorder,
    padding: spacing.md,
    gap: spacing.xs,
  },
  alertTitle: {
    color: colors.alertTitle,
    fontSize: typography.titleSm,
    fontWeight: '700',
  },
  alertText: {
    color: colors.alertText,
    fontSize: typography.bodyLg,
    lineHeight: 20,
  },
  calendarMonthRow: {
    marginTop: spacing.md,
    marginHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthArrow: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 28,
  },
  monthArrowButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: {
    color: colors.text,
    fontSize: typography.hero,
    fontWeight: '700',
  },
  calendarCard: {
    marginTop: spacing.md,
    marginHorizontal: 18,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: spacing.sm,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  weekdayCell: {
    flex: 1,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: typography.body,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dayCell: {
    flex: 1,
    minHeight: 40,
    borderRadius: radii.xs,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 5,
  },
  dayCellCollection: {
    borderColor: colors.primary,
  },
  dayNumber: {
    fontSize: typography.bodyLg,
  },
  dayMarker: {
    fontSize: typography.caption,
    fontWeight: '700',
  },
  dayCellMuted: {
    opacity: 0.65,
  },
  legendList: {
    marginHorizontal: 18,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  legendMetaBlock: {
    flex: 1,
    gap: 2,
  },
  legendTitle: {
    color: colors.text,
    fontSize: typography.titleSm,
    fontWeight: '500',
  },
  legendText: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
    lineHeight: 18,
  },
  noteCard: {
    marginHorizontal: 18,
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.noteBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  noteCardInline: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.noteBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  noteText: {
    color: colors.info,
    fontSize: typography.body,
  },
  listBlock: {
    gap: spacing.sm,
  },
  nestedCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  electronicWasteMapCard: {
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapPreview: {
    height: 132,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mapSurface,
  },
  mapRoad: {
    position: 'absolute',
    backgroundColor: colors.mapRoad,
    borderWidth: 1,
    borderColor: colors.mapRoadBorder,
  },
  mapRoadHorizontal: {
    width: '120%',
    height: 24,
    transform: [{ rotate: '-8deg' }],
  },
  mapRoadVertical: {
    width: 24,
    height: '140%',
    left: '24%',
    transform: [{ rotate: '18deg' }],
  },
  mapRoadDiagonal: {
    width: 22,
    height: '150%',
    right: '20%',
    transform: [{ rotate: '-34deg' }],
  },
  mapPin: {
    width: 34,
    height: 34,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
    transform: [{ rotate: '45deg' }],
  },
  mapPinHole: {
    width: 13,
    height: 13,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
  },
  mapPinBase: {
    width: 34,
    height: 7,
    marginTop: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryDark,
    opacity: 0.24,
  },
  electronicWasteMapContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  body: {
    color: colors.text,
    fontSize: typography.bodyLg,
    lineHeight: 20,
  },
  bodyStrong: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
    lineHeight: 18,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choiceChip: {
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  choiceChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  choiceChipText: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '600',
  },
  choiceChipTextActive: {
    color: colors.onPrimary,
  },
  formGroup: {
    gap: spacing.xs,
  },
  inputLabel: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: typography.bodyLg,
  },
  sectorPicker: {
    gap: spacing.xs,
  },
  sectorPickerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    padding: spacing.sm,
  },
  sectorPickerTextBlock: {
    flex: 1,
    gap: 2,
  },
  sectorPickerLabel: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
  sectorPickerTitle: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  sectorPickerNeighborhoods: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 17,
  },
  sectorPickerAction: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  sectorPickerSearchArea: {
    gap: spacing.xs,
  },
  sectorPickerResults: {
    gap: spacing.xs,
  },
  sectorPickerOption: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    gap: 2,
  },
  sectorPickerOptionTitle: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  passwordInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: typography.bodyLg,
  },
  passwordVisibilityButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  passwordVisibilityButtonText: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: '700',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    color: colors.onPrimary,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: colors.text,
    fontSize: typography.bodyLg,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: colors.dangerSurface,
    borderRadius: radii.sm,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: colors.dangerText,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  deleteAccountButton: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.dangerText,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAccountButtonText: {
    color: colors.dangerText,
    fontSize: typography.bodyLg,
    fontWeight: '700',
  },
  deleteAccountConfirmation: {
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  preferenceToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.borderSoft,
    padding: 3,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  errorText: {
    color: colors.dangerText,
    fontSize: typography.bodyLg,
  },
  loginKeyboardAvoider: {
    flex: 1,
    backgroundColor: colors.backgroundAccent,
  },
  loginWrap: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: statusBarInset + spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    backgroundColor: colors.backgroundAccent,
  },
  authHero: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.bodyLg,
    lineHeight: 20,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: statusBarInset,
    backgroundColor: colors.backgroundAccent,
  },
  loadingCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  tabButton: {
    alignItems: 'center',
    gap: 4,
    minWidth: 64,
  },
  tabIcon: {
    width: 28,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: colors.primarySoft,
  },
  tabButtonText: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  tabButtonTextActive: {
    color: colors.primary,
  },
  });
}

export const appStyles = createAppStyles(lightColors);
export const darkAppStyles = createAppStyles(darkColors);

export function getAppStyles(theme: AppTheme = 'light') {
  return theme === 'dark' ? darkAppStyles : appStyles;
}

export function getThemeColors(theme: AppTheme = 'light') {
  return theme === 'dark' ? darkColors : lightColors;
}
