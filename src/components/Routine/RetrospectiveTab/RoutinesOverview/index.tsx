/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable prefer-const */
import { Box, Divider, Flex, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import MountainIcon from 'src/components/Icon/Mountain'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'

import { AreaRadialChart } from '../../../Base/Charts/index'

interface RoutinesOverviewProperties {
  answers: Array<{
    id: number
    user: string
    feeling: number
    createdAt: string
    comments: number
  }>
}

const RoutinesOverview = ({ answers }: RoutinesOverviewProperties) => {
  const intl = useIntl()
  const { getEmoji } = useGetEmoji()

  return (
    <GridItem marginTop="31px" paddingX="30px">
      <Box>
        <Flex>
          <Text color="new-gray.900" fontSize="28px" fontWeight="500">
            Visão geral do time
          </Text>
          <Box marginLeft="auto" textAlign="right">
            <Text color="new-gray.800" fontSize="18px" fontWeight="500">
              Semana 29
            </Text>
            <Text color="new-gray.600" fontSize="16px" fontWeight="450">
              18/jul a 24/jul
            </Text>
          </Box>
        </Flex>

        <Divider marginY="13px" borderColor="new-gray.400" />

        <AreaRadialChart
          label="SENTIMENTO"
          areaStartColor="#FFD964E5"
          areaEndColor="#FFD964E5"
          strokeLineColor="#F1BF25"
          icon={getEmoji({ felling: 5, size: '50px' })}
          numberColor="#ffc658"
          progressColor="#ffc658"
        />
        <AreaRadialChart
          label="PRODUTIVIDADE"
          strokeLineColor="#4BACF9"
          areaEndColor="#4BACF9B2"
          areaStartColor="#4BACF9B2"
          icon={
            <Flex
              background="#4BACF9"
              width="50px"
              height="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <SuitcaseIcon boxSize="23px" desc="mudar" />
            </Flex>
          }
          numberColor="#4BACF9"
          progressColor="#4BACF9"
        />
        <AreaRadialChart
          label="CLAREZA DE ESTRATÉGIA"
          areaStartColor="#6F6EFF"
          areaEndColor="#8C8BFF26"
          strokeLineColor="#6F6EFF"
          icon={
            <Flex
              background="#6F6EFF"
              width="50px"
              height="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <MountainIcon boxSize="23px" desc="mudar" />
            </Flex>
          }
          numberColor="#6F6EFF"
          progressColor="#6F6EFF"
        />
      </Box>
    </GridItem>
  )
}

export default RoutinesOverview
