import { Tag, TagLabel, TagProps, TagCloseButton, TagRightIcon, Spinner } from '@chakra-ui/react'
import React, { forwardRef, RefObject, useState } from 'react'

interface TeamTagProperties extends TagProps {
  isLoading?: boolean
  isActive?: boolean
  onClose?: () => void
}

const TeamTag = forwardRef(
  (
    { children, isLoading, isActive, onClose, ...rest }: TeamTagProperties,
    reference:
      | string
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null,
  ) => {
    const [wasClosed, setWasClosed] = useState(false)

    const handleClose = () => {
      setWasClosed(true)
      onClose?.()
    }

    return (
      <Tag
        ref={reference}
        bg={isActive ? 'new-gray.300' : 'new-gray.200'}
        color={isActive ? 'new-gray.700' : 'new-gray.500'}
        textTransform="uppercase"
        fontWeight={500}
        fontSize="sm"
        borderRadius={4}
        p={2}
        py={1}
        {...rest}
      >
        <TagLabel>{children}</TagLabel>
        {Boolean(onClose) && !wasClosed && (
          <TagCloseButton opacity={1} fontSize="md" onClick={handleClose}>
            ×
          </TagCloseButton>
        )}
        {isLoading && wasClosed && <TagRightIcon as={Spinner} />}
      </Tag>
    )
  },
)

TeamTag.defaultProps = {
  isLoading: false,
  isActive: true,
  onClose: undefined,
}

export default TeamTag
