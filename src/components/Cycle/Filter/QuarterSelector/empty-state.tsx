import React from 'react'
import { useIntl } from 'react-intl'

import { ButtonOptionGroup } from 'src/components/Base'

import CycleFilterQuarterSelectorButton from './button'
import messages from './messages'

const CycleFilterQuarterSelectorEmptyState = () => {
  const intl = useIntl()
  const buttonContents = [
    intl.formatMessage(messages.quarterEmptyStateFirstButton),
    intl.formatMessage(messages.quarterEmptyStateSecondButton),
    intl.formatMessage(messages.quarterEmptyStateThirdButton),
    intl.formatMessage(messages.quarterEmptyStateFourthButton),
  ]

  return (
    <ButtonOptionGroup alignItems="center">
      {buttonContents.map((buttonContent) => (
        <CycleFilterQuarterSelectorButton
          key={Math.random()}
          isDisabled
          _disabled={{
            cursor: 'not-allowed',
            opacity: 0.6,
          }}
          _hover={{}}
          _focus={{}}
          _active={{}}
        >
          {buttonContent}
        </CycleFilterQuarterSelectorButton>
      ))}
    </ButtonOptionGroup>
  )
}

export default CycleFilterQuarterSelectorEmptyState
