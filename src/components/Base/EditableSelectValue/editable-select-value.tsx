import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuProps, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

export interface EditableSelectValueProperties extends MenuProps {
  onChange: (value: string | string[]) => void
  value?: string
  placeholder?: string
  customFallbackPlaceholder?: string
  isLoaded?: boolean
  isSubmitting?: boolean
}

const EditableSelectValue = ({
  id,
  onChange,
  value,
  placeholder,
  customFallbackPlaceholder,
  children,
  isSubmitting,
}: EditableSelectValueProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()

  const fallbackPlaceholder =
    customFallbackPlaceholder ?? intl.formatMessage(messages.fallbackPlaceholder)
  const defaultColor = value ? 'black.900' : 'gray.400'

  const handleStartHover = () => {
    setIsHovering(true)
  }

  const handleEndHover = () => {
    setIsHovering(false)
  }

  return (
    <Menu>
      <MenuButton
        id={id}
        as={Text}
        fontSize="md"
        fontWeight={400}
        color={isHovering ? 'brand.500' : defaultColor}
        py={1}
        cursor="pointer"
        onMouseEnter={handleStartHover}
        onMouseLeave={handleEndHover}
      >
        {placeholder ?? fallbackPlaceholder}
        <PenIcon
          fill="brand.400"
          opacity={isHovering ? 1 : 0}
          display={isSubmitting ? 'none' : 'inherit'}
          transition="opacity .2s ease-out"
          desc={intl.formatMessage(messages.editableIconDesc)}
          title={intl.formatMessage(messages.editableIconTitle)}
          ml={2}
        />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={value} type="radio" onChange={onChange}>
          {children}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default EditableSelectValue
