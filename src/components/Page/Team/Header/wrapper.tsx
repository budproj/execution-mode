import { Stack } from '@chakra-ui/layout'
import { SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Breadcrumb, PageTitle, SliderWithFilledTrack } from '../../../Base'
import { PageHeader } from '../../../Base/PageHeader/wrapper'
import { Team } from '../../../Team/types'

interface TeamHeaderProperties {
  team?: Team
  isLoaded: boolean
}

export const TeamHeader = ({ team, isLoaded }: TeamHeaderProperties) => {
  const intl = useIntl()
  const progress = team?.status.progress ?? 0
  const breadcrumbParameters = {
    id: team?.name ?? '',
  }

  return (
    <PageHeader pb={0}>
      <Breadcrumb routeParams={breadcrumbParameters} />
      <PageTitle>{team?.name}</PageTitle>

      <SkeletonText isLoaded={isLoaded}>
        <Text color="black.600" mt="2">
          {team?.description}
        </Text>
      </SkeletonText>

      <Stack direction="row" spacing="8" pt="4">
        <SliderWithFilledTrack value={progress} />
        <Text color="brand.500" fontWeight={700}>
          {intl.formatNumber(progress / 100, { style: 'percent' })}
        </Text>
      </Stack>
    </PageHeader>
  )
}
