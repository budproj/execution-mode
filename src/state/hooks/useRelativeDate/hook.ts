import { differenceInMinutes } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'

import { FORMATTER_THRESHOLDS } from './constants'
import useRelativeDateFallback from './useRelativeDateFallback'
import useRelativeDateInDays from './useRelativeDateInDays'
import useRelativeDateInHours from './useRelativeDateInHours'
import useRelativeDateInMinutes from './useRelativeDateInMinutes'
import useRelativeDateInMonths from './useRelativeDateInMonths'
import useRelativeDateInWeeks from './useRelativeDateInWeeks'

export type RelativeDateUnit = 'minute' | 'hour' | 'day' | 'week' | 'month'

const formatters = {
  minute: useRelativeDateInMinutes,
  hour: useRelativeDateInHours,
  day: useRelativeDateInDays,
  week: useRelativeDateInWeeks,
  month: useRelativeDateInMonths,
  fallback: useRelativeDateFallback,
}

const selectFormatterBasedOnDifference = (date: Date, snapshotDate: Date) => {
  const secondsDifference = differenceInMinutes(snapshotDate, date)
  let formatter = formatters.fallback

  if (secondsDifference < FORMATTER_THRESHOLDS.MONTH) formatter = formatters.month
  if (secondsDifference < FORMATTER_THRESHOLDS.WEEK) formatter = formatters.week
  if (secondsDifference < FORMATTER_THRESHOLDS.DAY) formatter = formatters.day
  if (secondsDifference < FORMATTER_THRESHOLDS.HOUR) formatter = formatters.hour
  if (secondsDifference < FORMATTER_THRESHOLDS.MINUTE) formatter = formatters.minute

  return formatter
}

const selectFormatter = (date?: Date, snapshotDate?: Date, unit?: RelativeDateUnit) => {
  if (!date || !snapshotDate) return

  const formatter = unit ? formatters[unit] : selectFormatterBasedOnDifference(date, snapshotDate)

  return formatter
}

const useRelativeDate = (
  initialDate?: Date,
  unit?: RelativeDateUnit,
  initialSnapshotDate: Date = new Date(),
): [
  string | undefined,
  Dispatch<SetStateAction<Date | undefined>>,
  Dispatch<SetStateAction<Date>>,
] => {
  const [date, setDate] = useState(initialDate)
  const [snapshotDate, setSnapshotDate] = useState(initialSnapshotDate)

  const formatDate = selectFormatter(date, snapshotDate, unit)
  const formattedDate = formatDate && date ? formatDate(date, snapshotDate) : undefined

  return [formattedDate, setDate, setSnapshotDate]
}

export default useRelativeDate
