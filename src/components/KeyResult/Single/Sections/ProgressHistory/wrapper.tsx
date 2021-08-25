import { Box, useToken } from '@chakra-ui/react'
import format from 'date-fns/format'
import React from 'react'
import {
  Area,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  ComposedChart,
  YAxis,
  CartesianGrid,
} from 'recharts'

export const ProgressHistoryChart = () => {
  const fakeData = [
    {
      time: 1616889600,
      close: 20,
    },
    {
      time: 1617148800,
      close: 40,
    },
    {
      time: 1617408000,
      close: 30,
    },
    {
      time: 1617667200,
      close: 40,
    },
  ]

  const [brand100, brand300, brand500, newGray200, newGray400, newGray500] = useToken('colors', [
    'brand.100',
    'brand.300',
    'brand.500',
    'new-gray.200',
    'new-gray.400',
    'new-gray.500',
  ])

  const convertDate = (timestamp: any) => format(new Date(timestamp * 1000), 'dd/MM')

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

          <Area
            yAxisId="primary"
            xAxisId="primary"
            type="monotone"
            unit="%"
            dataKey="close"
            strokeWidth={2}
            stroke={brand500}
            fillOpacity={1}
            fill="url(#colorUv)"
          />

          <Tooltip />

          <XAxis
            xAxisId="primary"
            dataKey="time"
            tickFormatter={convertDate}
            interval={0}
            stroke={newGray400}
            tickLine={false}
            tick={{ fill: newGray500 }}
          />
          <XAxis orientation="top" stroke={newGray400} height={1} tickLine={false} />

          <YAxis
            yAxisId="primary"
            type="number"
            ticks={[25, 50, 75, 100]}
            tickLine={false}
            stroke={newGray400}
            width={1}
          />
          <YAxis orientation="right" stroke={newGray400} width={1} tickLine={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}
