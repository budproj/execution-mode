import { Input } from '@chakra-ui/react'
import { Box, Stack } from '@chakra-ui/react'
import { FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import { StyledDescription } from '../Base/Sections/description'

import messages from './messages'

interface DescriptionProperties {
  keyword: string
  description?: string
  isValid: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Description = ({ keyword, description, isValid, onChange }: DescriptionProperties) => {
  const intl = useIntl()

  return (
    <Stack spacing={8}>
      <StyledDescription>{description}</StyledDescription>

      <Box w="full" pb={8}>
        <FormLabel fontWeight={500} fontSize="sm" color="gray.500">
          {intl.formatMessage(messages.inputLabel)}
        </FormLabel>
        <Input
          placeholder={intl.formatMessage(messages.inputPlaceholder, { keyword })}
          isInvalid={!isValid}
          color={isValid ? 'black.900' : 'red.500'}
          onChange={onChange}
        />
      </Box>
    </Stack>
  )
}
