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
import React, { ReactElement, RefObject, useEffect } from 'react'
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
  readonly userID?: User['id']
  readonly isLoading?: boolean
  readonly isEditting?: boolean
  readonly isStatic?: boolean
  readonly isUserNotActive?: boolean
  readonly subtitleType?: NamedAvatarSubtitleType
  readonly canEdit?: boolean
  readonly canHover?: boolean
  readonly avatarSize?: AvatarProps['w']
  readonly displaySubtitle?: boolean
  readonly horizontalGap?: StackProps['spacing']
  readonly nameColor?: TextProps['color']
  readonly date?: Date
  readonly showCard?: boolean
  readonly showName?: boolean
  readonly redirectToProfile?: boolean
  readonly isTeamLeader?: boolean
  readonly onClick?: () => void
  readonly children?: string | ReactElement
  readonly cardPortalReference?: RefObject<HTMLDivElement>
}

const NamedAvatar = ({
  userID,
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

  const user = useRecoilValue(selectUser(userID))
  const [companies, setCompanyEdges] = useConnectionEdges<Team>()
  const [teams, setTeamEdges] = useConnectionEdges<Team>()
  const intl = useIntl()

  const isLoaded = Boolean(user) && !isLoading
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
    if (user) {
      setCompanyEdges(user?.companies?.edges)
      setTeamEdges(user?.teams?.edges)
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
