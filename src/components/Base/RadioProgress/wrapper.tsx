import {
  CircularProgress,
  CircularProgressLabel,
  CircularProgressProps,
  SkeletonCircle,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

interface RadioProgressProperties {
  color?: CircularProgressProps['color']
  trackColor?: CircularProgressProps['trackColor']
  progress?: number
  isLoaded?: boolean
  size?: CircularProgressProps['size']
  isDisabled?: boolean
}

export const RadioProgress = ({
  isLoaded,
  size,
  progress,
  color,
  trackColor,
  isDisabled,
}: RadioProgressProperties) => {
  progress ??= 0
  size ??= 14
  isLoaded ??= true

  const intl = useIntl()

  return (
    <SkeletonCircle isLoaded={isLoaded} w="auto" h="auto">
      <CircularProgress
        value={progress}
        thickness={6}
        color={isDisabled ? 'gray.200' : color}
        trackColor={isDisabled ? 'gray.100' : trackColor}
        size={size}
      >
        <CircularProgressLabel
          color={isDisabled ? 'gray.300' : color}
          fontWeight={700}
          fontSize="md"
        >
          {intl.formatNumber(progress / 100, { style: 'percent' })}
        </CircularProgressLabel>
      </CircularProgress>
    </SkeletonCircle>
  )
}
