import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Flex,
} from '@chakra-ui/react'
import React from 'react'

import { OpenArrowUp } from 'src/components/Icon'

interface RoutineDrawerProperties {
  children?: JSX.Element
  isOpen: boolean
  onClose: () => void
  onPass: () => void
  onBack: () => void
  index: number
}

const RoutineDrawer = ({
  children,
  isOpen,
  onClose,
  onPass,
  onBack,
  index,
}: RoutineDrawerProperties) => {
  return (
    <Drawer isOpen={isOpen} placement="bottom" size="full" onClose={onClose}>
      <DrawerContent display="flex" alignItems="center" bg="new-gray.300">
        <DrawerCloseButton />
        <DrawerBody
          maxW="690px"
          minW="540px"
          display="flex"
          flexDir="column"
          justifyContent="center"
          gap={20}
        >
          {children}
          <Flex alignItems="center">
            <Button
              p="20px 24px"
              color="black.50"
              bg="brand.500"
              fontSize={18}
              fontWeight="medium"
              onClick={onPass}
            >
              {index > 1 ? 'Próximo' : 'Começar'}
            </Button>
            <span style={{ marginLeft: '12px', color: '#8491B0', fontSize: 14 }}>
              Aperte <b>Enter &#x23CE; &nbsp;</b>
            </span>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Box>
            <Button
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="42px"
              height="32px"
              borderRadius={4}
              bg="brand.500"
            >
              <OpenArrowUp desc="arrow-up" />
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default RoutineDrawer
