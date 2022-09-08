import { Box, Button, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { OpenArrowDown, OpenArrowUp } from 'src/components/Icon'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import { useRoutineFormAnswers } from '../../hooks/setRoutineFormAnswers/set-routine-form-answers'

import messages from './messages'

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 32px;
  border-radius: 4px;
  background-color: #6f6eff;
`

const SubmitAnswerButton = () => {
  const intl = useIntl()

  const [currentQuestionIndex, setShowedQuestion] = useRecoilState(
    retrospectiveRoutineIndexQuestionAtom,
  )
  const { setRoutineFormAnswers } = useRoutineFormAnswers()

  const buttonReference = useRef<HTMLButtonElement>(null)

  const afterQuestion = () => {
    setShowedQuestion((currentValue) => currentValue + 1)
  }

  const { size } = useRecoilValue(currentRoutinePropertiesAtom)

  const handleClick = () => {
    if (size && currentQuestionIndex < size - 1) afterQuestion()
    if (size && currentQuestionIndex === size - 1) setRoutineFormAnswers()
  }

  useEffect(() => {
    if (buttonReference.current) {
      buttonReference.current.focus()
    }
  }, [])

  const comeBack = () => {
    setShowedQuestion((currentQuestionIndex) => currentQuestionIndex - 1)
  }

  return (
    <Flex alignItems="center">
      <Button
        ref={buttonReference}
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
      {currentQuestionIndex > 0 && (
        <Box position="absolute" right={12} bottom={12} display="flex" gap={1}>
          {currentQuestionIndex > 0 && (
            <StyledButton onClick={comeBack}>
              <OpenArrowUp desc={intl.formatMessage(messages.previousQuestionButtonFormIconDesc)} />
            </StyledButton>
          )}

          {size && currentQuestionIndex < size - 1 && (
            <StyledButton onClick={handleClick}>
              <OpenArrowDown desc={intl.formatMessage(messages.afterQuestionButtonFormIconDesc)} />
            </StyledButton>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default SubmitAnswerButton
