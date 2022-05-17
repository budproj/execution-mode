import { Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'

export interface CyclesListBodyColumnCyclesProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

const KeyResultListBodyColumnCycle = ({
  id,
}: CyclesListBodyColumnCyclesProperties): ReactElement => {
  return (
    <CyclesListBodyColumnBase>
      <Text fontWeight={400} color="#525F7F" fontSize="14px">
        2022
      </Text>
    </CyclesListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnCycle
