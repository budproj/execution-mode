import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface SliderProperties extends SliderProps {
  trackColor?: string
}

const Slider = ({ trackColor, ...rest }: SliderProperties): ReactElement => {
  const intl = useIntl()

  return (
    <ChakraSlider role="group" focusThumbOnChange={false} {...rest}>
      <SliderTrack h="8px" bg="gray.100" borderRadius="full">
        <SliderFilledTrack bg={trackColor} borderRadius="full" />
      </SliderTrack>

      <Tooltip label={intl.formatMessage(messages.updateLabel)} placement="top">
        <SliderThumb
          bg={trackColor}
          borderColor="white"
          borderWidth={2}
          w="22px"
          h="22px"
          transition="0.2s opacity ease-in-out"
          opacity={0}
          _groupHover={{ opacity: 1 }}
        />
      </Tooltip>
    </ChakraSlider>
  )
}

export default Slider
