import { Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import messages from './messages'

interface CustomizedPieTextProperties {
  numberColor: string
  icon?: JSX.Element
  data?: number
}

const CustomizedPieText = ({ numberColor, icon, data }: CustomizedPieTextProperties) => {
  const intl = useIntl()
  return (
    <>
      <Flex position="absolute" top={90} left={125}>
        {icon}
      </Flex>
      <Flex flexDirection="column" position="absolute" top={130} left={95} textAlign="center">
        <Text marginTop="21px" fontSize="19px" fontWeight="500" color={numberColor}>
          {data}
        </Text>
        <Text marginTop="10px" color="new-gray.500" fontWeight="450">
          {intl.formatMessage(messages.weekMean)}
        </Text>
      </Flex>
      <Text color="new-gray.600" position="absolute" top={160} left={67}>
        1
      </Text>
      <Text color="new-gray.600" position="absolute" top={160} left={227}>
        5
      </Text>
    </>
  )
}

interface RadialChartProperties {
  progressColor: string
  numberColor: string
  icon?: JSX.Element
  data?: number
}

export const RadialChartComponent = ({
  progressColor = '#ffc658',
  numberColor = 'yellow.600',
  icon,
  data,
}: RadialChartProperties) => {
  const radiaChartData = [
    {
      name: 'base',
      pv: 5,
      opacity: 0,
    },
    {
      name: 'unknow',
      pv: data ?? 0,
    },
  ]

  return (
    <Box position="relative">
      <ResponsiveContainer minWidth={300} height={240}>
        <RadialBarChart
          cx={150}
          cy={150}
          innerRadius="40%"
          outerRadius="100%"
          barSize={15}
          startAngle={180}
          endAngle={0}
          data={radiaChartData}
        >
          <RadialBar background cornerRadius={30} dataKey="pv" fill={progressColor} />
        </RadialBarChart>
      </ResponsiveContainer>
      <CustomizedPieText data={data} icon={icon} numberColor={numberColor} />
    </Box>
  )
}
