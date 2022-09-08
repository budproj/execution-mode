import { Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const janeiro = () => {
  const value = []

  for (let index = 0; index < 30; index++) {
    value.push({
      name: '2022-01-17 10:10:00',
      mes: 'Jan',
      uv: Math.floor(Math.random() * (Math.ceil(5) - Math.ceil(3) + 1)) + Math.ceil(3),
    })
  }

  return value
}

const fevereiro = () => {
  const value = []

  for (let index = 0; index < 30; index++) {
    value.push({
      name: '2022-02-17 10:10:00',
      mes: 'Fev',
      uv: Math.floor(Math.random() * (Math.ceil(5) - Math.ceil(3) + 1)) + Math.ceil(3),
    })
  }

  return value
}

const março = () => {
  const value = []

  for (let index = 0; index < 30; index++) {
    value.push({
      name: '2022-03-17 10:10:00',
      mes: 'Mar',
      uv: Math.floor(Math.random() * (Math.ceil(5) - Math.ceil(3) + 1)) + Math.ceil(3),
    })
  }

  return value
}

const data = [...janeiro(), ...fevereiro(), ...março()]

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

  const pathX = Math.floor(x + payload.offset) + 0.5

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        style={{ textTransform: 'capitalize' }}
        x={160}
        y={0}
        dy={16}
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
  return d.toLocaleString('default', { month: 'long' })
}

interface AreaChartComponentProperties {
  areaStartColor?: string
  areaEndColor?: string
  strokeLineColor?: string
}

export const AreaChartComponent = ({
  areaEndColor = 'black',
  areaStartColor = 'black',
  strokeLineColor = 'black',
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
            dataKey="mes"
            scale="time"
            // Interval={30}
            // TickFormatter={formatXAxis}
            // domain={[0, 3]}
            // TickSize={0}
            // tick={<CustomizedXAxisTick />}
            ticks={['Jan', 'Fev', 'Mar']}
            // MinTickGap={100}
            strokeOpacity={0.5}
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
            dataKey="uv"
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
