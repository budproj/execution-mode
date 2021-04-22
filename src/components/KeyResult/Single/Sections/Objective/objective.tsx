import { Flex, Text, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Stack as StackIcon } from 'src/components/Icon'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

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
      <KeyResultSectionHeading>{intl.formatMessage(messages.label)}</KeyResultSectionHeading>
      <Flex alignItems="center" gridGap={2}>
        <SkeletonCircle isLoaded={isObjectiveLoaded}>
          <Box
            w={8}
            h={8}
            bg="gray.50"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StackIcon desc={intl.formatMessage(messages.stackIconDesc)} fill="gray.400" />
          </Box>
        </SkeletonCircle>
        <Skeleton
          isLoaded={isObjectiveLoaded}
          {...buildSkeletonMinSize(isObjectiveLoaded, 250, 24)}
        >
          <Text color="black.900">{objective?.title}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionObjective
