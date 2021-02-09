import { Box } from '@chakra-ui/react'
import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

import { KeyResultSectionAddComment } from '../../Sections'

export interface KeyResultDrawerFooterProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerFooter = ({ keyResultID }: KeyResultDrawerFooterProperties) => (
  <Box p={4} boxShadow="md">
    <KeyResultSectionAddComment keyResultID={keyResultID} />
  </Box>
)

export default KeyResultDrawerFooter
