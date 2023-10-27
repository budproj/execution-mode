import { Box, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import { DynamicAvatarGroup, PageTitle } from '../../../Base'
import { PageHeader } from '../../../Base/PageHeader/wrapper'
import { Team } from '../../../Team/types'

interface TeamHeaderProperties {
  team?: Team
  isLoaded: boolean
  // ShowProgress?: boolean
  users?: User[]
  teamOwnerId?: string
}

export const TeamHeader = ({
  team,
  isLoaded,
  // ShowProgress = true,
  users,
  teamOwnerId,
}: TeamHeaderProperties) => {
  // Const intl = useIntl()
  // const progress = team?.status.progress ?? 0

  return (
    <PageHeader pb={0} flexGrow={1}>
      <Box>
        <PageTitle>{team?.name}</PageTitle>
      </Box>
      <SkeletonText isLoaded={isLoaded}>
        <Text color="black.600" mt="18px">
          {team?.description}
        </Text>
      </SkeletonText>
      <Box marginTop="18px">
        <DynamicAvatarGroup
          isFromTeamPage
          teamOwnerId={teamOwnerId}
          max={10}
          users={users}
          isLoaded={isLoaded}
        />
      </Box>

      {/* <Stack direction="row" spacing="8" pt="4" alignItems="center" opacity={showProgress ? 1 : 0}>
        <Skeleton isLoaded={isLoaded} w="full" pb={isLoaded ? '2' : 0}>
          <SliderWithFilledTrack value={progress} />
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <Text color="brand.500" fontWeight={700}>
            {intl.formatNumber(progress / 100, { style: 'percent' })}
          </Text>
        </Skeleton>
      </Stack> */}
    </PageHeader>
  )
}
