import { Button, Box, BoxProps } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

interface CustomDrawerProperties {
  drawerHeight: BoxProps['height']
  onOpen?: () => void
  onClose?: () => void
  showCloseButton?: boolean
  children?: React.FC
}

const CustomDrawer = ({
  drawerHeight,
  children,
  showCloseButton,
  onClose,
  onOpen,
  ...rest
}: CustomDrawerProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState<boolean>()

  const handleClose = () => {
    if (onClose) onClose()
    setIsVisible(false)
  }

  const handleOpen = () => {
    if (onOpen) onOpen()
    setIsVisible(true)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen((previousState) => {
        const newIsOpen = !previousState
        return newIsOpen
      })
    }, 350)

    return () => clearTimeout(timeout)
  }, [isVisible])

  return (
    <Box>
      {isOpen && (
        <Box
          position="absolute"
          width="100%"
          height={drawerHeight}
          zIndex={8}
          bg="new-gray.300"
          transition="transform .35s ease-in-out"
          transform={isVisible ? 'translateY(0)' : 'translateY(100%)'}
          {...rest}
        >
          <header>{showCloseButton && <Button onClick={handleClose}>X</Button>}</header>
          {children}
        </Box>
      )}
    </Box>
  )
}

export default CustomDrawer
