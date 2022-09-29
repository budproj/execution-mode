import { Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { useRoutinesFormActions } from 'src/components/Base/RoutineFormActionsProvider/routine-form-actions-provider'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import messages from './messages'

const SubmitAnswerButton = () => {
  const intl = useIntl()

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex alignItems="center">
      <Button
        p="20px 24px"
        color="black.50"
        bg="brand.500"
        fontSize={18}
        fontWeight="medium"
        _hover={{}}
        onClick={handleClick}
      >
        {currentQuestionIndex >= 1
          ? size && currentQuestionIndex === size - 1
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
