import { MenuProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { SelectMenu } from 'src/components/Base'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import { Team } from '../types'

interface TeamSelectMenuProperties {
  value: string
  onChange?: (teamId: string) => void
  placement?: MenuProps['placement']
}

export const TeamSelectMenu = ({ value, onChange, placement }: TeamSelectMenuProperties) => {
  const [isOpen, setIsOpen] = useState(true)

  const [childTeams, setChildTeamEdges, childTeamEdges] = useConnectionEdges<Team>()
  const [loadTeamsOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  useEffect(() => {
    loadTeamsOnRecoil(childTeams)
  }, [childTeams, loadTeamsOnRecoil])

  const handleChange = (teamId: string | string[]) => {
    if (Array.isArray(teamId)) throw new Error('Cannot parse string array')
    if (onChange) onChange(teamId)
    handleClose()
  }

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <SelectMenu
      matchWidth
      isLazy
      closeOnSelect
      isOpen={isOpen}
      value={value}
      placement={placement}
      placeholder={
        <NamedAvatar
          userID={value}
          avatarSize={9}
          displaySubtitle={false}
          horizontalGap={2}
          nameColor="gray.500"
        />
      }
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
    >
      <Box p={4} maxH="full" h="full">
        <AllReachableUsers onSelect={handleChange} />
      </Box>
    </SelectMenu>
  )
}
