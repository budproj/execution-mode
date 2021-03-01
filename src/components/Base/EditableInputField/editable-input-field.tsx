import {
  Stack,
  FormLabel,
  StackProps,
  Skeleton,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

export interface EditableInputFieldProperties extends StackProps {
  label: string
  isLoaded: boolean
  skeletonWidth: number
  skeletonHeight: number
  customFallbackValue?: string
  value?: string
}

const EditableInputField = ({
  label,
  value,
  customFallbackValue,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
  ...rest
}: EditableInputFieldProperties) => {
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
    <Stack direciton="column" w="full" spacing={0} {...rest}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
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
              onMouseEnter={handleHover}
              onMouseLeave={handleStopHover}
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
                cursor="pointer"
                onClick={onEdit}
              />
            </Stack>
            <EditableInput />
          </Skeleton>
        )}
      </Editable>
    </Stack>
  )
}

EditableInputField.defaultProps = {
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableInputField
