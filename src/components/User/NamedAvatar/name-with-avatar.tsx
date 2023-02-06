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
  Box,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { ReactElement, RefObject, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { IntlLink } from 'src/components/Base'
import CrownIcon from 'src/components/Icon/Crown'
import SwitchIcon from 'src/components/Icon/Switch'
import meAtom from 'src/state/recoil/user/me'

import { User } from '../types'

import messages from './messages'

interface NameWithAvatarProperties {
  user?: Partial<User>
  nameColor?: TextProps['color']
  horizontalGap?: StackProps['spacing']
  avatarSize?: AvatarProps['w']
  isEditable?: boolean
  isHoverable?: boolean
  isLoaded: boolean
  isHovering?: boolean
  isEditing?: boolean
  isStatic?: boolean
  isUserNotActive?: boolean
  showName?: boolean
  hasSubtitle?: boolean
  subtitle?: string
  children?: string | ReactElement
  redirectToProfile?: boolean
  isTeamLeader?: boolean
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
    color: ${({ brandcolor }) => brandcolor};
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
      isStatic,
      isUserNotActive,
      avatarSize,
      showName = true,
      hasSubtitle,
      onMouseEnter,
      onMouseLeave,
      subtitle,
      onClick,
      redirectToProfile,
      isTeamLeader,
      children,
    }: NameWithAvatarProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => {
    const intl = useIntl()
    const myID = useRecoilValue(meAtom)
    const [brand500] = useToken('colors', ['brand.500'])
    const [showButton, setShowButton] = useState(false)

    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        cursor={isHoverable ? 'pointer' : 'auto'}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <Stack
          ref={reference}
          alignItems="center"
          direction="row"
          spacing={horizontalGap}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <SkeletonCircle isLoaded={isLoaded} w={avatarSize} h={avatarSize} fadeDuration={0}>
            <StyledAvatarWrapper isEditing={isEditing}>
              <Avatar
                name={user?.fullName}
                src={user?.picture}
                opacity={isUserNotActive === true ? 0.5 : undefined}
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
                {redirectToProfile ? (
                  <IntlLink href={user?.id === myID ? '/my-things' : `/profile/${user?.id ?? ''}`}>
                    <StyledText fontSize="lg" color={nameColor} brandColor={brand500}>
                      {user?.fullName}
                      {isTeamLeader ? (
                        <Tag
                          size="md"
                          variant="subtle"
                          color="new-gray.600"
                          bg="new-gray.200"
                          gap="5px"
                          marginLeft="10px"
                        >
                          <CrownIcon
                            desc={intl.formatMessage(messages.crownIconDesc)}
                            fill="new-gray.600"
                          />
                          <TagLabel>{intl.formatMessage(messages.leaderTitle)}</TagLabel>
                        </Tag>
                      ) : undefined}
                    </StyledText>
                  </IntlLink>
                ) : (
                  <StyledText
                    fontSize="lg"
                    color={nameColor}
                    brandColor={isStatic ? undefined : brand500}
                  >
                    {user?.fullName}
                  </StyledText>
                )}
              </Skeleton>
            )}

            {hasSubtitle && (
              <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 60, 18)}>
                <Text fontSize="md" color={isUserNotActive ? 'new-gray.500' : '#6B7B90'}>
                  {subtitle}
                </Text>
              </Skeleton>
            )}
          </Stack>
        </Stack>
        {children && showButton && <Box cursor="pointer">{children}</Box>}
      </Stack>
    )
  },
)
