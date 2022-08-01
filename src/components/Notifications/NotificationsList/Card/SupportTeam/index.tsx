import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'
import { KeyResultNotificationContent } from '../Base/KeyResult'

import messages from './messages'

const SupportTeam = ({ properties, isRead, timestamp }: Notification) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const openDrawer = () => setOpenDrawer(properties.keyResult?.id)

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={messages.supportTeamNotification}
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      badgeIcon={NOTIFICATIONS_TYPE.ADD_SUPPORT_TEAM}
      handleClick={openDrawer}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender?.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {intl.formatMessage(messages.supportTeamNotification)}
          </Text>
        </Box>
      </Heading>
      <KeyResultNotificationContent keyResultTitle={properties.keyResult?.name} />
    </BaseCardNotification>
  )
}

export default SupportTeam
