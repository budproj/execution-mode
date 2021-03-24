import { Flex, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnOwnerProperties } from './owner'

const handleMouseDownCapture = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

const KeyResultListBodyColumnOwnerSkeleton = ({
  displayName,
  justifyContent,
}: KeyResultListBodyColumnOwnerProperties): ReactElement => (
  <KeyResultListBodyColumnBase
    preventLineClick
    pr={0}
    display="flex"
    cursor="auto"
    justifyContent={justifyContent}
    onMouseDownCapture={handleMouseDownCapture}
  >
    <Flex alignItems="center" gridGap={4}>
      <SkeletonCircle size="48px" />

      {displayName && <Skeleton display="flex" alignItems="center" h={4} w={20} />}
    </Flex>
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnOwnerSkeleton
