import { useQuery } from '@apollo/client'
import { Box, useToken } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'

import { GetUserListQueryResult } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import queries from './queries/queries.gql'
import messages from './utils/messages'
import { renderSuggestion } from './utils/render-suggestion'
import { MentionFieldProperties } from './utils/types'

export const MentionField = ({ values, setValues, handleSubmit }: MentionFieldProperties) => {
  const intl = useIntl()

  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [usersMention, setUsersMention] = useState<SuggestionDataItem[]>([])
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  const [brand500, gray200, gray400, newGray200, newGray300, newGray900]: string[] = useToken(
    'colors',
    ['brand.500', 'gray.200', 'gray.400', 'new-gray.200', 'new-gray.300', 'new-gray.900'],
  )
  const [shadow] = useToken('shadows', ['for-background.medium'])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((previousValues) => ({
      ...previousValues,
      comment: event.target.value,
    }))
  }

  const handleCommentsInputKeyDown = (event: any) => {
    const keyCode = event.which || event.key

    if (keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (!users) return

    const usersMentionTemporary = users.map(({ id, fullName }) => ({ id, display: fullName }))

    loadUsers(users)
    setUsersMention(usersMentionTemporary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  return (
    <Box
      borderWidth={1}
      flexGrow={1}
      maxW="full"
      wordBreak="break-word"
      transition="0.2s box-shadow ease-in"
      overflow="visible"
      position="relative"
      fontSize="md"
      minHeight="100px"
      color={gray400}
      borderColor={gray200}
      borderRadius={2}
      px={4}
      py={2}
      pr={10}
    >
      <MentionsInput
        allowSuggestionsAboveCursor
        value={values.comment}
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
        onKeyDown={handleCommentsInputKeyDown}
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
    </Box>
  )
}
