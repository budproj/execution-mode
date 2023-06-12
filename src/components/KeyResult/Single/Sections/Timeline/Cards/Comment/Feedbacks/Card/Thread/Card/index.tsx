import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import regexifyString from 'regexify-string'

import { MarkedUser } from '../../../../Default'

interface CommentThreadCardProperties {
  text: string
}

const CommentThreadCard = ({ text }: CommentThreadCardProperties) => {
  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, name, id] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser id={id} name={name} />
    },
    input: text ?? '',
  })

  return (
    <Box pt={2}>
      <Text fontSize="md" color="new-gray.900">
        {commentText}
      </Text>
    </Box>
  )
}

export default CommentThreadCard
