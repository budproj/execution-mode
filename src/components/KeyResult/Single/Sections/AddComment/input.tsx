import { Box, IconButton, Spinner, useToken } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'

import PaperPlaneIcon from 'src/components/Icon/PaperPlane'

import { KeyResultSectionAddCommentInitialValues } from './add-comment'
import messages from './messages'
import { NamedAvatar } from 'src/components/User'

export interface KeyResultSectionAddCommentInputProperties {
  isLoading?: boolean
}

export interface TextareaAutosizeContext {
  rowHeight: number
}


const renderSuggestion = (suggestion: SuggestionDataItem) => (
  <div>
    <NamedAvatar subtitleType="role" userID={suggestion.id.toString()} />
  </div >
)

const KeyResultSectionAddCommentInput = ({ isLoading }: KeyResultSectionAddCommentInputProperties) => {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [numberOfRows, setNumberOfRows] = useState(1)
  const { values, setValues, isSubmitting } =
    useFormikContext<KeyResultSectionAddCommentInitialValues>()
  const intl = useIntl()
  const [
    brand500,
    gray200,
    gray400,
    newGray200,
    newGray300,
  ] = useToken('colors', [
    'brand.500',
    'gray.200',
    'gray.400',
    'new-gray.200',
    'new-gray.300',
  ])

  const [shadow] = useToken('shadows', ['for-background.medium'])

  const handleFocus = () => {
    setIsOnFocus(true)
  }

  const handleBlur = () => {
    setIsOnFocus(false)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfRows = event.target.value.split('\n').length + 1

    if (numberOfRows > 14) return null

    setNumberOfRows(numberOfRows)
    setValues({ text: event.target.value })
  }

  return (
    <Box
      borderWidth={1}
      flexGrow={1}
      transition="0.2s box-shadow ease-in"
      overflow="visible"
      fontSize="sm"
      color={gray400}
      borderColor={isOnFocus ? brand500 : gray200}
      boxShadow={isOnFocus ? '0 0 0 1px #6F6EFF' : 'none'}
      borderRadius={numberOfRows === 1 ? 'full' : 60 / numberOfRows}
      px={4}
      py={2}
    >
      <MentionsInput
        value={values.text}
        placeholder={intl.formatMessage(messages.placeholder)}
        style={{
          input: {
            resize: 'none',
            width: '100%',
            outline: 'none',
          },
          suggestions: {
            top: 'auto',
            left: 'auto',
            bottom: '15px',
            right: '0px',
            backgroundColor: 'transparent',
            list: {
              border: `1px solid ${newGray300}`,
              marginBottom: '34px',
              backgroundColor: '#fff',
              padding: '14px',
              width: '421px',
              borderRadius: '8px',
              boxShadow: shadow,
            },
            item: {
              padding: '6px',
              '&focused': {
                background: newGray200,
                borderRadius: '8px',
              }
            }

          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange as any}
        allowSuggestionsAboveCursor={true}
      >
        <Mention
          trigger="@"
          style={{
            position: 'relative',
            zIndex: 1,
            color: brand500,
            textShadow: '1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white',
            pointerEvents: 'none',
          }}
          data={[
            { id: 'b159ef12-9062-49c6-8afc-372e8848fb15', display: 'Rick Sanches' },
            { id: 'b159ef12-9062-49c6-8afc-372e8848fb15', display: 'Rick Sanches' },
            { id: 'f120ec45-150d-4e24-b99d-34df20a80c64', display: 'Evil Morty' },
            { id: '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9', display: 'Jerry Smith' },
            { id: '922ef72a-6c3c-4075-926a-3245cdeea75f', display: 'Morty Smith' },
          ]}
          renderSuggestion={renderSuggestion}
          appendSpaceOnAdd={true}
        />
      </MentionsInput>
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
    </Box >
  )
}

export default KeyResultSectionAddCommentInput
