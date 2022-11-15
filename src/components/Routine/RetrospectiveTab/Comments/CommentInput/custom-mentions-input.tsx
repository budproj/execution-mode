import { useQuery } from '@apollo/client'
import { Avatar, Box, Divider, HStack, IconButton, Spinner, Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { useRecoilValue } from 'recoil'

import PaperPlaneIcon from 'src/components/Icon/PaperPlane'
import iconMessages from 'src/components/KeyResult/Single/Sections/AddComment/messages'
import { NamedAvatar } from 'src/components/User'
import queries from 'src/components/User/AllReachableUsers/queries.gql'
import { GetUserListQueryResult } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import messages from './messages'
import { RoutineCommentsInputInitialValues } from './wrapper'

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

interface CustomMentionsInputProperties {
  userThatWillBeAnswered?: User['firstName']
}

const CustomMentionsInput = ({ userThatWillBeAnswered }: CustomMentionsInputProperties) => {
  const reference = useRef<HTMLDivElement>(null)
  const intl = useIntl()

  const { setValues, values, isSubmitting, handleSubmit } =
    useFormikContext<RoutineCommentsInputInitialValues>()
  const [isOnFocus, setIsOnFocus] = useState(Boolean(values.text))

  const handleFocus = () => {
    setIsOnFocus(true)
  }

  const handleBlur = () => {
    setIsOnFocus(false)
  }

  const handleCommentsInputKeyDown = (event: any) => {
    const keyCode = event.which || event.key

    if (keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    reference.current?.addEventListener('keydown', handleCommentsInputKeyDown)

    return () => document.removeEventListener('keydown', handleCommentsInputKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const placeholder = intl.formatMessage(messages.placeholder, {
    user: userThatWillBeAnswered,
  })
  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))

  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [usersMention, setUsersMention] = useState<SuggestionDataItem[]>([])
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ text: event.target.value })
  }

  useEffect(() => {
    if (!users) return

    const usersMentionTemporary = users.map(({ id, fullName }) => ({ id, display: fullName }))

    loadUsers(users)
    setUsersMention(usersMentionTemporary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  return (
    <Stack ref={reference} alignItems="center" mt={2} paddingX={6} width="full">
      <Divider />
      <HStack pb={6} width="100%" spacing={4} justifyContent="space-between">
        <Avatar width="45px" height="45px" src={user?.picture} />
        <Box
          borderWidth={1}
          flexGrow={1}
          maxW="full"
          wordBreak="break-word"
          transition="0.2s box-shadow ease-in"
          overflow="visible"
          position="relative"
          fontSize="md"
          borderColor={isOnFocus ? 'brand.500' : 'gray.200'}
          boxShadow={isOnFocus ? '0 0 0 1px #6F6EFF' : 'none'}
          px={4}
          py={2}
          pr={10}
          borderRadius={20}
        >
          <MentionsInput
            allowSuggestionsAboveCursor
            value={values.text}
            placeholder={placeholder}
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
            typeof="text"
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
                  title={intl.formatMessage(iconMessages.paperPlaneIconTitle)}
                  desc={intl.formatMessage(iconMessages.paperPlaneIconDesc)}
                />
              )
            }
            type="submit"
            position="absolute"
            top="50%"
            right={2}
            transform="translate(0, -50%);"
            color="gray.200"
            aria-label={intl.formatMessage(iconMessages.paperPlaneIconDesc)}
            _hover={{
              color: 'brand.500',
            }}
            _focus={{
              boxShadow: 'none',
            }}
          />
        </Box>
      </HStack>
    </Stack>
  )
}

export default CustomMentionsInput
