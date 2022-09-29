import { Box, RadioProps, useRadio, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface RadioCardProperties {
  properties: RadioProps
  radioCardStyles?: BoxProps
  children: string | number
}

const RadioCard = ({ properties, radioCardStyles, children }: RadioCardProperties) => {
  const { getInputProps, getCheckboxProps } = useRadio(properties)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        backgroundColor="new-gray.800"
        transition="background-color .1s"
        color="white"
        minW="24px"
        h="24px"
        fontSize="18px"
        lineHeight="23px"
        borderRadius="3px"
        textAlign="center"
        position="relative"
        mt={5}
        _before={{
          content: '""',
          border: '2px solid',
          borderColor: 'new-gray.500',
          borderRadius: '5px',
          position: 'absolute',
          top: '-0.8rem',
          left: '-0.8rem',
          width: '100%',
          height: '100%',
          padding: '0.7rem',
          boxSizing: 'content-box',
        }}
        _checked={{
          bg: 'new-gray.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        {...radioCardStyles}
      >
        {children}
      </Box>
    </Box>
  )
}

export default RadioCard
