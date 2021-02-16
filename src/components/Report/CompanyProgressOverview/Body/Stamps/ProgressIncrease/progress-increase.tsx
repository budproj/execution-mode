import { Heading, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import ArrowDownIcon from 'src/components/Icon/ArrowDown'
import ArrowUpIcon from 'src/components/Icon/ArrowUp'
import LineIcon from 'src/components/Icon/Line'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import { SIGNAL } from './constants'
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

  const progress = Math.round(company?.progressIncreaseSinceLastCheckInEvent ?? 0)
  const signalIndicator = {
    [SIGNAL.POSITIVE]: '+',
    [SIGNAL.NEGATIVE]: '-',
    [SIGNAL.NEUTRAL]: '',
  }
  const colorSchemes = {
    [SIGNAL.POSITIVE]: 'green',
    [SIGNAL.NEGATIVE]: 'red',
    [SIGNAL.NEUTRAL]: 'gray',
  }
  const iconComponents = {
    [SIGNAL.POSITIVE]: ArrowUpIcon,
    [SIGNAL.NEGATIVE]: ArrowDownIcon,
    [SIGNAL.NEUTRAL]: LineIcon,
  }
  const iconDescMessages = {
    [SIGNAL.POSITIVE]: messages.arrowUpIconDesc,
    [SIGNAL.NEGATIVE]: messages.arrowDownIconDesc,
    [SIGNAL.NEUTRAL]: messages.lineIconDesc,
  }

  const isPositiveProgress = progress > 0
  const isNegativeProgress = progress < 0
  const signal =
    isPositiveProgress || isLoading
      ? SIGNAL.POSITIVE
      : isNegativeProgress
      ? SIGNAL.NEGATIVE
      : SIGNAL.NEUTRAL

  const colorScheme = colorSchemes[signal]
  const IconComponent = iconComponents[signal]
  const iconDescMessage = iconDescMessages[signal]

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={
        <IconComponent
          desc={intl.formatMessage(iconDescMessage)}
          fontSize="4xl"
          fill={`${colorScheme}.500`}
          stroke={`${colorScheme}.500`}
        />
      }
      iconVariant="outlined"
      iconBorderColor={`${colorScheme}.200`}
    >
      <Skeleton isLoaded={!isLoading} {...buildSkeletonMinSize(!isLoading, 150, 21)}>
        <Heading as="h3" fontSize="md" fontWeight={500}>
          {intl.formatMessage(messages.titleLabel, {
            progress: Math.abs(progress),
            signal: signalIndicator[signal],
            highlight: (string) => (
              <Text color={`${colorScheme}.500`} display="inline" as="span">
                {string}
              </Text>
            ),
          })}
        </Heading>
      </Skeleton>

      <Text fontSize="xs" fontWeight={500} color="gray.400">
        {intl.formatMessage(messages.descriptionText)}
      </Text>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampProgressIncrease
