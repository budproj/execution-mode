import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { currentRoutinePropertiesAtom } from 'src/state/recoil/routines/current-routine-properties'

interface RoutineDrawerProperties {
  children?: JSX.Element
  isOpen: boolean
  formSize: number
  onClose: () => void
}

const RoutineDrawer = ({ children, isOpen, formSize, onClose }: RoutineDrawerProperties) => {
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
          <Box height={310}>{children}</Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default RoutineDrawer
