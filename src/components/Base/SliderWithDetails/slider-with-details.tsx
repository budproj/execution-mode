import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderThumbProps,
  SliderTrack,
  SliderTrackProps,
  SliderMark,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'

import messages from './messages'

export interface SliderWithDetailsProperties extends SliderProps {
  trackThickness: SliderTrackProps['h']
  trackColor: SliderTrackProps['color']
  thumbWeight?: SliderThumbProps['w']
  thumbHeight?: SliderThumbProps['h']
  thumbColor?: SliderTrackProps['color']
  thumbPositionTop?: number
  showSliderDetails?: boolean
  showThumb?: boolean
  projectedProgress?: number
}

const SliderWithDetails = ({
  trackColor,
  trackThickness,
  thumbHeight,
  thumbWeight = '4px',
  value,
  isDisabled,
  thumbColor,
  showSliderDetails = true,
  showThumb = true,
  thumbPositionTop = 0,
  projectedProgress = 0,
  ...rest
}: SliderWithDetailsProperties) => {
  const intl = useIntl()
  const isAlmostAtTheBeginningOfTheTrack = value === 0 || (value && value < 5)
  const isAlmostAtTheEndOfTheTrack = value && value > 93

  return (
    <Flex position="relative" alignItems="center">
      <Slider
        role="group"
        isDisabled={isDisabled}
        value={value}
        _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
        {...rest}
      >
        <SliderTrack
          h={trackThickness}
          bg="black.200"
          borderRadius="full"
          _disabled={{ bg: 'black.200' }}
        >
          <SliderFilledTrack bg={trackColor} borderRadius="full" borderRightRadius="0" />
        </SliderTrack>

        {showThumb && (
          <SliderThumb
            bg={thumbColor ?? trackColor}
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
                {value?.toFixed() ?? '-'}%
              </Text>

              <Text fontSize="xs" color="gray.300" fontWeight={400} width="max-content">
                {intl.formatMessage(messages.progress)}
              </Text>
            </Box>
          </SliderThumb>
        )}

        {showSliderDetails && !isAlmostAtTheBeginningOfTheTrack && (
          <SliderMark value={0} mt={3} color="black.500" fontWeight={700}>
            0%
          </SliderMark>
        )}

        {showSliderDetails && !isAlmostAtTheEndOfTheTrack && (
          <SliderMark value={100} mt={3} ml="-2.5rem" color="black.500" fontWeight={700}>
            100%
          </SliderMark>
        )}
      </Slider>

      {projectedProgress ? (
        <TooltipWithDelay
          label={intl.formatMessage(messages.projectProgressTooltip, {
            progress: projectedProgress.toFixed(),
          })}
          placement="bottom-end"
          maxWidth="470px"
        >
          <Box
            position="absolute"
            bg="new-gray.600"
            w={thumbWeight}
            h={thumbHeight}
            borderRadius="xl"
            border="1px solid"
            borderColor="white"
            top={thumbPositionTop}
            left={`${projectedProgress.toFixed()}%`}
          />
        </TooltipWithDelay>
      ) : undefined}
    </Flex>
  )
}

SliderWithDetails.defaultProps = {
  value: 0,
  trackColor: 'brand.500',
  trackThickness: 2,
  thumbHeight: '14px',
  isDisabled: true,
}

export default SliderWithDetails
