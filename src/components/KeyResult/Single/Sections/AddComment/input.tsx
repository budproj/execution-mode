import { Box, IconButton, Spinner } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'
import TextareaAutosize from 'react-textarea-autosize'

import PaperPlaneIcon from 'src/components/Icon/PaperPlane'

import { KeyResultSectionAddCommentInitialValues } from './add-comment'
import messages from './messages'

export interface KeyResultSectionAddCommentInputProperties {
  isLoading?: boolean
}

export interface TextareaAutosizeContext {
  rowHeight: number
}

const KeyResultSectionAddCommentInput = ({
  isLoading,
}: KeyResultSectionAddCommentInputProperties) => {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [numberOfRows, setNumberOfRows] = useState(1)
  const { values, setValues, isSubmitting } =
    useFormikContext<KeyResultSectionAddCommentInitialValues>()
  const intl = useIntl()

  const handleHeightChange = (height: number, context: TextareaAutosizeContext) => {
    const newNumberOfRows = Math.floor(height / context.rowHeight)
    setNumberOfRows(newNumberOfRows)
  }

  const handleFocus = () => {
    setIsOnFocus(true)
  }

  const handleBlur = () => {
    setIsOnFocus(false)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValues({
      text: event.target.value,
    })
  }

  return (
    <Box
      borderWidth={1}
      flexGrow={1}
      transition="0.2s box-shadow ease-in"
      overflow="hidden"
      fontSize="sm"
      color="gray.400"
      borderColor={isOnFocus ? 'brand.500' : 'gray.200'}
      boxShadow={isOnFocus ? '0 0 0 1px #6F6EFF' : 'none'}
      borderRadius={numberOfRows === 1 ? 'full' : 60 / numberOfRows}
      px={4}
      py={2}
    >
      <TextareaAutosize
        value={values.text}
        placeholder={intl.formatMessage(messages.placeholder)}
        maxRows={14}
        style={{
          resize: 'none',
          width: '100%',
          outline: 'none',
        }}
        onHeightChange={handleHeightChange as any}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <IconButton
        icon={
          isLoading || isSubmitting ? (
            <Spinner />
          ) : (
            <PaperPlaneIcon
              w={5}
              h="auto"
              fill="currentColor"
              stroke="currentColor"
              title={intl.formatMessage(messages.paperPlaneIconTitle)}
              desc={intl.formatMessage(messages.paperPlaneIconDesc)}
            />
          )
        }
        type="submit"
        position="absolute"
        right={6}
        bottom={4}
        color="gray.200"
        aria-label={intl.formatMessage(messages.paperPlaneIconDesc)}
        _hover={{
          color: 'brand.500',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      />
    </Box>
  )
}

export default KeyResultSectionAddCommentInput
