import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuProps,
  Text,
  Skeleton,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

export interface EditableSelectValueProperties extends MenuProps {
  onChange: (value: string | string[]) => void
  skeletonWidth: number
  skeletonHeight: number
  isLoaded: boolean
  value?: string
  placeholder?: string
  customFallbackPlaceholder?: string
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
  isLoaded,
  skeletonWidth,
  skeletonHeight,
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
    <Skeleton
      isLoaded={isLoaded}
      {...buildSkeletonMinSize(isLoaded, skeletonWidth, skeletonHeight)}
    >
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
    </Skeleton>
  )
}

EditableSelectValue.defaultProps = {
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableSelectValue
