import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import StackIcon from 'src/components/Icon/Stack'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface KeyResultListBodyColumnOKRProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const KeyResultListBodyColumnOKR = ({ id }: KeyResultListBodyColumnOKRProperties): ReactElement => {
  const objective = useRecoilValue(objectiveSelector(id))
  const intl = useIntl()

  const isObjectiveLoaded = Boolean(objective)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={4} alignItems="center">
        <Skeleton
          borderRadius={10}
          isLoaded={isObjectiveLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <Box borderRadius={10} p={4} bg="gray.50">
            <StackIcon
              desc={intl.formatMessage(messages.stackIconDesc)}
              fill="gray.300"
              w={8}
              h={8}
            />
          </Box>
        </Skeleton>

        <Box>
          <Skeleton
            isLoaded={isObjectiveLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
            {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
          >
            <Text color="gray.500">{objective?.title}</Text>
          </Skeleton>
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnOKR
