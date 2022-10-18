import { startOfWeek, endOfWeek, getWeek, isEqual, isAfter } from 'date-fns'
import { atom } from 'recoil'

import { PREFIX } from './constants'

const now = new Date()

const weekStartsOn = 5
const routineTimespan = (date: Date) => {
  return {
    startsAt: startOfWeek(date, { weekStartsOn }),
    endsAt: endOfWeek(date, { weekStartsOn }),
  }
}

export const isNextWeekDisabled = (date: Date) => {
  const { endsAt } = routineTimespan(new Date())
  return isEqual(endsAt, date) || isAfter(date, endsAt)
}

export const getRoutineDateRangeDateFormat = (newDate: Date) => {
  const { startsAt, endsAt } = routineTimespan(newDate)
  const week = getWeek(newDate)

  return {
    after: startsAt,
    before: endsAt,
    week,
  }
}

export const routineDatesRangeAtom = atom({
  key: `${PREFIX}::ROUTINE_DATES_RANGE`,
  default: getRoutineDateRangeDateFormat(now),
})
