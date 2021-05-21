import { Avatar, Text, SkeletonCircle, Skeleton, Stack, Flex } from '@chakra-ui/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import SwitchIcon from 'src/components/Icon/Switch'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'
import { NamedAvatarSubtitleType } from './types'

export interface NamedAvatarProperties {
  userID?: User['id']
  isLoading?: boolean
  isEditting?: boolean
  subtitleType?: NamedAvatarSubtitleType
  canEdit?: boolean
  canHover?: boolean
  onClick?: () => void
}

const NamedAvatar = ({
  userID,
  isLoading,
  isEditting,
  subtitleType,
  canEdit,
  canHover,
  onClick,
}: NamedAvatarProperties): ReactElement => {
  subtitleType ??= 'company'

  const [isHovering, setIsHovering] = useState(false)
  const user = useRecoilValue(selectUser(userID))
  const [companies, setCompanyEdges] = useConnectionEdges<Team>()
  const [teams, setTeamEdges] = useConnectionEdges<Team>()
  const intl = useIntl()

  const isLoaded = Boolean(user) || !isLoading
  const company = companies?.[0]
  const team = teams?.[0]

  const availableSubtitles = {
    team: team?.name,
    company: company?.name,
    role: user?.role,
  }
  const subtitle = availableSubtitles[subtitleType]

  const handleMouseEnter = () => {
    if (!isHovering && canHover) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering && canHover) setIsHovering(false)
  }

  useEffect(() => {
    if (user) {
      setCompanyEdges(user?.companies?.edges)
      setTeamEdges(user?.teams?.edges)
    }
  }, [user, setCompanyEdges, setTeamEdges])

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={4}
      cursor={canHover ? 'pointer' : 'auto'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <SkeletonCircle isLoaded={isLoaded} w={12} h={12}>
        {canEdit && (isHovering || isEditting) ? (
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
          <Avatar name={user?.fullName} src={user?.picture} w={12} h={12} />
        )}
      </SkeletonCircle>

      <Stack spacing={isLoaded ? 0 : 2} textAlign="left">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 21)}>
          <Text color={isHovering || isEditting ? 'brand.500' : 'black.900'}>{user?.fullName}</Text>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 60, 18)}>
          <Text fontSize="sm" color="gray.400">
            {subtitle}
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  )
}

export default NamedAvatar
