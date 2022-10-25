import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { AnswerType } from '../retrospective-tab-content'

import messages from './messages'

type RoutineCommentsEmptyStateProperties = {
  answerOwner?: AnswerType['user']
}

const RoutineCommentsEmptyState = ({ answerOwner }: RoutineCommentsEmptyStateProperties) => {
  const intl = useIntl()

  return (
    <Box pt={5} width="100%" pb={12}>
      <VStack mt={12} alignItems="center">
        <Image mb={2} flex={1} src="/images/routine-comments-empty-state.png" />
        <Text color="new-gray.800" fontSize={14}>
          {intl.formatMessage(messages.emptyStateDescription, { user: answerOwner })}
        </Text>
      </VStack>
    </Box>
  )
}

export default RoutineCommentsEmptyState
