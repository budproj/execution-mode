import { Text, Flex, Divider } from '@chakra-ui/react'
import React from 'react'

import { AverageData } from 'src/components/Routine/RetrospectiveTab/RoutinesOverview'

import { AreaChartComponent, RadialChartComponent } from './index'

interface AreaRadialChartProperties {
  label: string
  areaStartColor?: string
  areaEndColor?: string
  strokeLineColor?: string
  progressColor: string
  numberColor: string
  highLightIndex: number
  icon?: JSX.Element
  data?: AverageData[]
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const AreaRadialChart = ({
  label,
  numberColor,
  progressColor,
  areaEndColor,
  areaStartColor,
  icon,
  strokeLineColor,
  highLightIndex,
  data,
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
          data={data}
          areaStartColor={areaStartColor}
          areaEndColor={areaEndColor}
          strokeLineColor={strokeLineColor}
          tooltipTitle={capitalizeFirstLetter(label)}
        />
        <Divider orientation="vertical" h="160px" marginLeft="30px" borderColor="new-gray.400" />

        <RadialChartComponent
          data={data?.[highLightIndex]?.average}
          icon={icon}
          numberColor={numberColor}
          progressColor={progressColor}
        />
      </Flex>
    </>
  )
}
