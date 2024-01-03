import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'

import { CARD_TYPES } from '../utils/card-types'

import messages from './messages'

interface KeyResultsHighlightsModalProperties {
  highlightType: CARD_TYPES
  isOpen: boolean
  onClose: () => void
}

const KeyResultsHighlightsModal = ({
  highlightType,
  isOpen,
  onClose,
}: KeyResultsHighlightsModalProperties) => {
  const intl = useIntl()

  return (
    <KeyResultListingModal
      isOpen={isOpen}
      modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
        confidence: highlightType,
      })}
      onClose={onClose}
    />
  )
}

export default KeyResultsHighlightsModal
