import {
  Editable,
  Stack,
  EditablePreview,
  EditableInput,
  Skeleton,
  EditableProps,
  Box,
} from '@chakra-ui/react'
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
  value?: string | null
  onSubmit?: EditableProps['onSubmit']
  isSubmitting?: boolean
}

const EditableInputValue = ({
  value,
  customFallbackValue,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
  onSubmit,
  isSubmitting,
}: EditableInputValueProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()

  const placeholder = customFallbackValue ?? intl.formatMessage(messages.fallbackValue)
  const defaultValue = value ?? placeholder
  const defaultColor = value && !isSubmitting ? 'black.900' : 'gray.400'

  const handleHover = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleStopHover = () => {
    if (isHovering) setIsHovering(false)
  }

  // TECH DEBT: Until https://github.com/chakra-ui/chakra-ui/issues/3497 is fixed we can't update
  // Editable defaultValue prop. So, we must conditional render it
  return (
    <Skeleton
      isLoaded={isLoaded}
      {...buildSkeletonMinSize(isLoaded, skeletonWidth, skeletonHeight)}
    >
      {isLoaded ? (
        <Editable
          placeholder={placeholder}
          defaultValue={defaultValue}
          isDisabled={isSubmitting}
          onSubmit={onSubmit}
        >
          {({ isEditing, onEdit }) => (
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                cursor={isSubmitting ? 'auto' : 'pointer'}
                onMouseEnter={handleHover}
                onMouseLeave={handleStopHover}
                onClick={isSubmitting ? undefined : onEdit}
              >
                <EditablePreview
                  fontSize="md"
                  color={isHovering && !isSubmitting ? 'brand.500' : defaultColor}
                  fontWeight={400}
                  cursor={isSubmitting ? 'auto' : 'pointer'}
                />
                <PenIcon
                  fill="brand.400"
                  opacity={isHovering && !isEditing && !isSubmitting ? 1 : 0}
                  display={isEditing || isSubmitting ? 'none' : 'inherit'}
                  transition="opacity .2s ease-out"
                  desc={intl.formatMessage(messages.editableIconDesc)}
                  title={intl.formatMessage(messages.editableIconTitle)}
                />
              </Stack>
              <EditableInput />
            </>
          )}
        </Editable>
      ) : (
        <Box />
      )}
    </Skeleton>
  )
}

EditableInputValue.defaultProps = {
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableInputValue
