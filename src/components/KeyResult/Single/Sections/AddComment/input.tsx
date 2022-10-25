import { useQuery } from '@apollo/client'
import { Box, IconButton, Spinner, useToken } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'

import PaperPlaneIcon from 'src/components/Icon/PaperPlane'
import { NamedAvatar } from 'src/components/User'
import queries from 'src/components/User/AllReachableUsers/queries.gql'
import { GetUserListQueryResult } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { KeyResultSectionAddCommentInitialValues } from './add-comment'
import messages from './messages'

export interface KeyResultSectionAddCommentInputProperties {
  isLoading?: boolean
}

export interface TextareaAutosizeContext {
  rowHeight: number
}

const renderSuggestion = (suggestion: SuggestionDataItem) => (
  <div>
    <NamedAvatar
      canHover
      nameColor="black.900"
      subtitleType="role"
      userID={suggestion.id.toString()}
    />
  </div>
)

const KeyResultSectionAddCommentInput = ({
  isLoading,
}: KeyResultSectionAddCommentInputProperties) => {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [numberOfRows, setNumberOfRows] = useState(1)
  const { values, setValues, isSubmitting } =
    useFormikContext<KeyResultSectionAddCommentInitialValues>()
  const intl = useIntl()
  const [brand500, gray200, gray400, newGray200, newGray300, newGray900]: string[] = useToken(
    'colors',
    ['brand.500', 'gray.200', 'gray.400', 'new-gray.200', 'new-gray.300', 'new-gray.900'],
  )

  const [shadow] = useToken('shadows', ['for-background.medium'])

  const handleFocus = () => {
    setIsOnFocus(true)
  }

  const handleBlur = () => {
    setIsOnFocus(false)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfRows = event.target.value.split('\n').length + 1

    if (numberOfRows > 14) return

    setNumberOfRows(numberOfRows)
    setValues({ text: event.target.value })
  }

  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [usersMention, setUsersMention] = useState<SuggestionDataItem[]>([])
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data])

  useEffect(() => {
    if (!users) return

    const usersMentionTemporary = users.map(({ id, fullName }) => ({ id, display: fullName }))

    loadUsers(users)
    setUsersMention(usersMentionTemporary)
  }, [users])

  return (
    <Box
      borderWidth={1}
      flexGrow={1}
      maxW="full"
      wordBreak="break-word"
      transition="0.2s box-shadow ease-in"
      overflow="visible"
      fontSize="md"
      color={gray400}
      borderColor={isOnFocus ? brand500 : gray200}
      boxShadow={isOnFocus ? '0 0 0 1px #6F6EFF' : 'none'}
      borderRadius={numberOfRows === 1 ? 'full' : 60 / numberOfRows}
      px={4}
      py={2}
      pr={10}
    >
      <MentionsInput
        allowSuggestionsAboveCursor
        value={values.text}
        placeholder={intl.formatMessage(messages.placeholder)}
        style={{
          input: {
            resize: 'none',
            width: '100%',
            outline: 'none',
            color: newGray900,
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
              maxHeight: '50vh',
              overflowY: 'auto',
            },
            item: {
              padding: '6px',
              '&focused': {
                background: newGray200,
                borderRadius: '8px',
              },
            },
          },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange as any}
      >
        <Mention
          appendSpaceOnAdd
          trigger="@"
          style={{
            position: 'relative',
            zIndex: 1,
            color: brand500,
            left: -1,
            top: -1,
            textShadow:
              '1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white, -1px -1px 1px white',
            pointerEvents: 'none',
          }}
          data={usersMention}
          renderSuggestion={renderSuggestion}
        />
      </MentionsInput>
      <IconButton
        icon={
          isSubmitting ? (
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
        bottom="1.2rem"
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
