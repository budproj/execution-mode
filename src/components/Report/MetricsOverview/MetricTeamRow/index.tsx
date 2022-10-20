import { Flex, Text, Divider } from '@chakra-ui/react'
import React from 'react'

import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { Team } from 'src/components/Team/types'

interface MetricTeamRowProperties {
  team?: Partial<Team>
}

const MetricTeamRow = ({ team }: MetricTeamRowProperties) => {
  const { getEmoji } = useGetEmoji()

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingTop="15px"
        paddingBottom="15px"
      >
        <Text color="new-gray.900">{team?.name}</Text>
        <Flex gap="20px">
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="5px"
          >
            {getEmoji({ felling: 5, size: '20px' })} 4.5
          </Text>
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="5px"
          >
            <Flex
              background="#4BACF9"
              width="20px"
              height="20px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <SuitcaseIcon
                boxSize="10px"
                desc="Ícone de maleta representando o índice de produtividade"
              />
            </Flex>
            4.5
          </Text>
          <Text
            alignItems="center"
            fontWeight="700"
            fontSize="16px"
            color="yellow.600"
            display="flex"
            gap="2px"
          >
            <Flex
              background="transparent"
              width="30px"
              height="30px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <PauseIcon
                boxSize="25px"
                stroke="white"
                desc="Ícone de pausa representando a quantidade de OKRs com barreiras que a empresa tem"
              />
            </Flex>
            2
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default MetricTeamRow
