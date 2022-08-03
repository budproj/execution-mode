import { Flex, Text, Skeleton, Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { CircularProgress } from 'src/components/Base/CircularProgress'
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

  const progress = objective?.status?.progress ?? 0
  const confidence = objective?.status?.confidence ?? 0
  const isObjectiveLoaded = Boolean(objective)

  return (
    <Flex gridGap={2} direction="column">
      <KeyResultSectionHeading>{intl.formatMessage(messages.label)}</KeyResultSectionHeading>

      <Flex gridGap={3} alignItems="center">
        <CircularProgress
          confidence={confidence}
          progress={progress}
          isLoaded={isObjectiveLoaded}
        />
        <Tooltip
          label={intl.formatMessage(messages.tooltipMessage, { team: objective?.team?.name })}
          placement="top-start"
          maxW="lg"
        >
          <Box
            color="new-gray.900"
            cursor="pointer"
            _hover={{
              color: 'new-gray.700',
            }}
          >
            <Skeleton
              isLoaded={isObjectiveLoaded}
              {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
            >
              <Text fontSize={14} fontWeight={500}>
                {objective?.title}
              </Text>
            </Skeleton>
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionObjective
