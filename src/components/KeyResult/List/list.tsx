import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import ListBody from './Body'
import ListHead from './Head'

const KeyResultList = (): ReactElement => (
  <Box pt={20}>
    <ListHead />
    <ListBody />
  </Box>
)

export default KeyResultList
