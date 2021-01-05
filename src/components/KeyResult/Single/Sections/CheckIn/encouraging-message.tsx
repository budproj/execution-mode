import { Collapse, Text } from '@chakra-ui/react'
import React from 'react'

export interface EncouragingMessageProperties {
  isOpen?: boolean
}

const EncouragingMessage = ({ isOpen }: EncouragingMessageProperties) => (
  <Collapse in={isOpen}>
    <Text color="green.400" fontWeight={500}>
      Wooow! Continue assim, Você está com tudo! 🔥
    </Text>
  </Collapse>
)

export default EncouragingMessage
