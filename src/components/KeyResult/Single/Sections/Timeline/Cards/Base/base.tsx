import { Box, BoxProps, BorderProps, BackgroundProps, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { User } from 'src/components/User/types'
import { GraphQLEffect, GraphQLEntityPolicy } from 'src/components/types'

import { CardHeader } from './header'
import KeyResultSectionTimelineCardBaseOptions from './options'

export interface KeyResultSectionTimelineCardBaseProperties {
  children: ReactElement | ReactElement[]
  borderRadius: BorderProps['borderRadius']
  borderWidth: BorderProps['borderWidth']
  bg: BackgroundProps['bg']
  user?: User
  date?: string
  isLoaded?: boolean
  intlCardType?: string
  hideUser?: boolean
  borderBottomRadius?: BorderProps['borderBottomRadius']
  boxShadow?: BoxProps['boxShadow']
  policy?: GraphQLEntityPolicy
  onDelete?: () => void
}

const KeyResultSectionTimelineCardBase = ({
  children,
  user,
  date,
  isLoaded,
  hideUser,
  borderRadius,
  borderWidth,
  borderBottomRadius,
  boxShadow,
  bg,
  onDelete,
  policy,
  intlCardType,
}: KeyResultSectionTimelineCardBaseProperties) => (
  <Box
    p={4}
    bg={bg}
    borderWidth={borderWidth}
    borderColor="new-gray.200"
    boxShadow={boxShadow}
    borderRadius={borderRadius}
    borderBottomRadius={borderBottomRadius ?? borderRadius}
    position="relative"
  >
    {policy?.delete === GraphQLEffect.ALLOW && (
      <Box position="absolute" right={4} top={4}>
        <KeyResultSectionTimelineCardBaseOptions intlCardType={intlCardType} onDelete={onDelete} />
      </Box>
    )}

    <Stack spacing={3}>
      {!hideUser && (
        <CardHeader
          isLoaded={isLoaded}
          fullName={user?.fullName}
          picture={user?.picture}
          date={new Date(date ?? 0)}
        />
      )}

      {children}
    </Stack>
  </Box>
)

KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: 6,
  borderWidth: 1,
  boxShadow: 'with-stroke.medium',
  bg: 'white',
}

export default KeyResultSectionTimelineCardBase
