import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

import { TeamSelect } from 'src/components/Team/Select/wrapper'
import TeamTag from 'src/components/Team/Tag'

type AddUserTeamProperties = {
  teamIDsBlacklist: string[]
}

export const AddUserTeam = ({ teamIDsBlacklist }: AddUserTeamProperties) => (
  <Popover placement="bottom-end">
    <PopoverTrigger>
      <TeamTag
        p={3}
        py={2}
        cursor="pointer"
        _hover={{ bg: 'brand.500', color: 'white' }}
        transition="all ease-in-out .3s"
      >
        +
      </TeamTag>
    </PopoverTrigger>
    <PopoverContent width="sm">
      <TeamSelect teamIDsBlacklist={teamIDsBlacklist} />
    </PopoverContent>
  </Popover>
)
