import {
  Box,
  BoxProps,
  BorderProps,
  BackgroundProps,
  Stack,
  StyleProps,
  Divider,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import { COMMENT_TYPE, KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { User } from 'src/components/User/types'
import { GraphQLEffect, GraphQLEntityPolicy } from 'src/components/types'
import meAtom from 'src/state/recoil/user/me'

import commentsCardMessages from '../Comment/messages'

import { CardHeader } from './header'
import KeyResultSectionTimelineCardBaseOptions from './options'

export interface KeyResultSectionTimelineCardBaseProperties extends StyleProps {
  children: ReactElement | ReactElement[]
  borderRadius: BorderProps['borderRadius']
  borderWidth: BorderProps['borderWidth']
  bg: BackgroundProps['bg']
  user?: User
  keyResultMode?: KEY_RESULT_MODE
  commentType?: COMMENT_TYPE
  date?: string
  isLoaded?: boolean
  isSubcomment?: boolean
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
  keyResultMode,
  commentType = COMMENT_TYPE.COMMENT,
  borderBottomRadius,
  isSubcomment,
  boxShadow,
  bg,
  onDelete,
  policy,
  intlCardType,
  ...rest
}: KeyResultSectionTimelineCardBaseProperties) => {
  const myID = useRecoilValue(meAtom)
  const intl = useIntl()

  const allowDelete =
    intlCardType === intl.formatMessage(commentsCardMessages.cardType)
      ? policy?.delete === GraphQLEffect.ALLOW &&
        (keyResultMode === KEY_RESULT_MODE.DRAFT ||
          (keyResultMode === KEY_RESULT_MODE.PUBLISHED &&
            commentType === COMMENT_TYPE.COMMENT &&
            !isSubcomment))
      : policy?.delete === GraphQLEffect.ALLOW

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
      {...rest}
    >
      {allowDelete && (
        <Box position="absolute" right={4} top={4}>
          <KeyResultSectionTimelineCardBaseOptions
            intlCardType={intlCardType}
            onDelete={onDelete}
          />
        </Box>
      )}

      <Stack spacing={3}>
        {!hideUser && (
          <Box>
            <IntlLink href={user?.id === myID ? '/my-things' : `/profile/${user?.id ?? ''}`}>
              <CardHeader isLoaded={isLoaded} userID={user?.id} date={new Date(date ?? 0)} />
            </IntlLink>
            <Divider />
          </Box>
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
