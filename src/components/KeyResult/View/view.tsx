import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import ViewBody from './Body'
import ViewHead from './Head'

const KeyResultView = (): ReactElement => (
  <Box pt={20}>
    <ViewHead />
    <ViewBody />
  </Box>
)

export default KeyResultView
