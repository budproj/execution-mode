import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'
import { Team } from 'src/components/Team/types'

import { useGetTeamKeyResultsHighlights } from '../hooks/getKeyRusultsHighlightsData/get-key-results-highlights-data'
import { CARD_TYPES } from '../utils/card-types'

import messages from './messages'

interface KeyResultsHighlightsModalProperties {
  highlightType: CARD_TYPES
  teamId: Team['id']
  isOpen: boolean
  onClose: () => void
}

const KeyResultsHighlightsModal = ({
  highlightType,
  teamId,
  isOpen,
  onClose,
}: KeyResultsHighlightsModalProperties) => {
  const { data, loading, setKeyResultHighlightType, setTeamId } = useGetTeamKeyResultsHighlights()
  const intl = useIntl()

  useEffect(() => {
    setTeamId(teamId)
    setKeyResultHighlightType(highlightType)
  }, [highlightType, setKeyResultHighlightType, setTeamId, teamId])

  return (
    <KeyResultListingModal
      isOpen={isOpen}
      loadingData={loading}
      data={data}
      modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
        confidence: highlightType,
      })}
      onClose={onClose}
    />
  )
}

export default KeyResultsHighlightsModal
