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
}

export const RadioProgress = ({
  isLoaded,
  size,
  progress,
  color,
  trackColor,
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
        color={color}
        trackColor={trackColor}
        size={size}
      >
        <CircularProgressLabel color={color} fontWeight={700} fontSize="md">
          {intl.formatNumber(progress / 100, { style: 'percent' })}
        </CircularProgressLabel>
      </CircularProgress>
    </SkeletonCircle>
  )
}
