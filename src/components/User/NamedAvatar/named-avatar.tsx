import {
  AvatarProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  StackProps,
  TextProps,
} from '@chakra-ui/react'
import React, { ReactElement, RefObject, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import selectUser from 'src/state/recoil/user/selector'

import UserProfileCard from '../ProfileCard'

import { NameWithAvatar } from './name-with-avatar'
import { NamedAvatarSubtitleType } from './types'

export interface NamedAvatarProperties {
  userID?: User['id']
  user?: User
  isLoading?: boolean
  isEditting?: boolean
  isStatic?: boolean
  isUserNotActive?: boolean
  subtitleType?: NamedAvatarSubtitleType
  canEdit?: boolean
  canHover?: boolean
  avatarSize?: AvatarProps['w']
  displaySubtitle?: boolean
  horizontalGap?: StackProps['spacing']
  nameColor?: TextProps['color']
  date?: Date
  showCard?: boolean
  showName?: boolean
  redirectToProfile?: boolean
  isTeamLeader?: boolean
  onClick?: () => void
  children?: string | ReactElement
  cardPortalReference?: RefObject<HTMLDivElement>
}

const NamedAvatar = ({
  userID,
  // eslint-disable-next-line unicorn/prevent-abbreviations
  user: userFromProps,
  isLoading,
  isEditting,
  isStatic,
  isUserNotActive,
  subtitleType,
  canEdit,
  canHover,
  onClick,
  avatarSize,
  displaySubtitle,
  horizontalGap,
  date,
  showCard,
  showName = true,
  nameColor,
  cardPortalReference,
  children,
  redirectToProfile,
  isTeamLeader,
}: NamedAvatarProperties): ReactElement => {
  subtitleType ??= 'company'
  avatarSize ??= 12
  displaySubtitle ??= true
  horizontalGap ??= 4

  const userFromID = useRecoilValue(selectUser(userID))
  const [companies, setCompanyEdges] = useConnectionEdges<Team>()
  const [teams, setTeamEdges] = useConnectionEdges<Team>()
  const intl = useIntl()
  const [user, setUser] = useState(userFromProps ?? userFromID)
  const [isLoaded, setIsLoaded] = useState(Boolean(user) && !isLoading)

  const company = companies?.[0]
  const team = teams?.[0]
  const formattedDate = intl.formatDate(date, {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  })

  const availableSubtitles: Record<NamedAvatarSubtitleType, string | undefined> = {
    team: team?.name,
    company: company?.name,
    role: user?.role,
    date: formattedDate,
  }
  const subtitle = availableSubtitles[subtitleType]

  useEffect(() => {
    const updatedUser = userFromProps ?? userFromID
    setUser(updatedUser)
    setIsLoaded(Boolean(updatedUser) && !isLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromProps?.id, userFromID?.id, isLoading])

  useEffect(() => {
    if (user) {
      setCompanyEdges(user.companies?.edges)
      setTeamEdges(user.teams?.edges)
    }
  }, [user, setCompanyEdges, setTeamEdges])

  return showCard ? (
    <Popover placement="top-start" size="sm" trigger="hover" openDelay={1000}>
      <PopoverTrigger>
        <NameWithAvatar
          user={user}
          nameColor={nameColor}
          horizontalGap={horizontalGap}
          avatarSize={avatarSize}
          showName={showName}
          isEditable={canEdit}
          isHoverable={canHover}
          isLoaded={isLoaded}
          isEditing={isEditting}
          hasSubtitle={displaySubtitle}
          subtitle={subtitle}
          redirectToProfile={redirectToProfile}
          isTeamLeader={isTeamLeader}
          onClick={onClick}
        >
          {children}
        </NameWithAvatar>
      </PopoverTrigger>
      <Portal containerRef={cardPortalReference}>
        <PopoverContent p={0}>
          <PopoverBody p={0}>
            <UserProfileCard redirectToProfile userID={userID} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  ) : (
    <NameWithAvatar
      user={user}
      nameColor={nameColor}
      horizontalGap={horizontalGap}
      avatarSize={avatarSize}
      showName={showName}
      isEditable={canEdit}
      isHoverable={canHover}
      isLoaded={isLoaded}
      isEditing={isEditting}
      isStatic={isStatic}
      isUserNotActive={isUserNotActive}
      hasSubtitle={displaySubtitle}
      subtitle={subtitle}
      redirectToProfile={redirectToProfile}
      isTeamLeader={isTeamLeader}
      onClick={onClick}
    >
      {children}
    </NameWithAvatar>
  )
}

export default NamedAvatar
