import { Editable, Stack, EditablePreview, EditableInput, Skeleton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

export interface EditableInputValueProperties {
  isLoaded: boolean
  skeletonWidth: number
  skeletonHeight: number
  customFallbackValue?: string
  value?: string
}

const EditableInputValue = ({
  value,
  customFallbackValue,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
}: EditableInputValueProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()

  const fallbackValue = customFallbackValue ?? intl.formatMessage(messages.fallbackValue)
  const defaultColor = value ? 'black.900' : 'gray.400'

  const handleHover = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleStopHover = () => {
    if (isHovering) setIsHovering(false)
  }

  return (
    <Editable defaultValue={fallbackValue} value={value}>
      {({ isEditing, onEdit }) => (
        <Skeleton
          isLoaded={isLoaded}
          {...buildSkeletonMinSize(isLoaded, skeletonWidth, skeletonHeight)}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            cursor="pointer"
            onMouseEnter={handleHover}
            onMouseLeave={handleStopHover}
            onClick={onEdit}
          >
            <EditablePreview
              fontSize="md"
              color={isHovering ? 'brand.500' : defaultColor}
              fontWeight={400}
              cursor="pointer"
            />
            <PenIcon
              fill="brand.400"
              opacity={isHovering && !isEditing ? 1 : 0}
              display={isEditing ? 'none' : 'inherit'}
              transition="opacity .2s ease-out"
              desc={intl.formatMessage(messages.editableIconDesc)}
              title={intl.formatMessage(messages.editableIconTitle)}
            />
          </Stack>
          <EditableInput />
        </Skeleton>
      )}
    </Editable>
  )
}

EditableInputValue.defaultProps = {
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableInputValue
