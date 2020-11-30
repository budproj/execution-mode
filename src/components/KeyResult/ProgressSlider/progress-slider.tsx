import {
  Box,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { Close as CloseIcon } from 'src/components/Icons'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdatePopoverSlider } from 'src/state/recoil/key-result/progress-update'

import messages from './messages'
import SliderContainer from './slider-container'

export interface ProgressSliderProperties {
  id?: KeyResult['id']
}

const ProgressSlider = ({ id }: ProgressSliderProperties) => {
  const intl = useIntl()
  const openedPopover = useRecoilValue(keyResultProgressUpdatePopoverSlider)
  const resetOpenedPopover = useResetRecoilState(keyResultProgressUpdatePopoverSlider)
  const isPopoverOpened = openedPopover === id && typeof openedPopover !== 'undefined'

  const handleClose = () => resetOpenedPopover()

  return (
    <Popover isOpen={isPopoverOpened} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <SliderContainer keyResultID={id} />
      </PopoverTrigger>
      <PopoverContent border="none">
        <Box boxShadow="lg" px={8} py={6} borderRadius={4}>
          <PopoverHeader border="none" fontSize="18px" fontWeight={700} color="gray.600" px={0}>
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
          <CheckInForm />
        </Box>
      </PopoverContent>
    </Popover>
  )
}

export default ProgressSlider
