/* eslint-disable no-shadow */
import { useToken } from '@chakra-ui/react'
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const RADIAN = Math.PI / 180
const data = [
  { name: 'low', value: 80 },
  { name: 'medium', value: 45 },
  { name: 'good', value: 25 },
]
const cx = 165
const cy = 115
const indexR = 60
const oR = 100
const value = 50

const needle = (
  value: number,
  data: any,
  cx: number,
  cy: number,
  indexR: number,
  oR: number,
  color: string,
) => {
  let total = 0
  for (const v of data) {
    total += v.value
  }

  const ang = 180 * (1 - value / total)
  const length = (indexR + 2 * oR) / 10
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 12
  const x0 = cx + 5
  const y0 = cy - 20
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    // <circle key={`circle-${color}`} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    // <path d="M25.7994 13.4421L2.22443 2.63074L4.89503 28.391L25.7994 13.4421Z" fill="#6F6EFF" stroke="white" stroke-width="3"/>
    <path
      key={`path-${color}`}
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      fill="#6F6EFF"
      stroke="white"
      strokeWidth="3"
    />,
  ]
}

const PieChartWithNeedle = () => {
  const [red] = useToken('colors', ['red.500'])
  const [yellow] = useToken('colors', ['yellow.600'])
  const [green] = useToken('colors', ['green.500'])

  const colors = new Map([
    ['low', red],
    ['medium', yellow],
    ['good', green],
  ])

  return (
    <PieChart width={420} height={285}>
      <Pie
        dataKey="value"
        startAngle={220}
        endAngle={-40}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={indexR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index + 1}`} fill={colors.get(entry.name)} />
        ))}
      </Pie>
      {needle(value, data, cx, cy, indexR, oR, '#d0d000')}
    </PieChart>
  )
}

export default PieChartWithNeedle
