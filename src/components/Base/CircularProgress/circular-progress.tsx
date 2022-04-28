import {
  Skeleton,
  CircularProgress as ChakraCircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface CircularProgressProperties {
  isLoaded: boolean
  confidence: number
  progress: number
}

export const CircularProgress = ({
  confidence,
  progress,
  isLoaded,
}: CircularProgressProperties) => {
  const [confidenceConfig, setConfidenceConfig] = useConfidenceTag()

  const primaryColor = confidenceConfig?.color?.primary ?? 'gray.300'
  const lightColor = confidenceConfig?.color?.light ?? 'gray.50'

  useEffect(() => {
    setConfidenceConfig(confidence)
  }, [confidence, setConfidenceConfig])

  return (
    <Skeleton borderRadius={10} isLoaded={isLoaded}>
      <ChakraCircularProgress
        capIsRound
        thickness={6}
        trackColor={lightColor}
        value={progress}
        color={primaryColor}
      >
        <CircularProgressLabel fontWeight={800} color={primaryColor}>
          {Math.round(progress)}%
        </CircularProgressLabel>
      </ChakraCircularProgress>
    </Skeleton>
  )
}
