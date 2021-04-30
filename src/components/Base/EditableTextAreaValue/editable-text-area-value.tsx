import {
  SkeletonText,
  Text,
  Textarea,
  Stack,
  Box,
  TextareaProps,
  TextProps,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import PenIcon from 'src/components/Icon/Pen'

import ExpandableText from '../ExpandableText'

import messages from './messages'

export interface EditableTextAreaValueProperties {
  isLoaded: boolean
  skeletonNumberOfLines: number
  customFallbackValue?: string
  value?: string
  onBlur?: TextareaProps['onBlur']
  isSubmitting?: boolean
  fontSize?: TextProps['fontSize']
  color?: TextProps['color']
  isTruncated?: boolean
  maxCharacters?: number
  isDisabled?: boolean
}

const autoSelectAll = (event: React.FocusEvent<HTMLTextAreaElement>) => {
  event.target.select()
}

// eslint-disable-next-line complexity
const EditableTextAreaValue = ({
  value,
  customFallbackValue,
  isLoaded,
  skeletonNumberOfLines,
  onBlur,
  isSubmitting,
  fontSize,
  color,
  isTruncated,
  maxCharacters,
  isDisabled,
}: EditableTextAreaValueProperties) => {
  isTruncated ??= Boolean(maxCharacters)

  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()

  const fallbackValue = customFallbackValue ?? intl.formatMessage(messages.fallbackValue)
  const defaultColor = value && !isSubmitting ? color : 'gray.400'
  const isLocked = isDisabled ?? isSubmitting
  const isEmpty = !value || value === ''

  const handleHover = () => {
    if (!isHovering && !isLocked) setIsHovering(true)
  }

  const handleStopHover = () => {
    if (isHovering && !isLocked) setIsHovering(false)
  }

  const handleStartEdit = () => {
    if (!isEditing && !isLocked) setIsEditing(true)
  }

  const handleStopEdit = () => {
    if (isEditing && !isLocked) setIsEditing(false)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (isLocked) return
    handleStopEdit()
    handleStopHover()
    if (onBlur) onBlur(event)
  }

  const previewProperties = {
    fontSize,
    color: isHovering && !isSubmitting ? 'brand.500' : defaultColor,
    fontWeight: 400,
    transition: '.2s color ease-out',
  }

  return (
    <SkeletonText noOfLines={skeletonNumberOfLines} spacing={2} isLoaded={isLoaded} w="full">
      {isEditing && !isLocked ? (
        <Textarea
          autoFocus
          defaultValue={value}
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
          cursor={isLocked ? 'auto' : 'pointer'}
        >
          {isTruncated ? (
            <ExpandableText
              text={isEmpty ? fallbackValue : value}
              maxCollapsedLength={maxCharacters}
              onClickPreview={isSubmitting ? undefined : handleStartEdit}
              onMouseEnterPreview={handleHover}
              onMouseLeavePreview={handleStopHover}
              {...previewProperties}
            />
          ) : (
            <Text
              onClick={isSubmitting ? undefined : handleStartEdit}
              onMouseEnter={handleHover}
              onMouseLeave={handleStopHover}
              {...previewProperties}
            >
              {value ?? fallbackValue}
            </Text>
          )}
          <Box pt={2} display={isEditing || isSubmitting ? 'none' : 'inherit'}>
            <PenIcon
              fill="brand.400"
              opacity={isHovering && !isEditing ? 1 : 0}
              display={isEditing || isSubmitting ? 'none' : 'inherit'}
              transition="opacity .2s ease-out"
              desc={intl.formatMessage(messages.editableIconDesc)}
              title={intl.formatMessage(messages.editableIconTitle)}
              onClick={isSubmitting ? undefined : handleStartEdit}
              onMouseEnter={handleHover}
              onMouseLeave={handleStopHover}
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
  color: 'black.900',
  fontSize: 'md',
}

export default EditableTextAreaValue
