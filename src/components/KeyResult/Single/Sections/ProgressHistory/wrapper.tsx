import { useQuery } from '@apollo/client'
import { addWeeks, differenceInMonths, endOfMonth, endOfWeek, addMonths } from 'date-fns'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import React, { useMemo } from 'react'
import { IntlShape, useIntl } from 'react-intl'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { useRecoilValue } from 'recoil'

import { CADENCE } from 'src/components/Cycle/constants'
import { KeyResultProgressRecord } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { ChartData, ProgressHistoryChartHumble } from './chart'
import queries from './queries.gql'
import { distributedCopy, formatData, formatDate } from './utils'

type ProgressHistoryChartProperties = {
  keyResultID?: string
}

export const ProgressHistoryChart = ({ keyResultID }: ProgressHistoryChartProperties) => {
  const timestamp = getTimezonedDate().toString()
  const xAxisKey = 'endOfWeek'
  const numberOfTicks = 6

  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const cycle = keyResult?.objective?.cycle
  const [progressHistory, setProgressHistory] = useConnectionEdges<KeyResultProgressRecord>()

  const cycleTickCount = useMemo(
    () => getNumberOfTicksInCycle(cycle?.dateStart, cycle?.dateEnd, cycle?.cadence),
    [cycle],
  )
  const cycleTicks = useMemo(
    () => getCycleTicks(cycleTickCount, intl, cycle?.dateStart, cycle?.cadence),
    [cycleTickCount, cycle, intl],
  )
  const currentTick = useMemo(
    () => formatDate(intl, timestamp, cycle?.cadence),
    [intl, cycle, timestamp],
  )

  const progressHistoryTickHashmap = useMemo(
    () => getTickHashmapFromProgressHistory(progressHistory, intl, cycle?.cadence),
    [progressHistory, cycle, intl],
  )
  const visibleTicks = useMemo(
    () => distributedCopy(cycleTicks, numberOfTicks),
    [cycleTicks, numberOfTicks],
  )

  const data = useMemo(() => {
    const currentTickIndex = cycleTicks.indexOf(currentTick)

    return buildData(cycleTicks, currentTickIndex, xAxisKey, progressHistoryTickHashmap)
  }, [cycleTicks, xAxisKey, progressHistoryTickHashmap, currentTick])

  useQuery(queries.GET_KEY_RESULT_PROGRESS_HISTORY, {
    variables: {
      keyResultID,
    },
    onCompleted: (data) => {
      setProgressHistory(data.keyResult.progressHistory.edges)
    },
  })

  return (
    <ProgressHistoryChartHumble
      data={data}
      handleDataVisualization={formatData}
      handleLabelVisualization={handleLabelVisualization}
      xAxisKey={xAxisKey}
      xTicks={visibleTicks}
    />
  )
}

const getNumberOfTicksInCycle = (
  dateStart?: string,
  dateEnd?: string,
  cadence?: CADENCE,
): number => {
  if (!dateStart || !dateEnd) return 0
  const handlerHashmap = {
    [CADENCE.QUARTERLY]: differenceInWeeks,
    [CADENCE.YEARLY]: differenceInMonths,
  }
  const handler = handlerHashmap[cadence ?? CADENCE.QUARTERLY]

  return handler(new Date(dateEnd), new Date(dateStart))
}

const getCycleTicks = (
  numberOfTicks: number,
  intl: IntlShape,
  dateStart?: string,
  cadence: CADENCE = CADENCE.QUARTERLY,
): string[] => {
  if (!dateStart) return []

  const tickIndexes = [...new Array(numberOfTicks + 1).keys()]
  const ticks = tickIndexes.map((index) => getTickDateString(dateStart, index, cadence))

  return ticks.map((tick) => formatDate(intl, tick, cadence))
}

const getTickDateString = (rawDate: string | Date, index: number, cadence: CADENCE): string => {
  const date = getTimezonedDate(rawDate)

  const handlerHashmap = {
    [CADENCE.QUARTERLY]: () => endOfWeek(addWeeks(date, index)),
    [CADENCE.YEARLY]: () => endOfMonth(addMonths(date, index)),
  }

  const handler = handlerHashmap[cadence]

  return handler().toString()
}

const getTickHashmapFromProgressHistory = (
  progressHistory: KeyResultProgressRecord[],
  intl: IntlShape,
  cadence: CADENCE = CADENCE.QUARTERLY,
): Record<string, ChartData> => {
  return progressHistory.reduce((previous, current) => {
    const date = getTickDateString(current.date, 0, cadence)
    const key = formatDate(intl, date, cadence)

    return {
      ...previous,
      [key]: current,
    }
  }, {})
}

const handleLabelVisualization = (_: unknown, axis: Array<Payload<string, string>>) =>
  axis?.[0]?.payload?.endOfWeek

const buildData = (
  cycleTicks: string[],
  currentTickIndex: number,
  xAxisKey: string,
  progressHistoryTickHashmap: Record<string, ChartData>,
): ChartData[] =>
  cycleTicks?.reduce<ChartData[]>((previous, tick, index) => {
    const previousData = previous[index - 1]
    const expectedProgress = (0.7 / (cycleTicks.length - 1)) * index
    const historyData = progressHistoryTickHashmap[tick]

    const isFirstTick = index === 0
    const isBeforeOrCurrentTick = index <= currentTickIndex
    const fallbackProgress = isBeforeOrCurrentTick ? previousData?.progress : undefined

    const currentData: ChartData = {
      progress: isFirstTick ? 0 : fallbackProgress,
      ...historyData,
      expectedProgress,
      [xAxisKey]: tick,
    }

    return [...previous, currentData]
  }, [])

const getTimezonedDate = (rawDate?: string | Date): Date => {
  const tzDate = rawDate ? new Date(rawDate) : new Date()
  const userTimezoneOffset = tzDate.getTimezoneOffset() * 60000

  return new Date(tzDate.getTime() + userTimezoneOffset)
}
