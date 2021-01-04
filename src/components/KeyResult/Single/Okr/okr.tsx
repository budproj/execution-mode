import { Flex, Text, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Stack as StackIcon } from 'src/components/Icon'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface KeyResultSingleOKRProperties {
  keyResultID?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const Okr = ({ keyResultID }: KeyResultSingleOKRProperties) => {
  const intl = useIntl()
  const objective = useRecoilValue(objectiveSelector(keyResultID))

  const isOKRLoaded = Boolean(objective)

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
      <Flex alignItems="center" gridGap={2}>
        <SkeletonCircle isLoaded={isOKRLoaded}>
          <Box
            w="32px"
            h="32px"
            bg="gray.50"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StackIcon desc={intl.formatMessage(messages.stackIconDesc)} fill="gray.300" />
          </Box>
        </SkeletonCircle>
        <Skeleton isLoaded={isOKRLoaded} {...buildSkeletonMinSize(isOKRLoaded, 250, 24)}>
          <Text color="gray.500">{objective?.title}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default Okr
