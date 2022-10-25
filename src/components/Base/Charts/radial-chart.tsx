import { Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import messages from './messages'

interface CustomizedPieTextProperties {
  numberColor: string
  icon?: JSX.Element
  data?: number
  size?: 'sm' | 'lg'
  title?: string
  percentage?: boolean
}

const CustomizedPieText = ({
  numberColor,
  icon,
  data,
  size = 'lg',
  title,
  percentage,
}: CustomizedPieTextProperties) => {
  const intl = useIntl()
  return (
    <>
      {size === 'sm' && (
        <Text
          position="absolute"
          top="21"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          fontWeight={500}
          fontSize={14}
          color="new-gray.800"
        >
          {title}
        </Text>
      )}
      <Flex position="absolute" top={size === 'lg' ? 90 : 61} left={size === 'lg' ? 125 : 75}>
        {icon}
      </Flex>
      <Flex
        flexDirection="column"
        position="absolute"
        // Top={size === 'lg' ? 130 : 71}
        // Left={size === 'lg' ? 95 : 77}
        textAlign="center"
        left="50%"
        bottom="-2"
        transform="translate(-50%, -50%)"
      >
        <Text
          marginTop="21px"
          fontSize="19px"
          fontWeight={size === 'lg' ? '500' : '700'}
          color={numberColor}
        >
          {data && percentage ? `${data}%` : data}
        </Text>
        {size === 'lg' && (
          <Text marginTop="10px" color="new-gray.500" fontWeight="450">
            {intl.formatMessage(messages.weekMean)}
          </Text>
        )}
      </Flex>
      {size === 'lg' && (
        <>
          <Text color="new-gray.600" position="absolute" top={160} left={size === 'lg' ? 67 : 90}>
            1
          </Text>
          <Text color="new-gray.600" position="absolute" top={160} left={size === 'lg' ? 227 : 205}>
            5
          </Text>
        </>
      )}
    </>
  )
}

interface RadialChartProperties {
  progressColor: string
  numberColor: string
  icon?: JSX.Element
  data?: number
  size?: 'sm' | 'lg'
  title?: string
  percentage?: boolean
}

export const RadialChartComponent = ({
  progressColor = '#ffc658',
  numberColor = 'yellow.600',
  icon,
  data,
  size = 'lg',
  title,
  percentage,
}: RadialChartProperties) => {
  const radiaChartData = [
    {
      name: 'base',
      pv: percentage ? 100 : 5,
      opacity: 0,
    },
    {
      name: 'unknow',
      pv: data ?? 0,
    },
  ]

  return (
    <Box position="relative">
      <ResponsiveContainer width={size === 'lg' ? 300 : 180} height={size === 'lg' ? 250 : 140}>
        <RadialBarChart
          cx={size === 'lg' ? 150 : 90}
          cy={size === 'lg' ? 150 : 81}
          innerRadius={size === 'lg' ? '40%' : '1%'}
          outerRadius="100%"
          barSize={size === 'lg' ? 15 : 8}
          startAngle={size === 'lg' ? 180 : 190}
          endAngle={size === 'lg' ? 0 : -10}
          data={radiaChartData}
        >
          <RadialBar background cornerRadius={30} dataKey="pv" fill={progressColor} />
        </RadialBarChart>
      </ResponsiveContainer>

      <CustomizedPieText
        title={title}
        size={size}
        data={50}
        icon={icon}
        numberColor={numberColor}
        percentage={percentage}
      />
    </Box>
  )
}
