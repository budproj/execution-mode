import React, { memo, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListingModal } from 'src/components/Base/KeyResultListing'
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

export const KeyResultsListingTable = memo(
  ({ isOpen, confidence, onClose, isCompany }: BoardsOverviewProperties) => {
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
        isCompany={isCompany}
        isOpen={isOpen}
        dispatchEvent={dispatchOpenKeyResultEvent}
        modalHeadingTitle={intl.formatMessage(messages.modalTitle, {
          confidence: confidence === -1 ? 'barrier' : confidence,
          confidencetext: confidenceText,
        })}
        onClose={onClose}
      />
    )
  },
)
