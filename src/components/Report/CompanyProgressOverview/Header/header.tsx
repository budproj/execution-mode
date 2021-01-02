import { Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import OverviewHeaderBox from 'src/components/Report/Overview/OverviewHeaderBox'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface CompanyProgressOverviewHeaderProperties {
  companyID?: Team['id']
  isLoading?: boolean
}

const CompanyProgressOverviewHeader = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewHeaderProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(teamAtomFamily(companyID))

  return (
    <OverviewHeaderBox>
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
    </OverviewHeaderBox>
  )
}

export default CompanyProgressOverviewHeader
