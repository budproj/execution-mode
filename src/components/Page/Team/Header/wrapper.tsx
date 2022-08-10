import { Box, Stack, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageTitle, SliderWithFilledTrack } from '../../../Base'
import { PageHeader } from '../../../Base/PageHeader/wrapper'
import { Team } from '../../../Team/types'

interface TeamHeaderProperties {
  team?: Team
  isLoaded: boolean
  showProgress?: boolean
}

export const TeamHeader = ({ team, isLoaded, showProgress = true }: TeamHeaderProperties) => {
  const intl = useIntl()
  const progress = team?.status.progress ?? 0

  return (
    <PageHeader pb={0} flexGrow={1}>
      <Box>
        <PageTitle>{team?.name}</PageTitle>
      </Box>

      <SkeletonText isLoaded={isLoaded}>
        <Text color="black.600" mt="2">
          {team?.description}
        </Text>
      </SkeletonText>

      {showProgress && (
        <Stack direction="row" spacing="8" pt="4" alignItems="center">
          <Skeleton isLoaded={isLoaded} w="full" pb={isLoaded ? '2' : 0}>
            <SliderWithFilledTrack value={progress} />
          </Skeleton>

          <Skeleton isLoaded={isLoaded}>
            <Text color="brand.500" fontWeight={700}>
              {intl.formatNumber(progress / 100, { style: 'percent' })}
            </Text>
          </Skeleton>
        </Stack>
      )}
    </PageHeader>
  )
}
