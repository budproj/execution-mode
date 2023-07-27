import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { EmptyState } from 'src/components/Base'
import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import messages from './messages'

interface KeyResultSectionTimelineCardEmptyStateProperties {
  keyResultID: KeyResult['id']
}

const KeyResultSectionTimelineCardEmptyState = ({
  keyResultID,
}: KeyResultSectionTimelineCardEmptyStateProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  return keyResult?.mode === KEY_RESULT_MODE.DRAFT ? (
    <EmptyState
      labelMessage={messages.emptyState}
      messageTranslationOptions={{ breakline: <br /> }}
      imageKey="cat-hanging-out"
    />
  ) : (
    <KeyResultSectionTimelineCardBase hideUser borderWidth={0} bg="transparent" boxShadow="none">
      <Flex direction="column" alignItems="center" gridGap={2} py={4}>
        <Box>
          <Image src="/images/ghost-drawing-sm.png" />
        </Box>
        <Heading as="h3" fontSize="md" color="gray.400">
          {intl.formatMessage(messages.title)}
        </Heading>
        <Text fontSize="sm" color="gray.400" textAlign="center">
          {intl.formatMessage(messages.description)}
        </Text>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardEmptyState
