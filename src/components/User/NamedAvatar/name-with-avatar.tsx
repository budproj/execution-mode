import { Flex, Stack, StackProps, Text, TextProps } from '@chakra-ui/layout'
import { Avatar, AvatarProps, forwardRef, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React, { RefObject } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import SwitchIcon from 'src/components/Icon/Switch'

import { User } from '../types'

import messages from './messages'

type NameWithAvatarProperties = {
  user?: Partial<User>
  nameColor?: TextProps['color']
  horizontalGap?: StackProps['spacing']
  avatarSize?: AvatarProps['w']
  isEditable?: boolean
  isHoverable?: boolean
  isLoaded: boolean
  isHovering?: boolean
  isEditing?: boolean
  hasSubtitle?: boolean
  subtitle?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export const NameWithAvatar = forwardRef(
  (
    {
      user,
      nameColor,
      horizontalGap,
      isHoverable,
      isLoaded,
      isEditable,
      isHovering,
      isEditing,
      avatarSize,
      hasSubtitle,
      onMouseEnter,
      onMouseLeave,
      subtitle,
      onClick,
    }: NameWithAvatarProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => {
    const intl = useIntl()

    return (
      <Stack
        ref={reference}
        alignItems="center"
        direction="row"
        spacing={horizontalGap}
        cursor={isHoverable ? 'pointer' : 'auto'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <SkeletonCircle isLoaded={isLoaded} w={avatarSize} h={avatarSize} fadeDuration={0}>
          {isEditable && (isHovering || isEditing) ? (
            <Flex
              w={12}
              h={12}
              justifyContent="center"
              alignItems="center"
              borderColor="brand.500"
              borderRadius="full"
              borderWidth={2}
              borderStyle="dashed"
            >
              <SwitchIcon fill="brand.500" desc={intl.formatMessage(messages.changeIconDesc)} />
            </Flex>
          ) : (
            <Avatar name={user?.fullName} src={user?.picture} w={avatarSize} h={avatarSize} />
          )}
        </SkeletonCircle>

        <Stack spacing={isLoaded ? 0 : 2} textAlign="left">
          <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 21)}>
            <Text fontSize="lg" color={isHovering || isEditing ? 'brand.500' : nameColor}>
              {user?.fullName}
            </Text>
          </Skeleton>

          {hasSubtitle && (
            <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 60, 18)}>
              <Text fontSize="md" color="gray.400">
                {subtitle}
              </Text>
            </Skeleton>
          )}
        </Stack>
      </Stack>
    )
  },
)
