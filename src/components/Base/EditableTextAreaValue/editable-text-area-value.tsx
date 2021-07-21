import { SkeletonText, Text, Textarea, Stack, Box, TextProps, IconButton } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import CheckIcon from 'src/components/Icon/Check'
import PenIcon from 'src/components/Icon/Pen'
import TimesIcon from 'src/components/Icon/Times'

import ExpandableText from '../ExpandableText'
import { Linkify } from '../Linkify/wrapper'

import messages from './messages'

export interface EditableTextAreaValueProperties {
  isLoaded: boolean
  skeletonNumberOfLines: number
  customFallbackValue?: string
  value?: string
  isSubmitting?: boolean
  fontSize?: TextProps['fontSize']
  color?: TextProps['color']
  isTruncated?: boolean
  maxCharacters?: number
  isDisabled?: boolean
  onSave?: (value?: string) => void
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
  isSubmitting,
  fontSize,
  color,
  isTruncated,
  maxCharacters,
  isDisabled,
  onSave,
}: EditableTextAreaValueProperties) => {
  isTruncated ??= Boolean(maxCharacters)

  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const input = useRef<HTMLTextAreaElement>(null)
  const intl = useIntl()

  const fallbackValue = customFallbackValue ?? intl.formatMessage(messages.fallbackValue)
  const defaultColor = value && !isSubmitting ? color : 'gray.400'
  const isLocked = isDisabled ?? isSubmitting
  const isEmpty = !value || value === ''

  const previewProperties = {
    fontSize,
    color: isHovering && !isSubmitting ? 'brand.500' : defaultColor,
    fontWeight: 400,
    transition: '.2s color ease-out',
  }

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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const handleSave = () => {
    if (isLocked) return

    const value = input?.current?.value

    handleStopEdit()
    handleStopHover()

    if (onSave) onSave(value)
  }

  const handleCancel = () => {
    handleStopEdit()
    handleStopHover()
    setInputValue(value)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value, setInputValue])

  return (
    <SkeletonText noOfLines={skeletonNumberOfLines} spacing={2} isLoaded={isLoaded} w="full">
      {isEditing && !isLocked ? (
        <Stack spacing={2}>
          <Textarea
            ref={input}
            autoFocus
            value={inputValue}
            px={2}
            py={1}
            _focus={{ boxShadow: 'none' }}
            _hover={{ borderColor: 'black.200' }}
            onFocus={autoSelectAll}
            onChange={handleChange}
          />
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              colorScheme="black"
              variant="solid"
              aria-label={intl.formatMessage(messages.cancelIconDesc)}
              icon={
                <TimesIcon
                  fill="currentColor"
                  desc={intl.formatMessage(messages.cancelIconDesc)}
                  title={intl.formatMessage(messages.cancelIconTitle)}
                />
              }
              _hover={{
                bg: 'red.500',
                color: 'white',
              }}
              onClick={handleCancel}
            />
            <IconButton
              bg="brand.500"
              aria-label={intl.formatMessage(messages.saveIconDesc)}
              icon={
                <CheckIcon
                  fill="white"
                  desc={intl.formatMessage(messages.saveIconDesc)}
                  title={intl.formatMessage(messages.saveIconTitle)}
                />
              }
              _hover={{
                bg: 'brand.400',
              }}
              onClick={handleSave}
            />
          </Stack>
        </Stack>
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
            <Linkify>
              <Text
                onClick={isSubmitting ? undefined : handleStartEdit}
                onMouseEnter={handleHover}
                onMouseLeave={handleStopHover}
                {...previewProperties}
              >
                {value ?? fallbackValue}
              </Text>
            </Linkify>
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
