import { Flex } from '@chakra-ui/react'
import React from 'react'

import { RIGHT_WING_GRID_GAP } from 'src/components/Base/AppBar/constants'

import SupportButton from '../../SupportButton'

const AppBarHelperButtons = () => (
  <Flex gridGap={RIGHT_WING_GRID_GAP}>
    <SupportButton />
  </Flex>
)

export default AppBarHelperButtons
