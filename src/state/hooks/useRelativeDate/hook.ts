import { differenceInMinutes } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'

import { FORMATTER_THRESHOLDS, RELATIVE_DATE_UNIT } from './constants'
import useRelativeDateFallback from './useRelativeDateFallback'
import useRelativeDateInDays from './useRelativeDateInDays'
import useRelativeDateInHours from './useRelativeDateInHours'
import useRelativeDateInMinutes from './useRelativeDateInMinutes'
import useRelativeDateInMonths from './useRelativeDateInMonths'
import useRelativeDateInWeeks from './useRelativeDateInWeeks'

const formatters = {
  [RELATIVE_DATE_UNIT.MONTH]: useRelativeDateInMonths,
  [RELATIVE_DATE_UNIT.WEEK]: useRelativeDateInWeeks,
  [RELATIVE_DATE_UNIT.DAY]: useRelativeDateInDays,
  [RELATIVE_DATE_UNIT.HOUR]: useRelativeDateInHours,
  [RELATIVE_DATE_UNIT.MINUTE]: useRelativeDateInMinutes,
  [RELATIVE_DATE_UNIT.FALLBACK]: useRelativeDateFallback,
}

const selectUnitBasedOnDifference = (date: Date, snapshotDate: Date) => {
  const minutesDifference = differenceInMinutes(date, snapshotDate)

  if (minutesDifference > FORMATTER_THRESHOLDS.MINUTE) return RELATIVE_DATE_UNIT.MINUTE
  if (minutesDifference > FORMATTER_THRESHOLDS.HOUR) return RELATIVE_DATE_UNIT.HOUR
  if (minutesDifference > FORMATTER_THRESHOLDS.DAY) return RELATIVE_DATE_UNIT.DAY
  if (minutesDifference > FORMATTER_THRESHOLDS.WEEK) return RELATIVE_DATE_UNIT.WEEK
  if (minutesDifference > FORMATTER_THRESHOLDS.MONTH) return RELATIVE_DATE_UNIT.MONTH

  return RELATIVE_DATE_UNIT.FALLBACK
}

const selectFormatter = (
  date?: Date,
  snapshotDate?: Date,
  initialUnit?: RELATIVE_DATE_UNIT,
): [(date: Date, snapshotDate: Date) => string, RELATIVE_DATE_UNIT] => {
  if (!date || !snapshotDate) return [formatters.fallback, RELATIVE_DATE_UNIT.FALLBACK]

  const unit = initialUnit ? initialUnit : selectUnitBasedOnDifference(date, snapshotDate)
  const formatter = formatters[unit]

  return [formatter, unit]
}

const useRelativeDate = (
  initialDate?: Date,
  initialUnit?: RELATIVE_DATE_UNIT,
  initialSnapshot?: Date,
): [
  string | undefined,
  Dispatch<SetStateAction<Date | undefined>>,
  RELATIVE_DATE_UNIT,
  Date | undefined,
  Dispatch<SetStateAction<Date>>,
] => {
  const initialSnapshotDate = initialSnapshot ?? new Date()

  const [date, setDate] = useState(initialDate)
  const [snapshotDate, setSnapshotDate] = useState(initialSnapshotDate)

  const [formatDate, unit] = selectFormatter(date, snapshotDate, initialUnit)
  const formattedDate = date ? formatDate(date, snapshotDate) : undefined

  return [formattedDate, setDate, unit, date, setSnapshotDate]
}

export default useRelativeDate
