import { PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Close as CloseIcon } from 'src/components/Icon'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultCheckInProgressDraft,
  keyResultCheckInPopoverOpen,
} from 'src/state/recoil/key-result/check-in'

import messages from './messages'

export interface ProgressSliderContentProperties {
  keyResultID?: KeyResult['id']
}

const handleMouseDownCapture = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

const ProgressSliderPopover = ({ keyResultID }: ProgressSliderContentProperties) => {
  const intl = useIntl()
  const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const setPopoverOpen = useSetRecoilState<boolean>(keyResultCheckInPopoverOpen(keyResultID))

  const handleSubmit = (values: CheckInFormValues) => {
    if (values.valueNew) setDraftValue(values.valueNew)
    setPopoverOpen(false)
  }

  return (
    <PopoverContent width="sm" p={6} cursor="auto" onMouseDownCapture={handleMouseDownCapture}>
      <PopoverHeader
        fontSize="xl"
        fontWeight={700}
        color="new-gray.900"
        flexGrow={1}
        lineHeight="2rem"
        border="none"
        px={0}
        pt={0}
      >
        {intl.formatMessage(messages.popoverTitle)}
      </PopoverHeader>
      <PopoverCloseButton
        size="md"
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
      <CheckInForm keyResultID={keyResultID} afterSubmit={handleSubmit} valueNew={draftValue} />
    </PopoverContent>
  )
}

export default ProgressSliderPopover
