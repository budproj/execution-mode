import { Box, Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Company } from 'src/components/Company/types'

import messages from './messages'

export interface CompanyProgressOverviewHeaderProperties {
  companyName?: Company['name']
  companyGender?: Company['gender']
  isLoading?: boolean
}

const CompanyProgressOverviewHeader = ({
  companyName,
  companyGender,
  isLoading,
}: CompanyProgressOverviewHeaderProperties) => {
  const intl = useIntl()

  return (
    <Box p={6} borderBottomWidth={1} borderColor="blue.50">
      <Skeleton isLoaded={!isLoading} maxW={isLoading ? '45%' : 'auto'}>
        <Heading as="h2" fontSize="xl">
          {intl.formatMessage(messages.title, {
            gender: companyGender,
            company: companyName,
            highlighted: (string) => (
              <Text color="brand.400" display="inline">
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
