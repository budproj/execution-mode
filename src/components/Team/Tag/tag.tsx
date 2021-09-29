import { Tag, TagLabel, TagProps, TagCloseButton, TagRightIcon, Spinner } from '@chakra-ui/react'
import React, { forwardRef, RefObject, useState } from 'react'

interface TeamTagProperties extends TagProps {
  isLoading?: boolean
  onClose?: () => void
}

const TeamTag = forwardRef(
  (
    { children, isLoading, onClose, ...rest }: TeamTagProperties,
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
        bg="new-gray.300"
        color="gray.500"
        textTransform="uppercase"
        fontWeight={500}
        fontSize="sm"
        borderRadius={4}
        p={2}
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
  onClose: undefined,
}

export default TeamTag
