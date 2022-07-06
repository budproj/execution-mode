import { Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'

interface KeyResultInlineProperties {
  keyResult?: string
}

const KeyResultInline = ({ keyResult, ...rest }: KeyResultInlineProperties) => {
  return (
    <Tooltip label={keyResult} width="fit-content" placement="top" {...rest} textAlign="left">
      <Flex alignItems="center" gap={2}>
        <KeyResultDynamicIcon iconSize={5} boxSize={7} borderRadius={4} title={keyResult} />
        <Text
          cursor="default"
          color="new-gray.800"
          fontWeight="bold"
          fontSize={14}
          noOfLines={1}
          textAlign="left"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {keyResult}
        </Text>
      </Flex>
    </Tooltip>
  )
}

export default KeyResultInline
