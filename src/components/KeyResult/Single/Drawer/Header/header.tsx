import { Box, DrawerHeader, useTheme, Collapse } from '@chakra-ui/react'
import React from 'react'

import { KeyResultSectionCheckIn } from 'src/components/KeyResult/Single/Sections'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Sections/Title'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
  showCheckInButton?: boolean
}

const KeyResultDrawerHeader = ({
  keyResultID,
  showCheckInButton,
}: KeyResultDrawerHeaderProperties) => {
  const theme = useTheme()

  return (
    <Box position="sticky" top={0} bg="white" zIndex={theme.zIndices.tooltip}>
      <DrawerHeader bg="blue.50" p={4} borderColor="gray.200" borderBottomWidth={1}>
        <KeyResultSingleTitle keyResultID={keyResultID} />
      </DrawerHeader>

      <Collapse in={showCheckInButton}>
        <Box pb={2} pt={4} px={4}>
          <KeyResultSectionCheckIn keyResultID={keyResultID} />
        </Box>
      </Collapse>
    </Box>
  )
}

export default KeyResultDrawerHeader
