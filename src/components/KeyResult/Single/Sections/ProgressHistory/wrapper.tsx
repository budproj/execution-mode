import { useQuery } from '@apollo/client'
import { addWeeks } from 'date-fns'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import { endOfWeek } from 'date-fns/esm'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultProgressRecord } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { ProgressHistoryChartHumble } from './chart'
import queries from './queries.gql'
import { distributedCopy, formatData, formatDate, formatTooltipLabel } from './utils'

type ProgressHistoryChartProperties = {
  keyResultID?: string
}

const getNumberOfWeeksInCycle = (dateStart?: string, dateEnd?: string): number => {
  if (!dateStart || !dateEnd) return 0

  return differenceInWeeks(new Date(dateEnd), new Date(dateStart))
}

const getCycleWeeks = (numberOfWeeks: number, dateStart?: string): string[] => {
  if (!dateStart) return []

  const weekNumbers = [...new Array(numberOfWeeks).keys()]
  const weekDays = weekNumbers.map((weekNumber) =>
    endOfWeek(addWeeks(new Date(dateStart), weekNumber)).toString(),
  )

  return weekDays.map((weekDay) => formatDate(weekDay))
}

const getWeekHashmapFromProgressHistory = (
  progressHistory: KeyResultProgressRecord[],
): Record<string, KeyResultProgressRecord> => {
  return progressHistory.reduce(
    (previous, current) => ({
      ...previous,
      [formatDate(endOfWeek(new Date(current.date)).toString())]: current,
    }),
    {},
  )
}

export const ProgressHistoryChart = ({ keyResultID }: ProgressHistoryChartProperties) => {
  const xAxisKey = 'endOfWeek'
  const numberOfTicks = 6

  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const cycle = keyResult?.objective?.cycle
  const [progressHistory, setProgressHistory, _, isLoaded] =
    useConnectionEdges<KeyResultProgressRecord>()

  const cycleWeekCount = useMemo(
    () => getNumberOfWeeksInCycle(cycle?.dateStart, cycle?.dateEnd),
    [cycle],
  )
  const cycleWeeks = useMemo(
    () => getCycleWeeks(cycleWeekCount, cycle?.dateStart),
    [cycleWeekCount, cycle],
  )

  const progressHistoryWeekHashmap = useMemo(
    () => getWeekHashmapFromProgressHistory(progressHistory),
    [progressHistory],
  )
  const ticks = useMemo(
    () => distributedCopy(cycleWeeks, numberOfTicks),
    [cycleWeeks, numberOfTicks],
  )

  const data = useMemo(
    () =>
      cycleWeeks?.map((week) => ({
        ...progressHistoryWeekHashmap[week],
        [xAxisKey]: week,
      })),
    [cycleWeeks, xAxisKey, progressHistoryWeekHashmap],
  )

  useQuery(queries.GET_KEY_RESULT_PROGRESS_HISTORY, {
    variables: {
      keyResultID,
    },
    onCompleted: (data) => {
      setProgressHistory(data.keyResult.progressHistory.edges)
    },
  })

  return (
    isLoaded && (
      <ProgressHistoryChartHumble
        data={data}
        handleDataVisualization={formatData}
        handleLabelVisualization={formatTooltipLabel}
        xAxisKey={xAxisKey}
        xTicks={ticks}
      />
    )
  )
}
