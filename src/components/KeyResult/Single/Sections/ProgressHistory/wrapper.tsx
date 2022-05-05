import { useLazyQuery } from '@apollo/client'
import { addWeeks, differenceInMonths, addMonths, startOfMonth, startOfWeek } from 'date-fns'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import { zip } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { IntlShape, useIntl } from 'react-intl'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { useRecoilState, useRecoilValue } from 'recoil'

import { CADENCE } from 'src/components/Cycle/constants'
import { KeyResultProgressRecord } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { selectSyncedFragment } from 'src/state/recoil/key-result/synced-fragments'

import { ChartData, ProgressHistoryChartHumble } from './chart'
import messages from './messages'
import queries from './queries.gql'
import { distributedCopy, formatData, formatDate } from './utils'

type ProgressHistoryChartProperties = {
  keyResultID?: string
}

export const ProgressHistoryChart = ({ keyResultID }: ProgressHistoryChartProperties) => {
  const timestamp = getTimezonedDate().toString()
  const xAxisKey = 'label'
  const numberOfTicks = 6

  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const [progressHistory, setProgressHistory] = useConnectionEdges<KeyResultProgressRecord>()

  const fragmentSelector = useMemo(
    () => selectSyncedFragment('progressHistory')(keyResultID),
    [keyResultID],
  )
  const [isSynced, setIsSynced] = useRecoilState(fragmentSelector)

  const cycle = keyResult?.objective?.cycle
  const cycleTickCount = useMemo(
    () => getNumberOfTicksInCycle(cycle?.dateStart, cycle?.dateEnd, cycle?.cadence),
    [cycle],
  )
  const cycleTicks = useMemo(
    () => getCycleParts(cycleTickCount, intl, cycle?.dateStart, cycle?.cadence),
    [cycleTickCount, cycle, intl],
  )
  const cycleLabels = useMemo(
    () => getCycleParts(cycleTickCount, intl, cycle?.dateStart, cycle?.cadence, 'long'),
    [cycleTickCount, cycle, intl],
  )

  const currentTick = useMemo(() => {
    const currentTickDate = getTickDateString(timestamp, 0, cycle?.cadence ?? CADENCE.QUARTERLY)

    return formatDate(intl, currentTickDate, cycle?.cadence)
  }, [intl, cycle, timestamp])

  const progressHistoryTickHashmap = useMemo(
    () => getTickHashmapFromProgressHistory(progressHistory, intl, cycle?.cadence),
    [progressHistory, cycle, intl],
  )
  const visibleTicks = useMemo(
    () => distributedCopy(cycleTicks, numberOfTicks),
    [cycleTicks, numberOfTicks],
  )

  const data = useMemo(() => {
    const currentTickFoundIndex = cycleTicks.indexOf(currentTick)
    const currentTickIndex =
      currentTickFoundIndex === -1 ? cycleTicks.length - 1 : currentTickFoundIndex

    return buildData(
      cycleTicks,
      currentTickIndex,
      xAxisKey,
      progressHistoryTickHashmap,
      cycleLabels,
    )
  }, [cycleTicks, xAxisKey, progressHistoryTickHashmap, currentTick, cycleLabels])

  const handleLabelVisualization = (_: unknown, axis: Array<Payload<string, string>>) => {
    const prefixHashmap: Record<CADENCE, string> = {
      [CADENCE.QUARTERLY]: intl.formatMessage(messages.quarterlyTooltipPrefix),
      [CADENCE.YEARLY]: intl.formatMessage(messages.yearlyTooltipPrefix),
    }
    const prefix = prefixHashmap[cycle?.cadence ?? CADENCE.QUARTERLY]
    const label: string = axis?.[0]?.payload?.tooltip

    return `${prefix} ${label}`
  }

  const [fetchProgressHistory] = useLazyQuery(queries.GET_KEY_RESULT_PROGRESS_HISTORY, {
    fetchPolicy: 'network-only',
    variables: {
      keyResultID,
    },
    onCompleted: (data) => {
      setProgressHistory(data?.keyResult?.progressHistory?.edges ?? [])
      setIsSynced(true)
    },
  })

  useEffect(() => {
    if (!isSynced) fetchProgressHistory()
  }, [isSynced, fetchProgressHistory])

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

const getCycleParts = (
  numberOfParts: number,
  intl: IntlShape,
  dateStart?: string,
  cadence: CADENCE = CADENCE.QUARTERLY,
  style: 'short' | 'long' = 'short',
  // eslint-disable-next-line max-params
): string[] => {
  if (!dateStart) return []

  const partIndexes = [...new Array(numberOfParts + 1).keys()]
  const parts = partIndexes.map((index) => getTickDateString(dateStart, index, cadence))

  return parts.map((part) => formatDate(intl, part, cadence, style))
}

const getTickDateString = (rawDate: string | Date, index: number, cadence: CADENCE): string => {
  const date = getTimezonedDate(rawDate)

  const handlerHashmap = {
    [CADENCE.QUARTERLY]: () => startOfWeek(addWeeks(date, index)),
    [CADENCE.YEARLY]: () => startOfMonth(addMonths(date, index)),
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

const buildData = (
  cycleTicks: string[],
  currentTickIndex: number,
  xAxisKey: string,
  progressHistoryTickHashmap: Record<string, ChartData>,
  cycleLabels: string[],
  // eslint-disable-next-line max-params
): ChartData[] => {
  const zippedTicks = zip(cycleTicks, cycleLabels) as Array<[string, string]>

  return zippedTicks?.reduce<ChartData[]>((previous, [tick, tooltip], index) => {
    const previousData = previous[index - 1]
    const expectedProgress = (0.7 / (cycleTicks.length - 1)) * index
    const historyData = progressHistoryTickHashmap[tick]

    const isFirstTick = index === 0
    const isBeforeOrCurrentTick = index <= currentTickIndex
    const firstTickProgress = isFirstTick ? 0 : undefined
    const fallbackProgress = isBeforeOrCurrentTick ? previousData?.visibleProgress : undefined
    const visibleProgress = historyData?.progress ?? firstTickProgress ?? fallbackProgress

    const currentData: ChartData = {
      ...historyData,
      expectedProgress,
      visibleProgress,
      tooltip,
      [xAxisKey]: tick,
    }

    return [...previous, currentData]
  }, [])
}

const getTimezonedDate = (rawDate?: string | Date): Date => {
  const tzDate = rawDate ? new Date(rawDate) : new Date()
  const userTimezoneOffset = tzDate.getTimezoneOffset() * 60000

  return new Date(tzDate.getTime() + userTimezoneOffset)
}
