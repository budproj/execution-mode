import React from 'react'

import { useNoRelatedMembers } from '../hooks/getNoRelatedMembers'
import { CARD_TYPES } from '../utils/card-types'

import { RoutineHighlightModal } from './routine-highlight.modal'

interface MembersHighlightsModalProperties {
  highlightType: CARD_TYPES
  isOpen: boolean
  onClose: () => void
}
const MembersHighlightsModal = ({
  highlightType,
  isOpen,
  onClose,
}: MembersHighlightsModalProperties) => {
  const { data: teamMembersData } = useNoRelatedMembers()

  return (
    <RoutineHighlightModal
      isOpen={isOpen}
      handleModalClose={onClose}
      type={highlightType}
      usersIds={teamMembersData}
    />
  )
}

export default MembersHighlightsModal
