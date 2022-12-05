import { Box } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { CARD_TYPES } from '../utils/card-types'

import KeyResultsHighlightsModal from './key-results-highlights.modal'

interface TeamHighlightModal {
  teamId: Team['id']
}

const TeamHightlightModal = ({ teamId }: TeamHighlightModal) => {
  const [{ isOpen, type }, setModalConfig] = useRecoilState(configHighlightModal)

  const handleModalClose = useCallback(() => {
    setModalConfig({ isOpen: false, type: undefined })
  }, [setModalConfig])

  switch (type) {
    case CARD_TYPES.CHECKIN:
      return (
        <KeyResultsHighlightsModal
          teamId={teamId}
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.BARRIER:
      return (
        <KeyResultsHighlightsModal
          teamId={teamId}
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.CONFIDENCE:
      return (
        <KeyResultsHighlightsModal
          teamId={teamId}
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )

    default:
      return <Box />
  }
}

export default TeamHightlightModal
