import { Box, Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Company } from 'src/components/Company/types'
import { companyAtomFamily } from 'src/state/recoil/company'

import messages from './messages'

export interface CompanyProgressOverviewHeaderProperties {
  companyID?: Company['id']
  isLoading?: boolean
}

const CompanyProgressOverviewHeader = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewHeaderProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(companyAtomFamily(companyID))

  return (
    <Box p={6} borderBottomWidth={1} borderColor="blue.100">
      <Skeleton isLoaded={!isLoading} maxW={isLoading ? '45%' : 'auto'}>
        <Heading as="h2" fontSize="xl">
          {intl.formatMessage(messages.title, {
            gender: company?.gender,
            company: company?.name,
            highlight: (string) => (
              <Text color="brand.400" display="inline" as="span">
                {string}
              </Text>
            ),
          })}
        </Heading>
      </Skeleton>
    </Box>
  )
}

export default CompanyProgressOverviewHeader
