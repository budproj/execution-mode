import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'
import { Team } from 'src/components/Team/types'

import { useGetTeamKeyResultsHighlights } from '../hooks/getKeyRusultsHighlightsData/get-key-results-highlights-data'
import { useNoRelatedMembers } from '../hooks/getNoRelatedMembers'
import { CARD_TYPES } from '../utils/card-types'

import messages from './messages'
import { RoutineHighlightModal } from './routine-highlight.modal'

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
  const {
    data: teamKeyResultsData,
    loading: teamKeyResultsLoading,
    setKeyResultHighlightType,
    setTeamId: setKeyReultsTeamId,
  } = useGetTeamKeyResultsHighlights()
  const { data: teamMembersData, setTeamId: setTeamIdOfMembers } = useNoRelatedMembers()

  const intl = useIntl()

  console.log({ teamMembersData })

  useEffect(() => {
    if (highlightType === CARD_TYPES.KRMEMBERS) {
      setTeamIdOfMembers(teamId)
    } else {
      setKeyReultsTeamId(teamId)
      setKeyResultHighlightType(highlightType)
    }
  }, [highlightType, setKeyResultHighlightType, setKeyReultsTeamId, setTeamIdOfMembers, teamId])

  return highlightType === CARD_TYPES.KRMEMBERS ? (
    <RoutineHighlightModal
      isOpen={isOpen}
      handleModalClose={onClose}
      type={highlightType}
      usersIds={teamMembersData}
    />
  ) : (
    <KeyResultListingModal
      isOpen={isOpen}
      loadingData={teamKeyResultsLoading}
      data={teamKeyResultsData}
      modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
        confidence: highlightType,
      })}
      onClose={onClose}
    />
  )
}

export default KeyResultsHighlightsModal
