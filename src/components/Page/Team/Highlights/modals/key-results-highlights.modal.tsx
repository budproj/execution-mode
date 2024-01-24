import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'

import { useGetTeamKeyResultsHighlights } from '../hooks/getKeyRusultsHighlightsData/get-key-results-highlights-data'
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
  const { data, loading } = useGetTeamKeyResultsHighlights()
  const intl = useIntl()

  const keyResultIds = useMemo(() => data.map(({ id }) => id), [data])
  return (
    <KeyResultListingModal
      isOpen={isOpen}
      keyResultIds={keyResultIds}
      isLoading={loading}
      modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
        confidence: highlightType,
      })}
      onClose={onClose}
    />
  )
}

export default KeyResultsHighlightsModal
