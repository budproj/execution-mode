import { Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import OverviewHeaderBox from 'src/components/Report/Overview/OverviewHeaderBox'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface ObjectivesOverviewHeaderProperties {
  teamID?: Team['id']
}

const ObjectivesOverviewHeader = ({ teamID }: ObjectivesOverviewHeaderProperties) => {
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(teamID))

  const isLoaded = Boolean(teamID)

  return (
    <OverviewHeaderBox>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 300, 24)}>
        <Heading as="h2" fontSize="xl">
          {intl.formatMessage(messages.title, {
            gender: team?.gender,
            team: team?.name,
          })}
        </Heading>
      </Skeleton>
    </OverviewHeaderBox>
  )
}

export default ObjectivesOverviewHeader
