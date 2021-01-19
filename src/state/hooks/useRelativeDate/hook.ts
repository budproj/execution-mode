import { differenceInMinutes } from 'date-fns'
import { useState } from 'react'
import { FORMATTER_THRESHOLDS } from './constants'
import useRelativeDateFallback from './useRelativeDateFallback'

import useRelativeDateInDays from './useRelativeDateInDays'
import useRelativeDateInHours from './useRelativeDateInHours'
import useRelativeDateInMinutes from './useRelativeDateInMinutes'
import useRelativeDateInMonths from './useRelativeDateInMonths'
import useRelativeDateInWeeks from './useRelativeDateInWeeks'

export type RelativeDateUnit = 'minute' | 'hour' | 'day' | 'week' | 'month'

const formatters = {
  minute: (date: Date, snapshotDate: Date) => useRelativeDateInMinutes(date, snapshotDate),
  hour: (date: Date, snapshotDate: Date) => useRelativeDateInHours(date, snapshotDate),
  day: (date: Date, snapshotDate: Date) => useRelativeDateInDays(date, snapshotDate),
  week: (date: Date, snapshotDate: Date) => useRelativeDateInWeeks(date, snapshotDate),
  month: (date: Date, snapshotDate: Date) => useRelativeDateInMonths(date, snapshotDate),
  fallback: (date: Date, _snapshotDate: Date) => useRelativeDateFallback(date),
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
  if (!date || !snapshotDate) return null

  const formatter = unit ? formatters[unit] : selectFormatterBasedOnDifference(date, snapshotDate)

  return formatter
}

const hook = (
  initialDate?: Date,
  unit?: RelativeDateUnit,
  initialSnapshotDate: Date = new Date(),
) => {
  const [date, setDate] = useState(initialDate)
  const [snapshotDate, setSnapshotDate] = useState(initialSnapshotDate)

  const formatDate = selectFormatter(date, snapshotDate, unit)
  const formattedDate = formatDate && date ? formatDate(date, snapshotDate) : undefined

  return [formattedDate, setDate, setSnapshotDate]
}

export default hook
