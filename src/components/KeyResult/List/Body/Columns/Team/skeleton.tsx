import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

const KeyResultListBodyColumnTeamSkeleton = (): ReactElement => (
  <KeyResultListBodyColumnBase preventLineClick>
    <Skeleton w="90px" h="20px" borderRadius="3px" />
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnTeamSkeleton
