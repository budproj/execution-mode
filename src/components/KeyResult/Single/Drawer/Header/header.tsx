import {
  Box,
  Flex,
  Skeleton,
  DrawerCloseButton,
  DrawerHeader,
  useTheme,
  Collapse,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { SliderWithFilledTrack } from 'src/components/Base'
import { Close as CloseIcon } from 'src/components/Icon'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Sections/Title'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { selectCurrentConfidence } from 'src/state/recoil/key-result/selectors'
import { KeyResultSectionCheckIn } from 'src/components/KeyResult/Single/Sections'

import messages from './messages'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
  showCheckInButton?: boolean
}

const KeyResultDrawerHeader = ({
  keyResultID,
  showCheckInButton,
}: KeyResultDrawerHeaderProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const draftValue = useRecoilValue(keyResultCheckInProgressDraft(keyResultID))
  const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
  const [confidenceTag, setConfidence] = useConfidenceTag(currentConfidence)
  const theme = useTheme()

  const isLoaded = typeof draftValue !== 'undefined'

  useEffect(() => {
    if (currentConfidence) setConfidence(currentConfidence)
  }, [currentConfidence, setConfidence])

  return (
    <Box position="sticky" top={0} bg="white" zIndex={theme.zIndices.tooltip + 1}>
      <DrawerHeader bg="blue.50" py={4} borderColor="gray.200" borderBottomWidth={1}>
        <KeyResultSingleTitle keyResultID={keyResultID} />
      </DrawerHeader>

      <Collapse in={showCheckInButton}>
        <Box pb={2} pt={4} px={6}>
          <KeyResultSectionCheckIn keyResultID={keyResultID} />
        </Box>
      </Collapse>
    </Box>
  )
}

export default KeyResultDrawerHeader
