import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useRoutinesFormActions } from 'src/components/Base/RoutineFormActionsProvider/routine-form-actions-provider'
import { OpenArrowDown, OpenArrowUp } from 'src/components/Icon'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import messages from './messages'

interface RoutineDrawerProperties {
  children?: JSX.Element
  isOpen: boolean
  formSize: number
  onClose: () => void
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 32px;
  border-radius: 4px;
  background-color: #6f6eff;
`

const RoutineDrawer = ({ children, isOpen, formSize, onClose }: RoutineDrawerProperties) => {
  const { comeBack, handleClick } = useRoutinesFormActions()

  const [{ size }, setCurrentRoutineProperties] = useRecoilState(currentRoutinePropertiesAtom)
  const currentQuestionIndex = useRecoilValue(retrospectiveRoutineIndexQuestionAtom)
  const intl = useIntl()

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setCurrentRoutineProperties({ size: formSize }), [formSize])

  return (
    <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
      <DrawerContent display="flex" alignItems="center" bg="new-gray.300" position="relative">
        <DrawerCloseButton top={10} right={10} fontSize={20} color="new-gray.800" />
        <DrawerBody
          width="690px"
          minW="540px"
          display="flex"
          flexDir="column"
          justifyContent="center"
          gap={6}
        >
          <Box height={306}>{children}</Box>
          <Box position="absolute" right={12} bottom={12} display="flex" gap={1}>
            <StyledButton disabled={currentQuestionIndex < 1} _hover={{}} onClick={comeBack}>
              <OpenArrowUp desc={intl.formatMessage(messages.previousQuestionButtonFormIconDesc)} />
            </StyledButton>

            <StyledButton
              disabled={!(size && currentQuestionIndex < size - 1)}
              _hover={{}}
              onClick={handleClick}
            >
              <OpenArrowDown desc={intl.formatMessage(messages.afterQuestionButtonFormIconDesc)} />
            </StyledButton>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default RoutineDrawer
