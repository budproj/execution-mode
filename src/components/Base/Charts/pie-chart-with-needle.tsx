/* eslint-disable max-params */
/* eslint-disable no-shadow */
import { Box, Flex, Text, useToken } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { PieChart, Pie, Cell } from 'recharts'

import { useGetEmoji } from 'src/components/Routine/hooks'

import { mapValueToAngle, mapValueToAngles } from './helpers'
import messages from './messages'

const RADIAN = Math.PI / 180
const data = [
  { name: 'low', value: 33.33 },
  { name: 'medium', value: 33.33 },
  { name: 'good', value: 33.33 },
]

const ranges = (value: number) => {
  if (value <= 15) {
    return { range: 'low', emoji: 1 }
  }

  if (value >= 16 && value <= 30) {
    return { range: 'regular', emoji: 2 }
  }

  if (value >= 31 && value <= 60) {
    return { range: 'good', emoji: 4 }
  }

  if (value >= 61 && value <= 80) {
    return { range: 'veryGood', emoji: 5 }
  }

  return { range: 'excellent', emoji: 5 }
}

interface PieChartWithNeedleProperties {
  value: number
  goalValue: number
  ir?: any
  or?: any
}

const cx = 165
const cy = 115
const indexR = 60
const oR = 100

const needle = (
  value: number,
  goalValue: number,
  data: any,
  cx: number,
  cy: number,
  oR: number,
  color: string,
) => {
  let total = 0
  for (const v of data) {
    total += v.value
  }

  let valueAux = 0
  if (value === 0) {
    valueAux = -20
  } else if (value >= 45 && value <= 50) {
    valueAux = 4
  } else if (value > 61) {
    valueAux = 18
  } else if (value < 61) {
    valueAux = -10
  }

  const ang = 180 * (1 - (value + valueAux) / total)
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = -10
  const shortenedLength = mapValueToAngle(value)

  const x0 = cx + (indexR + r + shortenedLength) * cos // Adjust the starting point
  const y0 = cy + (indexR + r + shortenedLength) * sin // Adjust the starting point
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + 20 * cos
  const yp = y0 + 20 * sin

  let goalValueAux = 0
  if (goalValue > 61) {
    goalValueAux = 10
  } else if (goalValue < 61) {
    goalValueAux = -20
  }

  // Const ang2 = 180 * (1 - (value + 30) / total)
  const ang2 = 180 * (1 - (goalValue + goalValueAux) / total)

  const sin2 = Math.sin(-RADIAN * ang2)
  const cos2 = Math.cos(-RADIAN * ang2)
  const { lengthFactor, innerLengthFactor } = mapValueToAngles(goalValue)
  // Adjust the starting point to move it closer to the tip of the circumference
  const x02 = cx + oR * innerLengthFactor * cos2 // Adjust the factor to control how close the line is to the center horizontally
  const y02 = cy + oR * innerLengthFactor * sin2 // Adjust the factor to control how close the line is to the center vertically

  // Adjust the endpoint to make the line shorter
  const xp2 = cx + oR * cos2 * (1 - lengthFactor)
  const yp2 = cy + oR * sin2 * (1 - lengthFactor)

  return [
    <path
      key="1"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="white"
      strokeWidth="2px"
      fill={color}
    />,
    <path
      key="2"
      d={
        value || goalValue <= 80
          ? `M${x02} ${y02} L${xp2} ${yp2}`
          : 'M285.7706068466986 154.28690013070718 L245.83072111786913 141.29438197724497'
      }
      stroke="white"
      strokeWidth="2px"
      strokeDasharray={4}
      fill={color}
    />,
  ]
}

const CustomizedPieCenterText = (properties: { rangeValue: number }) => {
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()

  const labelText = new Map([
    ['low', messages.lowStatusPieChartMessage],
    ['regular', messages.regularStatusPieChartMessage],
    ['good', messages.goodStatusPieChartMessage],
    ['veryGood', messages.veryGoodStatusPieChartMessage],
    ['excellent', messages.excellentStatusPieChartMessage],
  ])

  return (
    <>
      <Flex position="absolute" top="80px" left="135px">
        {getEmoji({ felling: ranges(properties.rangeValue).emoji, size: 20 })}
      </Flex>
      <Flex flexDirection="column" position="absolute" top="150px" left="69px" textAlign="center">
        <Text marginTop="20px" color="gray.500" fontSize="12px" position="absolute" width="200px">
          {intl.formatMessage(messages.labelPieChartMessage)}
        </Text>
        <Text
          fontSize="18px"
          fontWeight={700}
          marginTop="40px"
          color="brand.500"
          position="absolute"
          width="200px"
        >
          {intl
            .formatMessage(
              labelText.get(ranges(properties.rangeValue).range) ??
                messages.regularStatusPieChartMessage,
            )
            ?.toUpperCase()}
        </Text>
      </Flex>
    </>
  )
}

const PieChartWithNeedle = ({ value, goalValue, ir, or }: PieChartWithNeedleProperties) => {
  const [red] = useToken('colors', ['red.500'])
  const [yellow] = useToken('colors', ['yellow.600'])
  const [green] = useToken('colors', ['green.500'])
  const [white] = useToken('colors', ['radial-gradient(black 1px, transparent 0)'])

  const colors = new Map([
    ['low', red],
    ['medium', yellow],
    ['good', green],
    ['expected', white],
  ])

  if (value > 50 && value <= 60) {
    value = 61
  }

  return (
    <Box>
      <PieChart width={345} height={285}>
        <Pie
          dataKey="value"
          startAngle={220}
          endAngle={-40}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={ir ? ir : indexR}
          outerRadius={or ? or : oR}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index + 1}`}
              fill={colors.get(entry.name)}
              // Stroke={entry.name === 'expected' ? 'white' : 'none'}
              // strokeWidth={entry.name === 'expected' ? '2px' : 'none'}
              stroke="white"
              strokeWidth="2px"
            />
          ))}
        </Pie>
        {needle(value, goalValue, data, cx, cy, oR, '#6F6EFF')}
      </PieChart>
      <CustomizedPieCenterText rangeValue={value} />
    </Box>
  )
}

export default PieChartWithNeedle
