import { MINUTES_THRESHOLD as DAY_FORMATTER_THRESHOLD } from './useRelativeDateInDays/constants'
import { MINUTES_THRESHOLD as HOUR_FORMATTER_THRESHOLD } from './useRelativeDateInHours/constants'
import { MINUTES_THRESHOLD as MINUTE_FORMATTER_THRESHOLD } from './useRelativeDateInMinutes/constants'
import { MINUTES_THRESHOLD as MONTH_FORMATTER_THRESHOLD } from './useRelativeDateInMonths/constants'
import { MINUTES_THRESHOLD as WEEK_FORMATTER_THRESHOLD } from './useRelativeDateInWeeks/constants'

export const FORMATTER_THRESHOLDS = {
  MINUTE: MINUTE_FORMATTER_THRESHOLD,
  HOUR: HOUR_FORMATTER_THRESHOLD,
  DAY: DAY_FORMATTER_THRESHOLD,
  WEEK: WEEK_FORMATTER_THRESHOLD,
  MONTH: MONTH_FORMATTER_THRESHOLD,
}

export enum RELATIVE_DATE_UNIT {
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  FALLBACK = 'fallback',
}
