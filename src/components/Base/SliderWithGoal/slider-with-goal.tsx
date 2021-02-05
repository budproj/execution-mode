import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface SliderWithGoalProperties extends SliderProps {
  trackThickness: string
  trackColor: string
  thumbHeight: string
}

const SliderWithGoal = ({
  trackColor,
  trackThickness,
  thumbHeight,
  value,
  isDisabled,
  ...rest
}: SliderWithGoalProperties) => {
  const intl = useIntl()
  const isAlmostAtTheBeginningOfTheTrack = value === 0 || (value && value < 5)
  const isAlmostAtTheEndOfTheTrack = value && value > 93

  return (
    <Slider
      role="group"
      isDisabled={isDisabled}
      value={value}
      _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
      {...rest}
    >
      <SliderTrack
        h={trackThickness}
        bg="gray.100"
        borderRadius="full"
        _disabled={{ bg: 'gray.100' }}
      >
        <SliderFilledTrack bg={trackColor} borderRadius="full" borderRightRadius="0" />
      </SliderTrack>

      <SliderThumb
        bg={trackColor}
        w="4px"
        h={thumbHeight}
        _disabled={{ opacity: 1 }}
        _focus={{ boxShadow: 'none', outline: 'none' }}
      >
        <Box
          position="absolute"
          top={thumbHeight}
          left={isAlmostAtTheEndOfTheTrack ? '-80px' : '5px'}
          textAlign={isAlmostAtTheEndOfTheTrack ? 'right' : 'left'}
        >
          <Text color={trackColor} fontWeight={700}>
            {Math.round(value ?? 0)}%
          </Text>

          <Text fontSize="xs" color="gray.200" fontWeight={400} width="max-content">
            {intl.formatMessage(messages.currentProgress)}
          </Text>
        </Box>
      </SliderThumb>

      <SliderThumb
        bg="gray.300"
        w="4px"
        h={thumbHeight}
        left="80%!important" // Need to use !important since Chakra does not support using 2 thumbs
        _disabled={{ opacity: 1 }}
        _focus={{ boxShadow: 'none', outline: 'none' }}
      >
        <Box position="absolute" top={thumbHeight} left="5px">
          <Text color="gray.200" fontWeight={700}>
            80%
          </Text>

          <Text fontSize="xs" color="gray.200" fontWeight={400} width="max-content">
            {intl.formatMessage(messages.goal)}
          </Text>
        </Box>
      </SliderThumb>

      <Text
        color="gray.200"
        fontWeight={700}
        position="absolute"
        top={thumbHeight}
        visibility={isAlmostAtTheBeginningOfTheTrack ? 'hidden' : 'visible'}
      >
        0%
      </Text>

      <Text
        color="gray.200"
        fontWeight={700}
        position="absolute"
        top={thumbHeight}
        right={0}
        visibility={isAlmostAtTheEndOfTheTrack ? 'hidden' : 'visible'}
      >
        100%
      </Text>
    </Slider>
  )
}

SliderWithGoal.defaultProps = {
  value: 0,
  trackColor: 'brand.400',
  trackThickness: '8px',
  thumbHeight: '14px',
  isDisabled: true,
}

export default SliderWithGoal
