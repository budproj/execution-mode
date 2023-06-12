import { useMutation } from '@apollo/client'
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'
import regexifyString from 'regexify-string'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultComment } from 'src/components/KeyResult/types'
import UserProfileCard from 'src/components/User/ProfileCard'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import messages from '../messages'
import queries from '../queries.gql'

export interface KeyResultSectionTimelineCardCommentProperties {
  data?: Partial<KeyResultComment>
  onEntryDelete?: (entryType: string) => void
}

export const MarkedUser = ({ id, name }: { id?: string; name?: string }) => (
  <Popover placement="top-end" size="sm">
    <PopoverTrigger>
      <Text as="span" color="brand.500" cursor="pointer">
        {name}
      </Text>
    </PopoverTrigger>
    <PopoverContent p={0}>
      <PopoverBody p={0}>
        <UserProfileCard userID={id} />
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

const KeyResultSectionTimelineCardComment = ({
  data,
  onEntryDelete,
}: KeyResultSectionTimelineCardCommentProperties) => {
  const intl = useIntl()
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const [deleteKeyResultComment] = useMutation(queries.DELETE_KEY_RESULT_COMMENT, {
    onCompleted: () => removeEntryFromTimeline(data),
  })

  const intlCardType = intl.formatMessage(messages.cardType)
  const isLoaded = Boolean(data)

  const handleDelete = async () => {
    await deleteKeyResultComment({
      variables: {
        keyResultCommentID: data?.id,
      },
    })

    if (onEntryDelete) onEntryDelete(intlCardType)
  }

  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, name, id] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser id={id} name={name} />
    },
    input: data?.text ?? '',
  })

  return (
    <KeyResultSectionTimelineCardBase
      user={data?.user}
      date={data?.createdAt}
      isLoaded={isLoaded}
      policy={data?.policy}
      intlCardType={intlCardType}
      onDelete={handleDelete}
    >
      <Flex gridGap={4} direction="column">
        <SkeletonText noOfLines={4} isLoaded={isLoaded}>
          <Text fontSize="md" color="new-gray.900">
            {commentText}
          </Text>
        </SkeletonText>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardComment
