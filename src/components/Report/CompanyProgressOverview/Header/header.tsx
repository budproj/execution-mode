import { Heading, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
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
      <Skeleton isLoaded={!isLoading} {...buildSkeletonMinSize(!isLoading, 400, 24)}>
        <Heading as="h2" fontSize="xl" color="black.900">
          {intl.formatMessage(messages.title, {
            gender: company?.gender,
            company: company?.name,
            highlight: (value: ReactNode) => (
              <Text color="brand.500" display="inline" as="span">
                {value}
              </Text>
            ),
          })}
        </Heading>
      </Skeleton>
    </OverviewHeaderBox>
  )
}

export default CompanyProgressOverviewHeader
