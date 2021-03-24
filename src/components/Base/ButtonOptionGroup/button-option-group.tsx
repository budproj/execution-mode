import { ButtonGroup, ButtonGroupProps } from '@chakra-ui/button'
import xor from 'lodash/xor'
import React, { useState } from 'react'

export interface ButtonOptionGroupProperties {
  children: ButtonGroupProps['children']
  onChange?: (values: string[]) => void
}

interface ButtonOptionEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  target: ButtonOptionTarget
}

interface ButtonOptionTarget extends EventTarget {
  value?: string
  textContent: string
}

const ButtonOptionGroup = ({ children, onChange }: ButtonOptionGroupProperties) => {
  const [values, setValue] = useState<string[]>([])

  const handleClickCapture = (event: ButtonOptionEvent) => {
    const newRawValues = [event.target.value ?? event.target.textContent]
    const newToggledValues = xor(values, newRawValues)

    setValue(newToggledValues)
    if (onChange) onChange(newToggledValues)
  }

  const activableChildren = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          isActive: values.includes(child.props.value),
        })
      : child,
  )

  return <ButtonGroup onClickCapture={handleClickCapture}>{activableChildren}</ButtonGroup>
}

export default ButtonOptionGroup
