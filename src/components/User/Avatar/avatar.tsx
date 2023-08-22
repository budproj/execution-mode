import { Avatar, AvatarProps, Flex, Text, useTheme } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import ImageIcon from 'src/components/Icon/Image'

import messages from './messages'

export interface UserAvatarProperties extends AvatarProps {
  bottomText?: string
  variantAvatar?: AvatarProps['variant']
}

const UserAvatar = ({ bottomText, variantAvatar = 'square', ...rest }: UserAvatarProperties) => {
  const intl = useIntl()
  const { colors } = useTheme()
  const blackShadeColor: string = colors.black[600]

  return (
    <Avatar
      variant={variantAvatar}
      icon={
        <ImageIcon
          title={intl.formatMessage(messages.imageIconTitle)}
          desc={intl.formatMessage(messages.imageIconDesc)}
          fill="brand.500"
        />
      }
      {...rest}
    >
      {bottomText && (
        <Flex
          w="full"
          h="30%"
          position="absolute"
          direction="column"
          justifyContent="flex-end"
          bottom={0}
          p={2}
          background={`linear-gradient(transparent, ${blackShadeColor})`}
        >
          <Text color="white" fontSize="sm" textTransform="none" noOfLines={1} overflow="hidden">
            {bottomText}
          </Text>
        </Flex>
      )}
    </Avatar>
  )
}

export default UserAvatar
