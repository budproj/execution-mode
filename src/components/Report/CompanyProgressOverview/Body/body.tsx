import { Flex } from '@chakra-ui/react'
import React from 'react'

import { Company } from 'src/components/Company/types'

import CompanyProgressOverviewBodyStampCompany from './Stamps/Company'
import CompanyProgressOverviewBodyStampProgressIncrease from './Stamps/ProgressIncrease'

export interface CompanyProgressOverviewBodyProperties {
  companyID?: Company['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBody = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyProperties) => (
  <Flex p={6} gridGap={20}>
    <CompanyProgressOverviewBodyStampCompany companyID={companyID} isLoading={isLoading} />
    <CompanyProgressOverviewBodyStampProgressIncrease companyID={companyID} isLoading={isLoading} />
  </Flex>
)

export default CompanyProgressOverviewBody
