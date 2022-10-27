import { Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { useRoutinesFormActions } from 'src/components/Base/RoutineFormActionsProvider/routine-form-actions-provider'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import messages from './messages'

const SubmitAnswerButton = () => {
  const intl = useIntl()
  const { dispatch: dispatchSendAnswerFormClick } = useEvent(EventType.SEND_ANSWER_FORM_CLICK)
  const { dispatch: dispatchStartAnswerFormClick } = useEvent(EventType.START_ANSWER_FORM_CLICK)

  const answers = useRecoilValue(retrospectiveRoutineListAtom)

  const currentQuestionIndex = useRecoilValue(retrospectiveRoutineIndexQuestionAtom)
  const { size } = useRecoilValue(currentRoutinePropertiesAtom)
  const { handleClick } = useRoutinesFormActions()

  const handleKeyDown = (event: any) => {
    const keyCode = event.which || event.key

    if (keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      handleClick()
    }
  }

  const handleDispatchEvent = () => {
    if (isSendButtonActive) {
      const feeling = answers.find(
        (answer) => answer.questionId === '44bd7498-e528-4f96-b45e-3a2374790373',
      )
      const productivity = answers.find(
        (answer) => answer.questionId === '9a56911a-61c1-49af-87a8-7a35a1804f6b',
      )
      const roadBlock = answers.find(
        (answer) => answer.questionId === 'cf785f20-5a0b-4c4c-b882-9e3949589df2',
      )

      dispatchSendAnswerFormClick({
        feeling: feeling?.value,
        productivity: productivity?.value,
        roadBlock: roadBlock?.value,
      })
    }

    if (isStartButtonActive) {
      dispatchStartAnswerFormClick({})
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isSendOrAfterButtonActive = currentQuestionIndex >= 1
  const isSendButtonActive = isSendOrAfterButtonActive && size && currentQuestionIndex === size - 1
  const isStartButtonActive = !isSendOrAfterButtonActive

  return (
    <Flex alignItems="center">
      <Button
        p="20px 24px"
        color="black.50"
        bg="brand.500"
        fontSize={18}
        fontWeight="medium"
        _hover={{}}
        onClick={() => {
          handleClick()
          handleDispatchEvent()
        }}
      >
        {isSendOrAfterButtonActive
          ? isSendButtonActive
            ? intl.formatMessage(messages.sendFormAnswersMessageButton)
            : intl.formatMessage(messages.afterButtonForm)
          : intl.formatMessage(messages.startButtonForm)}
      </Button>
      <span style={{ marginLeft: '12px', color: '#8491B0', fontSize: 14 }}>
        {intl.formatMessage(messages.submitFormButtonDesc)} <b>Enter &#x23CE; &nbsp;</b>
      </span>
    </Flex>
  )
}

export default SubmitAnswerButton
