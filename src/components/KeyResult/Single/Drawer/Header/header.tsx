import { Box, Flex, Skeleton, DrawerCloseButton, DrawerHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { SliderWithFilledTrack } from 'src/components/Base'
import { Close as CloseIcon } from 'src/components/Icon'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Sections/Title'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { selectCurrentConfidence } from 'src/state/recoil/key-result/selectors'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

import messages from './messages'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerHeader = ({ keyResultID }: KeyResultDrawerHeaderProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const draftValue = useRecoilValue(keyResultCheckInProgressDraft(keyResultID))
  const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
  const confidenceTag = useRecoilValue(confidenceTagSelector(currentConfidence))

  const isLoaded = typeof draftValue !== 'undefined'

  return (
    <Box>
      <DrawerHeader bg="blue.50" py={8}>
        <KeyResultSingleTitle keyResultID={keyResultID} />

        <DrawerCloseButton
          color="gray.300"
          _hover={{ bg: 'transparent', color: 'brand.400' }}
          fontSize="12px"
          position="absolute"
          top={21}
          right={21}
        >
          <CloseIcon
            title={intl.formatMessage(messages.closeIconTitle)}
            desc={intl.formatMessage(messages.closeIconDesc)}
            fill="currentColor"
          />
        </DrawerCloseButton>
      </DrawerHeader>

      <Skeleton isLoaded={isLoaded} minH="8px">
        <Flex>
          <SliderWithFilledTrack
            trackRadius={0}
            trackColor={confidenceTag.color}
            value={draftValue}
            min={keyResult?.initialValue}
            max={keyResult?.goal}
          />
        </Flex>
      </Skeleton>
    </Box>
  )
}

export default KeyResultDrawerHeader
