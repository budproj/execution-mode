import { Box } from '@chakra-ui/react'
import React from 'react'

import { KeyResultSectionTimeline } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => (
  <Box py={4} px={6}>
    <KeyResultSectionTimeline keyResultID={keyResultID} />
  </Box>
)

export default KeyResultDrawerBody
