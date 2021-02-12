import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertProps,
  AlertTitle,
  Box,
  BoxProps,
  CloseButton,
  Collapse,
  Flex,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

export interface AlertProperties {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  autoHide: boolean
  autoHideTTLInMilliseconds: number
  status?: AlertProps['status']
  variant?: AlertProps['variant']
  wrapperPadding?: BoxProps['p']
  wrapperPaddingBottom?: BoxProps['pb']
}

const Alert = ({
  title,
  description,
  isOpen,
  onClose,
  status,
  variant,
  wrapperPadding,
  wrapperPaddingBottom,
  autoHide,
  autoHideTTLInMilliseconds,
}: AlertProperties) => {
  useEffect(() => {
    if (isOpen && autoHide && onClose) setTimeout(() => onClose(), autoHideTTLInMilliseconds)
  }, [isOpen, autoHide, onClose, autoHideTTLInMilliseconds])

  return (
    <Collapse in={isOpen}>
      <Box p={wrapperPadding} pb={wrapperPaddingBottom ?? wrapperPadding}>
        <ChakraAlert status={status} variant={variant}>
          <Flex direction="column" gridGap={1} color="gray.700">
            <AlertTitle fontSize="md">{title}</AlertTitle>
            <AlertDescription fontSize="sm">{description}</AlertDescription>
          </Flex>

          <CloseButton
            position="absolute"
            top={1}
            right={1}
            color="green.200"
            _hover={{
              bg: 'transparent',
              color: 'green.500',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            onClick={onClose}
          />
        </ChakraAlert>
      </Box>
    </Collapse>
  )
}

Alert.defaultProps = {
  autoHide: true,
  autoHideTTLInMilliseconds: 5000,
}

export default Alert
