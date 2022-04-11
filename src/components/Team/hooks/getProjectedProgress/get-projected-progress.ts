import { isAfter, differenceInSeconds } from 'date-fns'
import { useMemo } from 'react'

import { Team } from 'src/components/Team/types'

interface useGetProjectedProgressProperties {
  dateStart: Team['tacticalCycle']['dateStart']
  dateEnd: Team['tacticalCycle']['dateEnd']
}

export const useGetProjectedProgress = ({
  dateStart,
  dateEnd,
}: useGetProjectedProgressProperties) => {
  const projectedProgress = useMemo(() => {
    const currentDate = new Date()

    if (isAfter(dateStart, currentDate)) return 0
    if (isAfter(currentDate, dateEnd)) return 1

    const deltaStartFinish = differenceInSeconds(dateStart, dateEnd)
    const deltaStartCurrent = differenceInSeconds(dateStart, currentDate)
    const projectedProgress = deltaStartCurrent / deltaStartFinish
    return projectedProgress
  }, [dateStart, dateEnd])

  return { projectedProgress }
}
