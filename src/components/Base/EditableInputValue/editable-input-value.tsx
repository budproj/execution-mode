import {
  Editable,
  EditablePreview,
  EditableInput,
  Skeleton,
  EditableProps,
  Box,
  EditablePreviewProps,
  Button,
  useTheme,
  HStack,
  Stack,
} from '@chakra-ui/react'
import React, { useEffect, useState, KeyboardEvent } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

import { EditableControls } from '../EditableControls/wrapper'

import messages from './messages'

export interface EditableInputValueProperties {
  isLoaded: boolean
  skeletonWidth: number
  skeletonHeight: number
  customFallbackValue?: string
  value?: string | null
  onSubmit?: EditableProps['onSubmit']
  isSubmitting?: boolean
  previewProperties?: EditablePreviewProps
  maxCharacters?: number
  isTruncated?: boolean
  isDisabled?: boolean
  startWithEditView?: boolean
  autoFocus?: boolean
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onStartEdit?: () => void
  onStopEdit?: () => void
  onCancel?: (oldValue?: string) => void
  hideControls?: boolean
}

const truncateValue = (value?: string | null, maxCharacters?: number): string =>
  maxCharacters && value ? `${value.slice(0, maxCharacters)}...` : value ?? ''

const EditableInputValue = ({
  value,
  customFallbackValue,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
  onSubmit,
  isSubmitting,
  previewProperties,
  maxCharacters,
  isTruncated,
  isDisabled,
  startWithEditView,
  autoFocus,
  onKeyDown,
  onStartEdit,
  onStopEdit,
  hideControls,
  onCancel,
}: EditableInputValueProperties) => {
  const intl = useIntl()

  isTruncated ??= Boolean(maxCharacters)
  customFallbackValue ??= intl.formatMessage(messages.fallbackValue)

  const [isHovering, setIsHovering] = useState(false)
  const [isExpanded, setIsExpanded] = useState(!isTruncated)
  const [expandedValue, setExpandedValue] = useState(value ?? customFallbackValue)
  const [truncatedValue, setTruncatedValue] = useState(
    truncateValue(value, maxCharacters) ?? customFallbackValue,
  )
  const [currentValue, setCurrentValue] = useState(value ?? customFallbackValue)
  const { components } = useTheme()

  const defaultColor =
    currentValue === customFallbackValue || isSubmitting ? 'gray.400' : 'black.900'
  const isWithinMaxCharacters = maxCharacters ? expandedValue.length <= maxCharacters : true
  const isLocked = isDisabled ?? isSubmitting

  const handleHover = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleStopHover = () => {
    if (isHovering) setIsHovering(false)
  }

  const handleEdit = () => {
    setIsExpanded(true)
    if (onStartEdit) onStartEdit()
  }

  const handleChange = (value: string) => {
    setCurrentValue(value)
  }

  const handleSubmit = (value: string) => {
    setExpandedValue(value)
    setTruncatedValue(truncateValue(value, maxCharacters))
    setIsExpanded(!isTruncated)

    if (onSubmit) onSubmit(value)
    if (onStopEdit) onStopEdit()
  }

  const handleCancel = (oldValue?: string) => {
    if (onCancel) onCancel(oldValue)
    if (onStopEdit) onStopEdit()
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    setCurrentValue(isWithinMaxCharacters || isExpanded ? expandedValue : truncatedValue)
  }, [isExpanded, expandedValue, truncatedValue, isWithinMaxCharacters])

  useEffect(() => {
    setExpandedValue(value ?? (customFallbackValue as string))
    setTruncatedValue(truncateValue(value, maxCharacters) ?? customFallbackValue)
    setIsExpanded(!isTruncated)
  }, [
    value,
    setExpandedValue,
    setTruncatedValue,
    setIsExpanded,
    customFallbackValue,
    maxCharacters,
    isTruncated,
  ])

  const isDisableFix = isDisabled
    ? {
        color: previewProperties?.color ?? defaultColor,
        fontSize: previewProperties?.fontSize ?? 'lg',
        fontWeight: previewProperties?.fontWeight ?? 400,
        px: 0,
        py: '0.3rem',
        cursor: 'text',
      }
    : {}

  return (
    <Skeleton
      isLoaded={isLoaded}
      fadeDuration={0}
      {...buildSkeletonMinSize(isLoaded, skeletonWidth, skeletonHeight)}
    >
      {isLoaded ? (
        <Editable
          submitOnBlur={Boolean(hideControls)}
          value={currentValue}
          isPreviewFocusable={!isLocked}
          isDisabled={isLocked}
          startWithEditView={startWithEditView}
          cursor={isLocked ? 'auto' : 'pointer'}
          onSubmit={handleSubmit}
          onEdit={handleEdit}
          onChange={handleChange}
          onCancel={handleCancel}
          onMouseEnter={handleHover}
          onMouseLeave={handleStopHover}
        >
          {({ isEditing }) => (
            <Stack alignItems="flex-start" justifyItems="center" spacing={0}>
              <HStack w="full">
                <Box w="full">
                  <EditablePreview
                    lineHeight="1.25rem"
                    fontSize="md"
                    color={isHovering && !isLocked ? 'brand.500' : defaultColor}
                    fontWeight={400}
                    cursor={isLocked ? 'auto' : 'pointer'}
                    wordBreak="break-word"
                    py={0}
                    {...previewProperties}
                  />
                  <EditableInput
                    autoFocus={autoFocus}
                    borderWidth={isDisabled ? 0 : components.Editable.baseStyle.input.borderWidth}
                    onKeyDown={onKeyDown}
                    {...isDisableFix}
                  />
                </Box>

                {!isDisabled && !hideControls && (
                  <EditableControls isHovering={isHovering} isLocked={isLocked} />
                )}
              </HStack>

              {isTruncated && !isWithinMaxCharacters && !isEditing && (
                <Button p={0} colorScheme="brand" fontWeight={400} onClick={toggleExpanded}>
                  {intl.formatMessage(messages[isExpanded ? 'collapseButton' : 'expandButton'])}
                </Button>
              )}
            </Stack>
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
