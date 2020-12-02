import {
  Box,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { Close as CloseIcon } from 'src/components/Icons'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { ConfidenceReport, KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdatePopoverOpen,
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import messages from './messages'
import SliderContainer from './slider-container'

export interface ProgressSliderProperties {
  id?: KeyResult['id']
}

const ProgressSlider = ({ id }: ProgressSliderProperties) => {
  const [originalProgress, setOriginalProgress] = useState<number>()
  const [originalConfidence, setOriginalConfidence] = useState<number>()

  const intl = useIntl()
  const [isPopoverOpen, setPopoverOpen] = useRecoilState<boolean>(
    keyResultProgressUpdatePopoverOpen(id),
  )
  const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(id))
  const [currentConfidence, setCurrentConfidence] = useRecoilState(selectCurrentConfidence(id))

  const handleClose = () => {
    if (originalProgress !== currentProgress) setCurrentProgress(originalProgress)
    if (originalConfidence !== currentConfidence) setCurrentConfidence(originalConfidence)

    setPopoverOpen(false)
  }

  const refreshOriginalValues = useCallback(
    (newProgress?: ProgressReport['valueNew'], newConfidence?: ConfidenceReport['valueNew']) => {
      if (newProgress) setOriginalProgress(newProgress)
      if (newConfidence) setOriginalConfidence(newConfidence)
    },
    [],
  )

  const handleSubmit = useCallback(
    (newProgress?: ProgressReport['valueNew'], newConfidence?: ConfidenceReport['valueNew']) => {
      refreshOriginalValues(newProgress, newConfidence)
      handleClose()
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    if (typeof originalProgress === 'undefined' && typeof originalConfidence === 'undefined')
      refreshOriginalValues(currentProgress, currentConfidence)
  }, [
    originalProgress,
    originalConfidence,
    currentProgress,
    currentConfidence,
    refreshOriginalValues,
  ])

  return (
    <Popover isOpen={isPopoverOpen} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <SliderContainer keyResultID={id} />
      </PopoverTrigger>
      <PopoverContent border="none" width={400}>
        <Box boxShadow="lg" py={6} borderRadius={4}>
          <PopoverHeader
            border="none"
            fontSize="18px"
            fontWeight={700}
            color="gray.600"
            px={8}
            pb={0}
          >
            {intl.formatMessage(messages.updateProgress)}
          </PopoverHeader>
          <PopoverCloseButton
            size="md"
            top="1rem"
            color="gray.200"
            _hover={{ bg: 'transparent', color: 'brand.400' }}
          >
            <CloseIcon
              title={intl.formatMessage(messages.closeIconTitle)}
              desc={intl.formatMessage(messages.closeIconDesc)}
              fill="currentColor"
            />
          </PopoverCloseButton>
          <CheckInForm keyResultID={id} afterSubmit={handleSubmit} />
        </Box>
      </PopoverContent>
    </Popover>
  )
}

export default ProgressSlider
