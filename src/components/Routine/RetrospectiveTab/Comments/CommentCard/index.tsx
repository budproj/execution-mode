import { Flex, Text, VStack, Avatar, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import regexifyString from 'regexify-string'

import LastUpdateText from 'src/components/Base/LastUpdateText'

interface CommentCard {
  username: string
  picture: string
  timestamp: Date
  comment: string
}

export const MarkedUser = ({ name }: { name?: string }) => (
  <Text as="span" color="brand.500">
    {name}
  </Text>
)

const CommentCard = ({ username, picture, timestamp, comment }: CommentCard) => {
  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, username] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser name={username} />
    },
    input: comment ?? '',
  })

  return (
    <HStack spacing={4} alignItems="flex-start" justifyContent="flex-start" width="full">
      <Avatar width="45px" height="45px" src={picture} />
      <VStack spacing={1} align="flex-start">
        <Flex textAlign="left" gap={3} w="full">
          <Text color="black.900" fontWeight="medium" fontSize={14}>
            {username}
          </Text>
          <LastUpdateText
            cursor="default"
            date={timestamp}
            prefix={Date.now() > timestamp.getTime() ? '' : 'há'}
            fontSize={12}
            color="new-gray.600"
            textAlign="right"
          />
        </Flex>
        <Text fontSize={14} color="new-gray.900">
          {commentText}
        </Text>
        <Button p={0} color="brand.500" fontSize={14} fontWeight="normal">
          Responder
        </Button>
      </VStack>
    </HStack>
  )
}

export default CommentCard
