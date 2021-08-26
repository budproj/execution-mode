import { useQuery } from '@apollo/client'
import { Box, useToken } from '@chakra-ui/react'
import format from 'date-fns/format'
import React from 'react'
import { useIntl } from 'react-intl'
import {
  Area,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  ComposedChart,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import messages from './messages'
import queries from './queries.gql'

const formatData = (value: number) => Math.round(value * 100)

const formatDate = (rawDate?: string, ...rest: any) => {
  const date = rawDate && rawDate !== '' ? new Date(rawDate) : new Date()

  return format(date, 'dd/MM')
}

const formatLabel = (_: unknown, [data]: Array<Payload<string, string>>) => {
  return formatDate(data?.payload?.date)
}

type ProgressHistoryChartProperties = {
  keyResultID?: string
}

export const ProgressHistoryChart = ({ keyResultID }: ProgressHistoryChartProperties) => {
  const [progressHistory, setProgressHistory, _, isLoaded] = useConnectionEdges()
  const intl = useIntl()
  const [brand100, brand300, brand500, newGray200, newGray400, newGray500] = useToken('colors', [
    'brand.100',
    'brand.300',
    'brand.500',
    'new-gray.200',
    'new-gray.400',
    'new-gray.500',
  ])

  useQuery(queries.GET_KEY_RESULT_PROGRESS_HISTORY, {
    variables: {
      keyResultID,
    },
    onCompleted: (data) => {
      setProgressHistory(data.keyResult.progressHistory.edges)
    },
  })

  return (
    <Box w="full" h={48}>
      <ResponsiveContainer>
        <ComposedChart data={progressHistory}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brand300} />
              <stop offset="95%" stopColor={brand100} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={newGray200} />

          <Tooltip
            separator=": "
            formatter={formatData}
            labelFormatter={formatLabel}
            cursor={false}
          />

          <XAxis
            xAxisId="primary"
            dataKey="date"
            tickFormatter={formatDate}
            stroke={newGray400}
            tickLine={false}
            tick={{ fill: newGray500 }}
            interval="preserveStartEnd"
          />
          <XAxis orientation="top" stroke={newGray400} height={1} tickLine={false} />

          <YAxis
            yAxisId="primary"
            type="number"
            ticks={[0.25, 0.5, 0.75, 1]}
            tickLine={false}
            stroke={newGray400}
            width={1}
          />
          <YAxis orientation="right" stroke={newGray400} width={1} tickLine={false} />

          <Area
            yAxisId="primary"
            xAxisId="primary"
            type="monotone"
            unit="%"
            dataKey="progress"
            name={intl.formatMessage(messages.metricName)}
            strokeWidth={2}
            stroke={brand500}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}
