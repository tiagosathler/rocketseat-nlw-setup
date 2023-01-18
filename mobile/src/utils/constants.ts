import { Dimensions } from 'react-native';

export const WEEK_DAYS = 7;

export const WEEK_DAYS_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;

export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export const MIN_SUMMARY_DATES_SIZES = 18 * 7;
