import { Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { Company } from 'src/components/Company/types'
import CrownIcon from 'src/components/Icon/Crown'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { companyAtomFamily } from 'src/state/recoil/company'

import messages from './messages'

export interface CompanyProgressOverviewBodyStampCompanyProperties {
  companyID?: Company['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBodyStampCompany = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyStampCompanyProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(companyAtomFamily(companyID))
  const latestReport = company?.latestReport

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={<CrownIcon desc={intl.formatMessage(messages.crownIconDesc)} fontSize="40px" />}
    >
      <Skeleton
        isLoaded={!isLoading}
        minH={isLoading ? '21px' : 'auto'}
        minW={isLoading ? '150px' : 'auto'}
      >
        <Heading as="h3" fontSize="18px">
          {company?.name}
        </Heading>
      </Skeleton>

      <Skeleton
        isLoaded={!isLoading}
        minH={isLoading ? '20px' : 'auto'}
        minW={isLoading ? '310px' : 'auto'}
      >
        <LastUpdateText date={latestReport?.createdAt} author={latestReport?.user?.name} />
      </Skeleton>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampCompany
