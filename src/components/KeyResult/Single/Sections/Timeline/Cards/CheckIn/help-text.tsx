import { Skeleton, StatHelpText, Text } from '@chakra-ui/react'
import React from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

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

  const isLoaded = Boolean(user) && Boolean(createdAt)
  const hourDateOptions: FormatDateOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }

  return (
    <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 24)}>
      <StatHelpText fontSize="16px" color="gray.300" fontWeight={400} lineHeight={1}>
        {intl.formatMessage(messages.helperText, {
          author: user?.fullName,
          hour: intl.formatDate(createdAt, hourDateOptions),
          highlight: (string) => (
            <Text as="span" fontWeight={700}>
              {string}
            </Text>
          ),
        })}
      </StatHelpText>
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardCheckInHelpText
