import { Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'

interface KeyResultInlineProperties {
  keyResultTitle?: string
}

const KeyResultInline = ({ keyResultTitle }: KeyResultInlineProperties) => {
  return (
    <Tooltip label={keyResultTitle} width="fit-content" placement="top" textAlign="left">
      <Flex alignItems="center" gap={2}>
        <KeyResultDynamicIcon iconSize={5} boxSize={7} borderRadius={4} title={keyResultTitle} />
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
          {keyResultTitle}
        </Text>
      </Flex>
    </Tooltip>
  )
}

export default KeyResultInline
