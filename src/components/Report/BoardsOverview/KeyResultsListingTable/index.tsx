import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'
import { useGetKeyResults } from 'src/components/KeyResult/hooks'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import messages from './messages'

export interface BoardsOverviewProperties {
  isOpen: boolean
  confidence: number
  onClose: () => void
  isCompany?: boolean
}

export const KeyResultsListingTable = ({
  isOpen,
  confidence,
  onClose,
  isCompany,
}: BoardsOverviewProperties) => {
  const { data, loading } = useGetKeyResults(isCompany)
  const [currentConfidenceTag] = useConfidenceTag(confidence)
  const intl = useIntl()
  const { dispatch: dispatchEvent } = useEvent(EventType.OPENED_KEY_RESULT_REPORT_CONFIDANCE)

  const confidenceText = useMemo(
    () => currentConfidenceTag.messages.long.toLowerCase(),
    [currentConfidenceTag],
  )

  const dispatchOpenKeyResultEvent = () => {
    dispatchEvent({ confidence: currentConfidenceTag.tag })
  }

  return (
    <KeyResultListingModal
      isOpen={isOpen}
      loadingData={loading}
      data={data}
      dispatchEvent={dispatchOpenKeyResultEvent}
      modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
        confidence: confidence === -1 ? 'barrier' : confidence,
        confidencetext: confidenceText,
      })}
      onClose={onClose}
    />
  )
}
