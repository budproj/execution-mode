import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { currentRoutinePropertiesAtom } from 'src/state/recoil/routines/current-routine-properties'

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 32px;
  border-radius: 4px;
  background-color: #6f6eff;
`

interface RoutineDrawerProperties {
  children?: JSX.Element
  isOpen: boolean
  formSize: number
  onClose: () => void
  index: number
  answer?: string
  setAnswer?: (index: number, answer: string) => void
}

const RoutineDrawer = ({
  children,
  isOpen,
  formSize,
  onClose,
  setAnswer,
  index,
  answer,
}: RoutineDrawerProperties) => {
  const [_, setCurrentRoutineProperties] = useRecoilState(currentRoutinePropertiesAtom)

  useEffect(() => setCurrentRoutineProperties({ size: formSize }), [formSize])

  return (
    <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
      <DrawerContent display="flex" alignItems="center" bg="new-gray.300" position="relative">
        <DrawerCloseButton />
        <DrawerBody
          width="690px"
          minW="540px"
          display="flex"
          flexDir="column"
          justifyContent="center"
          gap={6}
        >
          <Box minHeight={260}>{children}</Box>
          {/* {index < formSize && (
            <Flex alignItems="center">
              <Button
                p="20px 24px"
                color="black.50"
                bg="brand.500"
                fontSize={18}
                fontWeight="medium"
                type="submit"
                onClick={onPass}
              >
                {index > 1 ? (index === formSize - 1 ? 'Enviar' : 'Próximo') : 'Começar'}
              </Button>
              <span style={{ marginLeft: '12px', color: '#8491B0', fontSize: 14 }}>
                Aperte <b>Enter &#x23CE; &nbsp;</b>
              </span>
            </Flex>
          )} */}
        </DrawerBody>
        {/* 
        <DrawerFooter>
          {index > 0 && (
            <Box position="absolute" right={12} bottom={12} display="flex" gap={1}>
              <StyledButton onClick={onBack}>
                <OpenArrowUp desc="arrow-up" />
              </StyledButton>

              <StyledButton onClick={onPass}>
                <OpenArrowDown desc="arrow-down" />
              </StyledButton>
            </Box>
          )}
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}

export default RoutineDrawer
