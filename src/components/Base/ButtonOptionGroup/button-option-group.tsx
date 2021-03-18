import { ButtonGroup, ButtonGroupProps } from '@chakra-ui/button'
import xor from 'lodash/xor'
import React, { useState } from 'react'

export interface ButtonOptionGroupProperties {
  children: ButtonGroupProps['children']
}

interface ButtonOptionEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  target: ButtonOptionTarget
}

interface ButtonOptionTarget extends EventTarget {
  value?: string
  textContent: string
}

const ButtonOptionGroup = ({ children }: ButtonOptionGroupProperties) => {
  const [value, setValue] = useState<string[]>([])

  const handleClickCapture = (event: ButtonOptionEvent) => {
    const newRawValue = [...value, event.target.value ?? event.target.textContent]
    const newToggledValue = xor(value, newRawValue)

    setValue(newToggledValue)
  }

  return <ButtonGroup onClickCapture={handleClickCapture}>{children}</ButtonGroup>
}

export default ButtonOptionGroup
