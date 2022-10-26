import { Box } from '@chakra-ui/react'
import { format, parseISO, parse } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { AverageData } from 'src/components/Routine/RetrospectiveTab/RoutinesOverview'

interface CustomizedProperties {
  x: number
  y: number
  locale: string
  payload: {
    value: string
    offset: number
  }
}

const CustomizedXAxisTick: FunctionComponent<any> = (properties: CustomizedProperties) => {
  const { x, y, payload, locale } = properties

  return payload.value ? (
    <g transform={`translate(${x},${y})`}>
      <text
        style={{ textTransform: 'capitalize' }}
        x={15}
        y={0}
        dy={10}
        textAnchor="middle"
        fill="#99A4C2"
      >
        {formatXAxis(parse(payload.value, 'dd/MM/yyyy', new Date()), locale)}
      </text>
    </g>
  ) : (
    <p>Loading</p>
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

const formatXAxis = (tickItem: Date, locale: string) => {
  return tickItem.toLocaleString(locale, { month: 'short' }).split('.')[0]
}

interface AreaChartComponentProperties {
  areaStartColor?: string
  areaEndColor?: string
  strokeLineColor?: string
  tooltipTitle?: string
  data?: AverageData[]
}

export const AreaChartComponent = ({
  areaEndColor = 'black',
  areaStartColor = 'black',
  strokeLineColor = 'black',
  data,
  tooltipTitle,
}: AreaChartComponentProperties) => {
  const random = Math.random()
  const { locale } = useIntl()

  return (
    <Box flex="1">
      <ResponsiveContainer minWidth={200} height={200} width="99%">
        <AreaChart
          data={data?.map((weekData) => {
            return {
              ...weekData,
              timestamp: format(parseISO(weekData.timestamp), 'dd/MM/yyyy'),
            }
          })}
        >
          <defs>
            <linearGradient id={`${random}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaStartColor} stopOpacity={0.9} />
              <stop offset="100%" stopColor={areaEndColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid fill="#F8F9FD" strokeOpacity={0.3} color="black" vertical={false} />
          <Tooltip separator=": " cursor={false} />
          <XAxis
            dataKey="timestamp"
            interval={30}
            tickSize={0}
            tick={<CustomizedXAxisTick locale={locale} />}
            strokeOpacity={0.5}
            stroke="#99A4C2"
            tickMargin={10}
          />
          <YAxis
            tickSize={0}
            width={18}
            domain={[0, 5]}
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
            name={tooltipTitle}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
