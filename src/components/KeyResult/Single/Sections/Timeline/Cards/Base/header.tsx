import { Divider, Stack } from '@chakra-ui/react'
import React from 'react'

import { NamedAvatar } from 'src/components/User'

import { BORDER_COLOR } from '../CheckIn/constants'

export interface KeyResultSectionTimelineCardCommentHeaderProperties {
  userID?: string
  isLoaded?: boolean
  date?: Date
}

export const CardHeader = ({
  userID,
  isLoaded,
  date,
}: KeyResultSectionTimelineCardCommentHeaderProperties) => {
  isLoaded ??= true

  return (
    <Stack spacing={4}>
      <NamedAvatar
        showCard
        canHover
        userID={userID}
        isLoading={!isLoaded}
        date={date}
        subtitleType="date"
      />
      <Divider borderColor={BORDER_COLOR} />
    </Stack>
  )
}
