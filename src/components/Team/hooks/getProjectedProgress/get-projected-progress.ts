import { isAfter, differenceInSeconds, parseISO } from 'date-fns'
import { useMemo } from 'react'

import { Cycle } from 'src/components/Cycle/types'

interface useGetProjectedProgressProperties {
  dateStart: Cycle['dateStart'] | undefined
  dateEnd: Cycle['dateEnd'] | undefined
}

interface useGetProjectedProgressReturns {
  absoluteProjectedProgress: number
  percentualProjectedProgress: number
}

export const useGetProjectedProgress = ({
  dateStart,
  dateEnd,
}: useGetProjectedProgressProperties): useGetProjectedProgressReturns => {
  const absoluteProjectedProgress = useMemo(() => {
    if (!dateStart || !dateEnd) {
      return 0
    }

    const currentDate = new Date()
    const parsedDateStart = parseISO(dateStart)
    const parsedDateEnd = parseISO(dateEnd)
    const expectedGoal = 0.7

    if (isAfter(parsedDateStart, currentDate)) return 0
    if (isAfter(currentDate, parsedDateEnd)) return expectedGoal

    const deltaStartFinish = differenceInSeconds(parsedDateStart, parsedDateEnd)
    const deltaStartCurrent = differenceInSeconds(parsedDateStart, currentDate)

    const projectedProgress = (deltaStartCurrent / deltaStartFinish) * expectedGoal
    return projectedProgress
  }, [dateStart, dateEnd])

  const percentualProjectedProgress = useMemo(
    () => absoluteProjectedProgress * 100,
    [absoluteProjectedProgress],
  )

  return { absoluteProjectedProgress, percentualProjectedProgress }
}
