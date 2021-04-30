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

export interface NamedAvatarProperties {
  userID?: User['id']
  isLoading?: boolean
  subtitleType?: 'team' | 'company' | 'role'
  canEdit?: boolean
}

const NamedAvatar = ({
  userID,
  isLoading,
  subtitleType,
  canEdit,
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
    if (!isHovering && canEdit) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering && canEdit) setIsHovering(false)
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
      cursor={canEdit ? 'pointer' : 'auto'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SkeletonCircle isLoaded={isLoaded} w={12} h={12}>
        {canEdit && isHovering ? (
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

      <Stack spacing={0} textAlign="left">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 24)}>
          <Text color={isHovering ? 'brand.500' : 'black.900'}>{user?.fullName}</Text>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          {...buildSkeletonMinSize(isLoaded, 60, 10)}
          mt={isLoaded ? 0 : '8px'}
        >
          <Text fontSize="sm" color="gray.400">
            {subtitle}
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  )
}

export default NamedAvatar
