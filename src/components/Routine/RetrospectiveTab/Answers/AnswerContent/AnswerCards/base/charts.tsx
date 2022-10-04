import { Box, useToken } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export type RoutineChartData = {
  value: string
  timestamp: string
}

type ProgressHistoryChartProperties = {
  data: RoutineChartData[]
  tooltipTitle: string
  principalColor: 'brand' | 'yellow'
}

const RoutineChart = ({ data, tooltipTitle, principalColor }: ProgressHistoryChartProperties) => {
  const intl = useIntl()

  const [brand100, brand300, brand500, yellow100, yellow300, yellow600, newGray400, newGray500] =
    useToken('colors', [
      'brand.100',
      'brand.300',
      'brand.500',
      'yellow.100',
      'yellow.300',
      'yellow.600',
      'new-gray.400',
      'new-gray.500',
    ])

  const formatedData = data.map((item) => ({
    progress: Number(item.value),
    date: `${intl.formatDate(new Date(item.timestamp), { day: 'numeric' })}/${
      intl.formatDate(new Date(item.timestamp), { month: 'short' }).split('.')[0]
    }`,
  }))

  return (
    <Box padding={3} bg="new-gray.100" borderRadius={6} w="320px" h={28} pb={-2}>
      <ResponsiveContainer>
        <ComposedChart id={data[0].timestamp} data={formatedData}>
          {principalColor === 'brand' ? (
            <defs>
              <linearGradient id={principalColor} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={brand300} />
                <stop offset="95%" stopColor={brand100} />
              </linearGradient>
            </defs>
          ) : (
            <defs>
              <linearGradient id={principalColor} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={yellow300} />
                <stop offset="95%" stopColor={yellow100} />
              </linearGradient>
            </defs>
          )}

          <Tooltip separator=": " cursor={false} />

          <XAxis
            xAxisId="primary"
            stroke={newGray400}
            dataKey="date"
            tick={{ fontSize: 10, fill: newGray500 }}
            tickLine={false}
            interval="preserveStartEnd"
          />

          <Area
            connectNulls
            yAxisId="primary"
            xAxisId="primary"
            type="linear"
            dataKey="progress"
            name={tooltipTitle}
            stroke="none"
            fillOpacity={1}
            fill={`url(#${principalColor})`}
          />

          <Line
            yAxisId="primary"
            xAxisId="primary"
            dataKey="progress"
            tooltipType="none"
            strokeWidth={2}
            stroke={principalColor === 'brand' ? brand500 : yellow600}
            r={3}
            fill={principalColor === 'brand' ? brand500 : yellow600}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default RoutineChart
