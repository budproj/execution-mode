import { Box } from '@chakra-ui/layout'
import { useToken } from '@chakra-ui/system'
import React from 'react'
import { useIntl } from 'react-intl'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

import messages from './messages'

export type ChartData = {
  expectedProgress: number
  visibleProgress?: number
  progress?: number
  date?: Date
}

type ProgressHistoryChartProperties = {
  data: ChartData[]
  xTicks: string[]
  xAxisKey: string
  handleDataVisualization: (value: number) => number
  handleLabelVisualization: (_: unknown, [data]: Array<Payload<string, string>>) => string
}

export const ProgressHistoryChartHumble = ({
  data,
  xTicks,
  xAxisKey,
  handleDataVisualization,
  handleLabelVisualization,
}: ProgressHistoryChartProperties) => {
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
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brand300} />
              <stop offset="95%" stopColor={brand100} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={newGray200} />

          <Tooltip
            separator=": "
            formatter={handleDataVisualization}
            labelFormatter={handleLabelVisualization}
            cursor={false}
          />

          <XAxis
            xAxisId="primary"
            dataKey={xAxisKey}
            stroke={newGray400}
            tickLine={false}
            tick={{ fill: newGray500 }}
            ticks={xTicks}
            interval="preserveStartEnd"
          />

          <YAxis
            yAxisId="primary"
            type="number"
            ticks={[0.25, 0.5, 0.75, 1]}
            tickLine={false}
            stroke={newGray400}
            width={0}
          />

          <Area
            connectNulls
            yAxisId="primary"
            xAxisId="primary"
            type="monotone"
            unit="%"
            dataKey="visibleProgress"
            name={intl.formatMessage(messages.metricName)}
            strokeWidth={2}
            stroke={brand500}
            fillOpacity={1}
            fill="url(#colorUv)"
          />

          <Line
            yAxisId="primary"
            xAxisId="primary"
            dataKey="expectedProgress"
            type="monotone"
            dot={false}
            stroke={newGray500}
            strokeDasharray="5 5"
            unit="%"
            name={intl.formatMessage(messages.expectedName)}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}
