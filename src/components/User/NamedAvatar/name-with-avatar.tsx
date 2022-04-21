import {
  Flex,
  Stack,
  StackProps,
  Text,
  TextProps,
  Avatar,
  AvatarProps,
  forwardRef,
  Skeleton,
  SkeletonCircle,
  useToken,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
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
  showName?: boolean
  hasSubtitle?: boolean
  subtitle?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

const StyledAvatarWrapper = styled(Flex)`
  position: relative;
  & .swap-icon {
    opacity: ${({ isEditing }) => (isEditing ? 1 : 0)};
    transition: opacity 0.1s;
    will-change: opacity;
    transform: scale(1.01);
  }

  &:hover .swap-icon {
    opacity: 1;
  }
`
const StyledText = styled(Text)`
  color: ${({ color }) => color};

  &:hover {
    color: ${({ brandColor }) => brandColor};
  }
`

export const NameWithAvatar = forwardRef(
  (
    {
      user,
      nameColor,
      horizontalGap,
      isHoverable,
      isLoaded,
      isEditable,
      isEditing,
      avatarSize,
      showName = true,
      hasSubtitle,
      onMouseEnter,
      onMouseLeave,
      subtitle,
      onClick,
    }: NameWithAvatarProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => {
    const intl = useIntl()
    const [brand500] = useToken('colors', ['brand.500'])

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
          <StyledAvatarWrapper isEditing={isEditing}>
            <Avatar
              name={user?.fullName}
              src={user?.picture}
              w={avatarSize}
              h={avatarSize}
              loading="lazy"
            />
            {isEditable && (
              <Flex
                w={avatarSize}
                h={avatarSize}
                justifyContent="center"
                alignItems="center"
                borderColor="brand.500"
                borderRadius="full"
                borderWidth={2}
                borderStyle="dashed"
                className="swap-icon"
                position="absolute"
                bg="white"
              >
                <SwitchIcon fill="brand.500" desc={intl.formatMessage(messages.changeIconDesc)} />
              </Flex>
            )}
          </StyledAvatarWrapper>
        </SkeletonCircle>

        <Stack spacing={isLoaded ? 0 : 2} textAlign="left">
          {showName && (
            <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 21)}>
              <StyledText fontSize="lg" color={nameColor} brandColor={brand500}>
                {user?.fullName}
              </StyledText>
            </Skeleton>
          )}

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
