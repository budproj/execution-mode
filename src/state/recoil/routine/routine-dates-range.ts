import { startOfWeek, endOfWeek, getWeek, isEqual, isAfter } from 'date-fns'
import { atom, selector } from 'recoil'

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

export const routineDatesRangeAtom = atom({
  key: `${PREFIX}::ROUTINE_DATES_RANGE`,
  default: now,
})

export const routineDateRangeSelector = selector({
  key: `${PREFIX}::ROUTINE_DATE_SELECTOR`,
  get: ({ get }) => {
    const routineDate = get(routineDatesRangeAtom)
    const { startsAt, endsAt } = routineTimespan(routineDate)
    const week = getWeek(routineDate)
    return {
      after: startsAt,
      before: endsAt,
      week,
    }
  },
})
