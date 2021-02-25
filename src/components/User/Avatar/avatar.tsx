import { Avatar, AvatarProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import ImageIcon from 'src/components/Icon/Image'

import messages from './messages'

const UserAvatar = (properties: AvatarProps) => {
  const intl = useIntl()

  return (
    <Avatar
      variant="square"
      icon={
        <ImageIcon
          title={intl.formatMessage(messages.imageIconTitle)}
          desc={intl.formatMessage(messages.imageIconDesc)}
          fill="brand.500"
        />
      }
      {...properties}
    />
  )
}

export default UserAvatar
