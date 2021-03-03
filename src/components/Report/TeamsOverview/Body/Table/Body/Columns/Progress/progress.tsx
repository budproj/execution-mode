import { Flex, GridItem, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { SliderWithFilledTrack } from 'src/components/Base'
import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnProgressProperties {
  team?: Team
}

const TeamsOverviewBodyTableBodyColumnProgress = ({
  team,
}: TeamsOverviewBodyTableBodyColumnProgressProperties) => {
  const intl = useIntl()

  const isLoaded = Boolean(team)
  const progress = team?.status?.progress ?? 0

  return (
    <GridItem>
      <Flex gridGap={4} alignItems="center">
        <Skeleton
          isLoaded={isLoaded}
          display="flex"
          alignItems="center"
          w="100%"
          h={isLoaded ? 'auto' : 2}
        >
          <SliderWithFilledTrack value={progress} trackThickness={2} />
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <Text color="black.600">
            {intl.formatNumber(Math.round(progress) / 100, { style: 'percent' })}
          </Text>
        </Skeleton>
      </Flex>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgress
