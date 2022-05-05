import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { CircularProgress } from 'src/components/Base/CircularProgress'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultListBodyColumnObjectiveProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const KeyResultListBodyColumnObjective = ({
  id,
}: KeyResultListBodyColumnObjectiveProperties): ReactElement => {
  const objective = useRecoilValue(objectiveSelector(id))
  const progress = objective?.status?.progress ?? 0
  const confidence = objective?.status?.confidence ?? 0
  const isObjectiveLoaded = Boolean(objective)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={3} alignItems="center">
        <CircularProgress
          confidence={confidence}
          progress={progress}
          isLoaded={isObjectiveLoaded}
        />

        <Box>
          <Skeleton
            isLoaded={isObjectiveLoaded}
            {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
          >
            <Text color="new-gray.700">{objective?.title}</Text>
          </Skeleton>
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnObjective
