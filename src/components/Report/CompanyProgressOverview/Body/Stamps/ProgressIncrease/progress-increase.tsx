import { Heading, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Company } from 'src/components/Company/types'
import ArrowUpIcon from 'src/components/Icon/ArrowUp'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { companyAtomFamily } from 'src/state/recoil/company'

import messages from './messages'

export interface CompanyProgressOverviewBodyStampProgressIncreaseProperties {
  companyID?: Company['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBodyStampProgressIncrease = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyStampProgressIncreaseProperties) => {
  const intl = useIntl()
  const company = useRecoilValue(companyAtomFamily(companyID))

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={
        <ArrowUpIcon
          desc={intl.formatMessage(messages.arrowUpIconDesc)}
          fontSize="32px"
          fill="green.500"
          stroke="green.500"
        />
      }
      iconVariant="outlined"
      iconBorderColor="green.200"
    >
      <Skeleton
        isLoaded={!isLoading}
        h={isLoading ? '21px' : 'auto'}
        w={isLoading ? '150px' : 'auto'}
      >
        <Heading as="h3" fontSize="18px">
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

      <Text fontSize="13px" color="gray.300">
        {intl.formatMessage(messages.descriptionText)}
      </Text>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampProgressIncrease
