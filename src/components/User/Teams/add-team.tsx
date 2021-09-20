import React from 'react'

import TeamTag from 'src/components/Team/Tag'

export const AddUserTeam = () => (
  <TeamTag
    p={3}
    py={2}
    cursor="pointer"
    _hover={{ bg: 'brand.500', color: 'white' }}
    transition="all .3s"
  >
    +
  </TeamTag>
)
