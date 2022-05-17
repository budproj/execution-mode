import { Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'

export interface CyclesListBodyColumnStatusProperties extends CyclesListBodyColumnBaseProperties {
  status: Cycle['status']['isActive']
}

// Const statusSelector = buildPartialSelector<KeyResult['status']>('status')

const CyclesListBodyColumnStatus = ({ id }: CyclesListBodyColumnStatusProperties): ReactElement => {
  // Const title = useRecoilValue(titleSelector(id))
  // const status = useRecoilValue(statusSelector(id))

  return (
    <CyclesListBodyColumnBase
      borderStyle="solid"
      pr={2}
      h="full"
      alignItems="center"
      display="flex"
      minWidth="280px"
    >
      <Flex gridGap={4} alignItems="center">
        `Status`
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnStatus
