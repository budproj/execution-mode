import { useQuery } from '@apollo/client'
import { Avatar, Box, Divider, HStack, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { useRecoilValue } from 'recoil'

import { NamedAvatar } from 'src/components/User'
import queries from 'src/components/User/AllReachableUsers/queries.gql'
import { GetUserListQueryResult } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

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

const RoutineCommentsInput = () => {
  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))
  const [comment, setComment] = useState<string>('')

  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [usersMention, setUsersMention] = useState<SuggestionDataItem[]>([])
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const initialValues = {
    commment: '',
  }

  useEffect(() => {
    if (!users) return

    const usersMentionTemporary = users.map(({ id, fullName }) => ({ id, display: fullName }))

    loadUsers(users)
    setUsersMention(usersMentionTemporary)
  }, [users])

  return (
    <Stack w="100%" paddingX={10} alignItems="center">
      <Divider mb={2} />
      <HStack pb={6} width="100%" spacing={4} justifyContent="space-between">
        <Avatar width="45px" height="45px" src={user?.picture} />
        <Box
          borderWidth={1}
          flexGrow={1}
          maxW="full"
          wordBreak="break-word"
          transition="0.2s box-shadow ease-in"
          overflow="visible"
          fontSize="md"
          px={4}
          py={2}
          pr={10}
          borderRadius={20}
        >
          <Formik initialValues={initialValues} onSubmit={() => console.log('comment')}>
            <Form>
              <MentionsInput
                allowSuggestionsAboveCursor
                value={comment}
                placeholder="Comente o que Lucas compartilhou!"
                style={{
                  input: {
                    fontSize: 14,
                    color: '#8491B0',
                    outline: 'none',
                  },
                  suggestions: {
                    top: 'auto',
                    left: 'auto',
                    bottom: '15px',
                    zIndex: 5,
                    backgroundColor: 'transparent',
                    list: {
                      marginBottom: '34px',
                      backgroundColor: '#fff',
                      padding: '14px',
                      width: '421px',
                      borderRadius: '8px',
                      maxHeight: '50vh',
                      overflowY: 'auto',
                    },
                    item: {
                      padding: '6px',
                      '&focused': {
                        background: '#EEF2FC',
                        borderRadius: '8px',
                      },
                    },
                  },
                }}
                onChange={handleChange as any}
              >
                <Mention
                  appendSpaceOnAdd
                  trigger="@"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: '#6F6EFF',
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
            </Form>
          </Formik>
        </Box>
      </HStack>
    </Stack>
  )
}

export default RoutineCommentsInput
