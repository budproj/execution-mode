import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

const KeyResultListBodyColumnActionsSkeleton = (): ReactElement => (
  <KeyResultListBodyColumnBase preventLineClick justifySelf="flex-end">
    <Skeleton w={12} h={12} borderRadius={4} />
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnActionsSkeleton
