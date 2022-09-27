import { Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface CustomizedProperties {
  x: number
  y: number
  payload: {
    value: string
    offset: number
  }
}

const CustomizedXAxisTick: FunctionComponent<any> = (properties: CustomizedProperties) => {
  const { x, y, payload } = properties

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        style={{ textTransform: 'capitalize' }}
        x={15}
        y={0}
        dy={10}
        textAnchor="middle"
        fill="#99A4C2"
      >
        {formatXAxis(payload.value)}
      </text>
    </g>
  )
}

const CustomizedYAxisTick: FunctionComponent<any> = (properties: CustomizedProperties) => {
  const { x, y, payload } = properties

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-13} y={18} textAnchor="end" fill="#99A4C2">
        {payload.value}
      </text>
    </g>
  )
}

const formatXAxis = (tickItem: string) => {
  const d = new Date(tickItem)
  return d.toLocaleString('default', { month: 'short' }).split('.')[0]
}

interface AreaChartComponentProperties {
  areaStartColor?: string
  areaEndColor?: string
  strokeLineColor?: string
  data?: Array<{ timestamp: string; average: number }>
}

export const AreaChartComponent = ({
  areaEndColor = 'black',
  areaStartColor = 'black',
  strokeLineColor = 'black',
  data,
}: AreaChartComponentProperties) => {
  const random = Math.random()
  return (
    <Box flex="1">
      <ResponsiveContainer minWidth={200} height={200} width="99%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`${random}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaStartColor} stopOpacity={0.9} />
              <stop offset="100%" stopColor={areaEndColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid fill="#F8F9FD" strokeOpacity={0.3} color="black" vertical={false} />
          <XAxis
            dataKey="timestamp"
            interval={30}
            // TickFormatter={formatXAxis}
            // domain={[0, 3]}
            tickSize={0}
            tick={<CustomizedXAxisTick />}
            // MinTickGap={100}
            strokeOpacity={0.5}
            stroke="#99A4C2"
            tickMargin={10}
          />

          <YAxis
            tickSize={0}
            width={18}
            domain={[0, 6]}
            ticks={['', 1, 2, 3, 4, 5]}
            strokeOpacity={0.5}
            tick={<CustomizedYAxisTick />}
            axisLine={false}
          />
          <Area
            type="basis"
            dataKey="average"
            stroke={strokeLineColor}
            strokeWidth="2px"
            fillOpacity={1}
            fill={`url(#${random})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
