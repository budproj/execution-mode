import {
  Editable,
  Stack,
  EditablePreview,
  EditableInput,
  Skeleton,
  EditableProps,
  Box,
  EditablePreviewProps,
  Button,
  useTheme,
  HStack,
} from '@chakra-ui/react'
import React, { useEffect, useState, KeyboardEvent } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import PenIcon from 'src/components/Icon/Pen'

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
  showControls?: boolean
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
  showControls,
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

  const handleCancel = () => {
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
        fontSize: previewProperties?.fontSize ?? 'md',
        fontWeight: previewProperties?.fontWeight ?? 400,
        px: '0.125rem',
        py: '0.4rem',
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
          value={currentValue}
          isDisabled={isLocked}
          startWithEditView={startWithEditView}
          onSubmit={handleSubmit}
          onEdit={handleEdit}
          onChange={handleChange}
          onCancel={handleCancel}
        >
          {({ isEditing, onEdit }) => (
            <HStack>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  cursor={isLocked ? 'auto' : 'pointer'}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleStopHover}
                  onClick={isLocked ? undefined : onEdit}
                >
                  <EditablePreview
                    fontSize="md"
                    color={isHovering && !isLocked ? 'brand.500' : defaultColor}
                    fontWeight={400}
                    cursor={isLocked ? 'auto' : 'pointer'}
                    {...previewProperties}
                  />
                  <PenIcon
                    fill="brand.400"
                    opacity={isHovering && !isEditing && !isLocked ? 1 : 0}
                    display={isEditing || isLocked ? 'none' : 'inherit'}
                    transition="opacity .2s ease-out"
                    desc={intl.formatMessage(messages.editableIconDesc)}
                    title={intl.formatMessage(messages.editableIconTitle)}
                  />
                </Stack>

                {isTruncated && !isWithinMaxCharacters && !isEditing && (
                  <Button p={0} colorScheme="brand" fontWeight={400} onClick={toggleExpanded}>
                    {intl.formatMessage(messages[isExpanded ? 'collapseButton' : 'expandButton'])}
                  </Button>
                )}
              </Box>

              <EditableInput
                autoFocus={autoFocus}
                borderWidth={isDisabled ? 0 : components.Editable.baseStyle.input.borderWidth}
                onKeyDown={onKeyDown}
                {...isDisableFix}
              />

              {showControls && isEditing && <EditableControls />}
            </HStack>
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
