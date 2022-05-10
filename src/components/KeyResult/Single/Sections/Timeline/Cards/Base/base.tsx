import { Box, BoxProps, BorderProps, BackgroundProps, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import { GraphQLEffect, GraphQLEntityPolicy } from 'src/components/types'

import { CardHeader } from './header'
import KeyResultSectionTimelineCardBaseOptions from './options'
import { IntlLink } from 'src/components/Base'
import meAtom from 'src/state/recoil/user/me'

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
}: KeyResultSectionTimelineCardBaseProperties) => {
  const myID = useRecoilValue(meAtom)

  return (
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
          <KeyResultSectionTimelineCardBaseOptions
            intlCardType={intlCardType}
            onDelete={onDelete}
          />
        </Box>
      )}

      <Stack spacing={3}>
        {!hideUser && (
          <IntlLink href={user?.id !== myID ? `/profile/${user?.id}` : `/settings/my-profile`}>
            <CardHeader isLoaded={isLoaded} userID={user?.id} date={new Date(date ?? 0)} />
          </IntlLink>
        )}
        {children}
      </Stack>
    </Box>
  )
}
KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: 6,
  borderWidth: 1,
  boxShadow: 'with-stroke.medium',
  bg: 'white',
}

export default KeyResultSectionTimelineCardBase
