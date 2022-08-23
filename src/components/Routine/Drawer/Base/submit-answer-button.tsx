import { Box, Button, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { OpenArrowDown, OpenArrowUp } from 'src/components/Icon'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routines/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 32px;
  border-radius: 4px;
  background-color: #6f6eff;
`

interface SubmitAnswerButton {
  previousQuestionIndex?: number
}

const SubmitAnswerButton = ({ previousQuestionIndex = 1 }: SubmitAnswerButton) => {
  const [showedQuestion, setShowedQuestion] = useRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const buttonReference = useRef<HTMLButtonElement>(null)

  const { size } = useRecoilValue(currentRoutinePropertiesAtom)

  useEffect(() => {
    if (buttonReference.current) {
      buttonReference.current.focus()
    }
  }, [])

  const comeBack = () => {
    setShowedQuestion((actual) => actual - previousQuestionIndex)
  }

  return (
    <Flex alignItems="center">
      {size && showedQuestion < size && (
        <>
          <Button
            ref={buttonReference}
            p="20px 24px"
            color="black.50"
            bg="brand.500"
            fontSize={18}
            fontWeight="medium"
            type="submit"
            _hover={{}}
          >
            {showedQuestion > 1 ? (showedQuestion === size - 1 ? 'Enviar' : 'Próximo') : 'Começar'}
          </Button>
          <span style={{ marginLeft: '12px', color: '#8491B0', fontSize: 14 }}>
            Aperte <b>Enter &#x23CE; &nbsp;</b>
          </span>
        </>
      )}
      {showedQuestion > 0 && (
        <Box position="absolute" right={12} bottom={12} display="flex" gap={1}>
          {showedQuestion > 1 && (
            <StyledButton onClick={comeBack}>
              <OpenArrowUp desc="arrow-up" />
            </StyledButton>
          )}

          {size && showedQuestion < size && (
            <StyledButton type="submit">
              <OpenArrowDown desc="arrow-down" />
            </StyledButton>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default SubmitAnswerButton
