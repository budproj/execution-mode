import { Box, Divider, Flex, Heading, Text, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import CommentFeedbackTag, {
  borderColor,
  backgroundColor,
} from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Comment/Feedbacks/Tag'
import { COMMENT_TYPE, KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const StyledBox = styled(Box)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
`

const KrFeedback = ({ properties, timestamp, isRead }: Notification) => {
  const intl = useIntl()
  // Usando as unknown as COMMENT_TYPE para desacoplar a responsabilidade do micro-serviço de notificações
  const [borderColorToken] = useToken('colors', [
    borderColor.get(properties.comment?.type as unknown as COMMENT_TYPE) ?? '',
  ])

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const openDrawer = () => setOpenDrawer(properties.keyResult?.id)

  return (
    <BaseCardNotification
      sender={properties.sender}
      timestamp={timestamp}
      isRead={isRead}
      badgeIcon={NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR}
      handleClick={openDrawer}
      type={NOTIFICATIONS_TYPE.KR_FEEDBACK}
      describeBadgeAvatarIcon={messages.describeNotification}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {intl.formatMessage(messages.describeNotification)}
          </Text>
          <Flex marginTop="8px" marginBottom="12px">
            <KeyResultDynamicIcon
              mode={KEY_RESULT_MODE.DRAFT}
              boxSize="30px"
              iconSize="20px"
              title={properties.keyResult?.name}
            />
            <Text marginLeft="8px" fontWeight={700} fontSize={14} color="new-gray.800">
              {properties.keyResult?.name}
            </Text>
          </Flex>
          <Divider />
          <CommentFeedbackTag
            marginTop="8px"
            type={properties.comment?.type as unknown as COMMENT_TYPE}
            borderColor={borderColorToken}
            backgroundColor={backgroundColor.get(
              properties.comment?.type as unknown as COMMENT_TYPE,
            )}
            borderWidth={1}
            borderRadius="10px"
            p="3px 8px"
          />
          <StyledBox
            overflow="hidden"
            textOverflow="ellipsis"
            marginTop="8px"
            fontSize={14}
            fontWeight="400"
            color="new-gray.900"
          >
            {properties.comment?.content}
          </StyledBox>
        </Box>
      </Heading>
    </BaseCardNotification>
  )
}

export default KrFeedback
