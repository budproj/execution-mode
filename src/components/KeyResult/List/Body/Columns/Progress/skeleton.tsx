import { Flex, Box, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnProgressProperties } from './progress'

const KeyResultListBodyColumnProgressSkeleton = (
  _properties: KeyResultListBodyColumnProgressProperties,
): ReactElement => (
  <KeyResultListBodyColumnBase preventLineClick>
    <Flex flexDir="column">
      <Skeleton w="full" h={3} borderRadius="full" />

      <Flex>
        <Skeleton noOfLines={1} minW="40%" h={4} mt={2} />

        <Box flexGrow={1} />

        <Skeleton noOfLines={1} minW="40%" h={4} mt={2} />
      </Flex>
    </Flex>
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnProgressSkeleton
