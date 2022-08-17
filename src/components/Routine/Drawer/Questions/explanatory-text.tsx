import { Stack } from '@chakra-ui/react'
import React from 'react'

interface ExplanatoryTextProperties {
  children?: JSX.Element
}

const ExplanatoryText = ({ children }: ExplanatoryTextProperties) => {
  return <Stack>{children}</Stack>
}

export default ExplanatoryText
