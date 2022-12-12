import { Box } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { CARD_TYPES } from '../utils/card-types'

import KeyResultsHighlightsModal from './key-results-highlights.modal'
import { RoutineHighlightModal } from './routine-highlight.modal'

const TeamHightlightModal = () => {
  const [{ isOpen, type, usersIds }, setModalConfig] = useRecoilState(configHighlightModal)

  const handleModalClose = useCallback(() => {
    setModalConfig({ isOpen: false, type: undefined, usersIds: [] })
  }, [setModalConfig])

  switch (type) {
    case CARD_TYPES.CHECKIN:
      return (
        <KeyResultsHighlightsModal
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.BARRIER:
      return (
        <KeyResultsHighlightsModal
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.CONFIDENCE:
      return (
        <KeyResultsHighlightsModal
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.KRMEMBERS:
      return (
        <KeyResultsHighlightsModal
          highlightType={type}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )
    case CARD_TYPES.FEELING:
      return (
        <RoutineHighlightModal
          handleModalClose={handleModalClose}
          isOpen={isOpen}
          type={type}
          usersIds={usersIds}
        />
      )
    case CARD_TYPES.PRODUCTIVITY:
      return (
        <RoutineHighlightModal
          handleModalClose={handleModalClose}
          isOpen={isOpen}
          type={type}
          usersIds={usersIds}
        />
      )
    case CARD_TYPES.ROADBLOCK:
      return (
        <RoutineHighlightModal
          handleModalClose={handleModalClose}
          isOpen={isOpen}
          type={type}
          usersIds={usersIds}
        />
      )

    default:
      return <Box />
  }
}

export default TeamHightlightModal
