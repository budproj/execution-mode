import { InputGroup, InputProps, InputRightElement, Spinner, Input } from '@chakra-ui/react'
import React, { ComponentType } from 'react'

export interface InputWithLoaderProperties extends InputProps {
  isLoading: boolean
  InputComponent: ComponentType
}

const InputWithLoader = ({ isLoading, InputComponent, ...rest }: InputWithLoaderProperties) => (
  <InputGroup>
    <InputComponent {...rest} />
    <InputRightElement p={0}>
      {isLoading && <Spinner size="sm" color="black.100" />}
    </InputRightElement>
  </InputGroup>
)

InputWithLoader.defaultProps = {
  isLoading: false,
  InputComponent: Input,
}

export default InputWithLoader
