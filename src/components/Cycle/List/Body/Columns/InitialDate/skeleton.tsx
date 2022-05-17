import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'

import { CyclesListBodyColumnInitialDateProperties } from './initial-date'

const CyclesListBodyColumnInitialDateSkeleton = (
  _properties: CyclesListBodyColumnInitialDateProperties,
): ReactElement => (
  <CyclesListBodyColumnBase>
    <Flex gridGap={2} flexDir="column">
      <Skeleton w={40} h={8}>
        <ConfidenceTag showTooltip />
      </Skeleton>
    </Flex>
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnInitialDateSkeleton
