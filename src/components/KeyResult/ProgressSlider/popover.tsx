import { PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { Close as CloseIcon } from 'src/components/Icons'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import {
  keyResultProgressUpdateDraftValue as draftValueAtom,
  keyResultProgressUpdatePopoverOpen as selectPopoverOpen,
} from 'src/state/recoil/key-result/progress-update'

import { KeyResult } from '..'
import { ProgressReport } from '../types'

import messages from './messages'

export interface ProgressSliderContentProperties {
  keyResultID?: KeyResult['id']
}

const ProgressSliderPopover = ({ keyResultID }: ProgressSliderContentProperties) => {
  const intl = useIntl()
  const setDraftValue = useSetRecoilState(draftValueAtom(keyResultID))
  const setPopoverOpen = useSetRecoilState<boolean>(selectPopoverOpen(keyResultID))

  const handleSubmit = (newProgress?: ProgressReport['valueNew']) => {
    if (newProgress) setDraftValue(newProgress)
    setPopoverOpen(false)
  }

  return (
    <PopoverContent width={400} p={0} pt={8}>
      <PopoverHeader border="none" fontSize="18px" fontWeight={700} color="gray.600" px={8} pb={0}>
        {intl.formatMessage(messages.updateProgress)}
      </PopoverHeader>
      <PopoverCloseButton
        size="lg"
        top="1rem"
        right="1.5rem"
        color="gray.200"
        _hover={{ bg: 'transparent', color: 'brand.400' }}
      >
        <CloseIcon
          title={intl.formatMessage(messages.closeIconTitle)}
          desc={intl.formatMessage(messages.closeIconDesc)}
          fill="currentColor"
        />
      </PopoverCloseButton>
      <CheckInForm keyResultID={keyResultID} afterSubmit={handleSubmit} gutter={8} />
    </PopoverContent>
  )
}

export default ProgressSliderPopover
