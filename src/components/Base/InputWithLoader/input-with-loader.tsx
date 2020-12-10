import { InputGroup, InputProps, InputRightElement, Spinner, Input } from '@chakra-ui/react'
import React from 'react'

export interface InputWithLoaderProperties extends InputProps {
  isLoading: boolean
}

const InputWithLoader = ({ isLoading, ...rest }: InputWithLoaderProperties) => (
  <InputGroup>
    <Input {...rest} />
    <InputRightElement p={0}>
      {isLoading && <Spinner size="sm" color="gray.100" />}
    </InputRightElement>
  </InputGroup>
)

export default InputWithLoader
