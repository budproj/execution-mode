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

import messages from './messages'

const formatData = (value: number) => value * 100

const formatDate = (rawDate?: string) => {
  const date = rawDate && rawDate !== '' ? new Date(rawDate) : new Date()

  return format(date, 'dd/MM')
}

const formatLabel = (_: unknown, [data]: Array<Payload<string, string>>) => {
  return formatDate(data?.payload?.date)
}

export const ProgressHistoryChart = () => {
  const fakeData = [
    {
      id: '027acd9a-844c-4817-ae02-206c62a62b80',
      progress: 0.2,
      date: '2021-03-16T14:47:48.000Z',
    },
    {
      id: '027acd9a-844c-4817-ae02-206c62a62b80',
      progress: 0.7,
      date: '2021-04-16T14:47:48.000Z',
    },
    {
      id: '027acd9a-844c-4817-ae02-206c62a62b80',
      progress: 0.5,
      date: '2021-05-16T14:47:48.000Z',
    },
    {
      id: '027acd9a-844c-4817-ae02-206c62a62b80',
      progress: 0.5,
      date: '2021-06-16T14:47:48.000Z',
    },
    {
      id: '027acd9a-844c-4817-ae02-206c62a62b80',
      progress: 1,
      date: '2021-07-16T14:47:48.000Z',
    },
  ]

  const intl = useIntl()
  const [brand100, brand300, brand500, newGray200, newGray400, newGray500] = useToken('colors', [
    'brand.100',
    'brand.300',
    'brand.500',
    'new-gray.200',
    'new-gray.400',
    'new-gray.500',
  ])

  return (
    <Box w="full" h={48}>
      <ResponsiveContainer>
        <ComposedChart data={fakeData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brand300} />
              <stop offset="95%" stopColor={brand100} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={newGray200} />
          <Tooltip separator=": " formatter={formatData} labelFormatter={formatLabel} />

          <XAxis
            xAxisId="primary"
            dataKey="time"
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
