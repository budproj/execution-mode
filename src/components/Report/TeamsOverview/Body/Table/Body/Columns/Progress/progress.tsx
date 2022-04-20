import { Flex, GridItem, Text, Skeleton, Heading } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { IntlLink } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import SliderWithDetails from 'src/components/Base/SliderWithDetails'
import { useGetProjectedProgress } from 'src/components/Team/hooks'
import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnProgressProperties {
  team?: Team
  checkInDate?: Date
}

const TeamsOverviewBodyTableBodyColumnProgress = ({
  team,
  checkInDate,
}: TeamsOverviewBodyTableBodyColumnProgressProperties) => {
  const isLoaded = Boolean(team)
  const progress = team?.status?.progress ?? 0
  const { dateStart, dateEnd } = team?.tacticalCycle ?? {}
  const { percentualProjectedProgress } = useGetProjectedProgress({ dateStart, dateEnd })

  return (
    <GridItem>
      <Flex justifyContent="space-between">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 21)}>
          <IntlLink href={`/explore/${team?.id ?? ''}`}>
            <Heading as="h3" fontSize="lg" fontWeight={400} color="black.900">
              {team?.name}
            </Heading>
          </IntlLink>
        </Skeleton>

        <Text as="h3" fontSize="lg" fontWeight={700} color="brand.500">
          {progress.toFixed()}%
        </Text>
      </Flex>

      <SliderWithDetails
        value={progress}
        projectedProgress={percentualProjectedProgress}
        trackThickness={2}
        thumbWeight="5px"
        thumbHeight="17px"
        thumbPositionTop={0.5}
        showSliderDetails={false}
        showThumb={false}
        my={3}
        thumbColor="new-gray.600"
      />

      <LastUpdateText date={checkInDate} color="new-gray.500" fontSize="1rem" />
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgress
