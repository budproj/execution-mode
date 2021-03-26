import { useTheme } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import React from 'react'

const ProgressBar = () => {
  const { colors } = useTheme()

  return (
    <NextNProgress color={colors.brand[500]} height={4} startPosition={0.3} stopDelayMs={400} />
  )
}

export default ProgressBar
