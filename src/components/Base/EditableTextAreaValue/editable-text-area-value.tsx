import { SkeletonText, Text, Textarea, Stack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import PenIcon from 'src/components/Icon/Pen'

import messages from './messages'

export interface EditableTextAreaValueProperties {
  isLoaded: boolean
  skeletonNumberOfLines: number
  customFallbackValue?: string
  value?: string
}

const autoSelectAll = (event: React.FocusEvent<HTMLTextAreaElement>) => {
  event.target.select()
}

const EditableTextAreaValue = ({
  value,
  customFallbackValue,
  isLoaded,
  skeletonNumberOfLines,
}: EditableTextAreaValueProperties) => {
  const [isEditing, setIsEditing] = useState(false)
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

  const handleStartEdit = () => {
    if (!isEditing) setIsEditing(true)
  }

  const handleStopEdit = () => {
    if (isEditing) setIsEditing(false)
  }

  const handleBlur = () => {
    handleStopEdit()
  }

  return (
    <SkeletonText noOfLines={skeletonNumberOfLines} spacing={2} isLoaded={isLoaded}>
      {isEditing ? (
        <Textarea
          autoFocus
          value={value}
          px={2}
          py={1}
          _focus={{ boxShadow: 'none' }}
          _hover={{ borderColor: 'black.200' }}
          onBlur={handleBlur}
          onFocus={autoSelectAll}
        />
      ) : (
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          cursor="pointer"
          onMouseEnter={handleHover}
          onMouseLeave={handleStopHover}
          onClick={handleStartEdit}
        >
          <Text
            fontSize="md"
            color={isHovering ? 'brand.500' : defaultColor}
            fontWeight={400}
            transition=".2s color ease-out"
            py={1}
            borderWidth={2}
            borderColor="transparent"
          >
            {value ?? fallbackValue}
          </Text>
          <Box pt={2}>
            <PenIcon
              fill="brand.400"
              opacity={isHovering && !isEditing ? 1 : 0}
              display={isEditing ? 'none' : 'inherit'}
              transition="opacity .2s ease-out"
              desc={intl.formatMessage(messages.editableIconDesc)}
              title={intl.formatMessage(messages.editableIconTitle)}
            />
          </Box>
        </Stack>
      )}
    </SkeletonText>
  )
}

EditableTextAreaValue.defaultProps = {
  isLoaded: true,
  skeletonNumberOfLines: 3,
}

export default EditableTextAreaValue
