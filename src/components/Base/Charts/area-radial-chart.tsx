import { Text, Flex, Divider } from '@chakra-ui/react'
import React from 'react'

import { AreaChartComponent, PieChartComponent } from './index'

interface AreaRadialChartProperties {
  label: string
  areaStartColor?: string
  areaEndColor?: string
  strokeLineColor?: string
  progressColor: string
  numberColor: string
  icon?: JSX.Element
}

export const AreaRadialChart = ({
  label,
  numberColor,
  progressColor,
  areaEndColor,
  areaStartColor,
  icon,
  strokeLineColor,
}: AreaRadialChartProperties) => {
  return (
    <>
      <Text
        marginBottom="5px"
        color="new-gray.700"
        fontSize="12px"
        fontWeight="700"
        borderRadius="6.84397px"
      >
        {label}
      </Text>
      <Flex
        background="new-gray.50"
        paddingX="18px"
        justifyContent="center"
        alignItems="center"
        marginBottom="40px"
        // Height="200px"
      >
        <AreaChartComponent
          areaStartColor={areaStartColor}
          areaEndColor={areaEndColor}
          strokeLineColor={strokeLineColor}
        />
        <Divider orientation="vertical" h="160px" marginLeft="30px" borderColor="new-gray.400" />

        <PieChartComponent icon={icon} numberColor={numberColor} progressColor={progressColor} />
      </Flex>
    </>
  )
}
