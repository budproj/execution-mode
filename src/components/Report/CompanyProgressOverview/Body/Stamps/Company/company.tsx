import { Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import CrownIcon from 'src/components/Icon/Crown'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface CompanyProgressOverviewBodyStampCompanyProperties {
  companyID?: Team['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBodyStampCompany = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyStampCompanyProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(teamAtomFamily(companyID))
  const latestReport = company?.latestReport

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={<CrownIcon desc={intl.formatMessage(messages.crownIconDesc)} fontSize="40px" />}
    >
      <Skeleton
        isLoaded={!isLoading}
        h={isLoading ? '21px' : 'auto'}
        w={isLoading ? '150px' : 'auto'}
      >
        <Heading as="h3" fontSize="18px">
          {company?.name}
        </Heading>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} {...buildSkeletonMinSize(!isLoading, 310, 20)}>
        <LastUpdateText
          date={new Date(latestReport?.createdAt ?? '')}
          author={latestReport?.user?.fullName}
        />
      </Skeleton>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampCompany
