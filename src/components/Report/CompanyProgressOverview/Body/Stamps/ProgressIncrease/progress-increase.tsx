import { Heading, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import ArrowUpIcon from 'src/components/Icon/ArrowUp'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface CompanyProgressOverviewBodyStampProgressIncreaseProperties {
  companyID?: Team['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBodyStampProgressIncrease = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyStampProgressIncreaseProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(teamAtomFamily(companyID))

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={
        <ArrowUpIcon
          desc={intl.formatMessage(messages.arrowUpIconDesc)}
          fontSize="4xl"
          fill="green.500"
          stroke="green.500"
        />
      }
      iconVariant="outlined"
      iconBorderColor="green.200"
    >
      <Skeleton isLoaded={!isLoading} {...buildSkeletonMinSize(!isLoading, 150, 21)}>
        <Heading as="h3" fontSize="md">
          {intl.formatMessage(messages.titleLabel, {
            progress: Math.round(company?.percentageProgressIncrease ?? 0),
            highlight: (string) => (
              <Text color="green.500" display="inline" as="span">
                {string}
              </Text>
            ),
          })}
        </Heading>
      </Skeleton>

      <Text fontSize="xs" color="gray.300">
        {intl.formatMessage(messages.descriptionText)}
      </Text>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampProgressIncrease
