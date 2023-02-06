import { Skeleton, StatHelpText, Text } from '@chakra-ui/react'
import React, { ReactNode, useEffect } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInHelpTextProperties {
  createdAt?: KeyResultCheckIn['createdAt']
  user?: User
}

const KeyResultSectionTimelineCardCheckInHelpText = ({
  user,
  createdAt,
}: KeyResultSectionTimelineCardCheckInHelpTextProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate, setDate, relativeUnit] = useRelativeDate()

  const isLoaded = Boolean(user) && Boolean(createdAt)

  useEffect(() => {
    if (createdAt) {
      const createdAtDate = new Date(createdAt)
      setDate(createdAtDate)
    }
  }, [createdAt, setDate])

  return (
    <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 24)}>
      <StatHelpText fontSize="sm" color="gray.300" fontWeight={400} lineHeight={1}>
        {intl.formatMessage(messages.helperText, {
          author: user?.fullName,
          time: formattedRelativeDate?.toLowerCase(),
          unit: relativeUnit,
          highlight: (value: ReactNode) => (
            <Text as="span" fontWeight={700}>
              {value}
            </Text>
          ),
        })}
      </StatHelpText>
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardCheckInHelpText
