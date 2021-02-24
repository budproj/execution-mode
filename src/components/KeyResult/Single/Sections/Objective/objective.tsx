import { Flex, Text, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Stack as StackIcon } from 'src/components/Icon'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultSectionObjectiveProperties {
  keyResultID?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const KeyResultSectionObjective = ({ keyResultID }: KeyResultSectionObjectiveProperties) => {
  const intl = useIntl()
  const objective = useRecoilValue(objectiveSelector(keyResultID))

  const isObjectiveLoaded = Boolean(objective)

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="black.600">
        {intl.formatMessage(messages.label)}
      </Text>
      <Flex alignItems="center" gridGap={2}>
        <SkeletonCircle isLoaded={isObjectiveLoaded}>
          <Box
            w={8}
            h={8}
            bg="black.50"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StackIcon desc={intl.formatMessage(messages.stackIconDesc)} fill="black.300" />
          </Box>
        </SkeletonCircle>
        <Skeleton
          isLoaded={isObjectiveLoaded}
          {...buildSkeletonMinSize(isObjectiveLoaded, 250, 24)}
        >
          <Text color="black.500">{objective?.title}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionObjective
