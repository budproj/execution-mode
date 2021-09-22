import { Popover, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TeamSearch } from 'src/components/Team/Search/wrapper'
import { TeamSelect } from 'src/components/Team/Select/wrapper'
import TeamTag from 'src/components/Team/Tag'

type AddUserTeamProperties = {
  teamIDsBlacklist: string[]
}

export const AddUserTeam = ({ teamIDsBlacklist }: AddUserTeamProperties) => {
  const [filter, setFilter] = useState('')

  const handleSearch = (value: string) => {
    if (filter !== value) setFilter(value)
  }

  return (
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
        <Stack spacing={4}>
          <TeamSearch onSearch={handleSearch} />
          <TeamSelect teamIDsBlacklist={teamIDsBlacklist} filter={filter} />
        </Stack>
      </PopoverContent>
    </Popover>
  )
}
