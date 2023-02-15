import { Heading, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactNode, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CompanyProgressOverviewBodyStampBase from 'src/components/Report/CompanyProgressOverview/Body/Stamps/Base'
import { Team } from 'src/components/Team/types'
import useValueSignal from 'src/state/hooks/useValueSignal'
import { SIGNAL } from 'src/state/hooks/useValueSignal/constants'
import { teamAtomFamily } from 'src/state/recoil/team'

import { ICON_COMPONENT_HASHMAP, ICON_DESC_HASHMAP } from './constants'
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

  const progress = Math.round(company?.tacticalCycle?.delta?.progress ?? 0)
  const [previousProgress, setProgress, signalAttributes] = useValueSignal(progress)

  const IconComponent = ICON_COMPONENT_HASHMAP[signalAttributes.signal]
  const iconDescMessage = ICON_DESC_HASHMAP[signalAttributes.signal]

  useEffect(() => {
    if (progress && progress !== previousProgress) setProgress(progress)
  }, [previousProgress, progress, setProgress])

  return (
    <CompanyProgressOverviewBodyStampBase
      icon={
        <IconComponent
          desc={intl.formatMessage(iconDescMessage)}
          fontSize="4xl"
          fill={`${signalAttributes.colorScheme}.500`}
          stroke={`${signalAttributes.colorScheme}.500`}
        />
      }
      iconBorderColor={`${signalAttributes.colorScheme}.100`}
      iconBgColor={signalAttributes.signal === SIGNAL.NEGATIVE ? 'red.50' : 'transparent'}
    >
      <Skeleton isLoaded={!isLoading} {...buildSkeletonMinSize(!isLoading, 150, 21)}>
        <Heading as="h3" fontSize="md" fontWeight={500}>
          {intl.formatMessage(messages.titleLabel, {
            progress: Math.abs(progress),
            signal: signalAttributes.indicator,
            highlight: (value: ReactNode) => (
              <Text color={`${signalAttributes.colorScheme}.500`} display="inline" as="span">
                {value}
              </Text>
            ),
          })}
        </Heading>
      </Skeleton>

      <Text fontSize="xs" fontWeight={500} color="gray.300">
        {intl.formatMessage(messages.descriptionText)}
      </Text>
    </CompanyProgressOverviewBodyStampBase>
  )
}

export default CompanyProgressOverviewBodyStampProgressIncrease
