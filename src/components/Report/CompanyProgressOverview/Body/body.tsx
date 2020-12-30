import { Box } from '@chakra-ui/react'
import React from 'react'

import { Company } from 'src/components/Company/types'

import CompanyProgressOverviewBodyStampCompany from './Stamps/Company'

export interface CompanyProgressOverviewBodyProperties {
  companyID?: Company['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBody = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyProperties) => (
  <Box p={6}>
    <CompanyProgressOverviewBodyStampCompany companyID={companyID} isLoading={isLoading} />
  </Box>
)

export default CompanyProgressOverviewBody
