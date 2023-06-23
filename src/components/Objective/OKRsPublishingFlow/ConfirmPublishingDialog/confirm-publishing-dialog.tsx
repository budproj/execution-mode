import { useMutation } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { DANGERS_ACTIONS_HEADER_COLORS_SCHEME } from 'src/components/Base/Dialogs/Confirmation/Base/Sections/header'
import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import { Objective } from '../../types'

import messages from './messages'
import queries from './queries.gql'

interface ConfirmPublishingDialogProperties {
  objectiveID?: string
  isOpen: boolean
  onClose?: () => void
}

interface PublishOkrMutationResult {
  publishOkr: Partial<Objective>
}

const ConfirmPublishingDialog = ({
  objectiveID,
  isOpen,
  onClose,
}: ConfirmPublishingDialogProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const { dispatch: dispatchEventPublishOkrClick } = useEvent(EventType.PUBLISH_OKR_CLICK)

  const [loadObjectiveOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [publishOkr] = useMutation<PublishOkrMutationResult>(queries.PUBLISH_OKR, {
    onCompleted: (data) => {
      loadObjectiveOnRecoil(data.publishOkr)
      dispatchEventPublishOkrClick({})
      toast({
        title: intl.formatMessage(messages.publishOKRSuccessMessage),
        status: 'success',
      })
    },
  })

  const handleClose = () => {
    if (onClose) void onClose()
  }

  const handleConfirm = async () => {
    await publishOkr({ variables: { objectiveID } })
    if (onClose) void onClose()
  }

  return (
    <DangerousActionConfirmationDialog
      onlySecondStage
      isOpen={isOpen}
      keyword={intl.formatMessage(messages.keyword)}
      confirmationLabel={intl.formatMessage(messages.confirmationLabel)}
      secondStageTitle={intl.formatMessage(messages.secondStageTitle, { breakline: <br /> })}
      secondStageDescription={intl.formatMessage(messages.secondStageDescription)}
      firstStageTitle=""
      firstStageDescription=""
      inputLabel={intl.formatMessage(messages.inputLabel)}
      confirmButtonColorScheme="green"
      headerColorScheme={DANGERS_ACTIONS_HEADER_COLORS_SCHEME.GREEN}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  )
}

export default ConfirmPublishingDialog
