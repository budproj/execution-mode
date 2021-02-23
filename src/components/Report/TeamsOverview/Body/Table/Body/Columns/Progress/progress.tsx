import { Flex, GridItem, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { SliderWithFilledTrack } from 'src/components/Base'
import { Team } from 'src/components/Team/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface TeamsOverviewBodyTableBodyColumnProgressProperties {
  team?: Team
}

const TeamsOverviewBodyTableBodyColumnProgress = ({
  team,
}: TeamsOverviewBodyTableBodyColumnProgressProperties) => {
  const [confidenceTag, setConfidence] = useConfidenceTag(team?.status?.confidence)
  const intl = useIntl()

  const isLoaded = Boolean(team)
  const progress = team?.status?.progress ?? 0

  useEffect(() => {
    if ((team && Boolean(team?.status?.confidence)) || team?.status?.confidence === 0)
      setConfidence(team.status.confidence)
  }, [team, setConfidence])

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
          <SliderWithFilledTrack
            trackColor={confidenceTag.color.primary}
            value={progress}
            trackThickness={2}
          />
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <Text color="gray.600">
            {intl.formatNumber(Math.round(progress) / 100, { style: 'percent' })}
          </Text>
        </Skeleton>
      </Flex>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnProgress
