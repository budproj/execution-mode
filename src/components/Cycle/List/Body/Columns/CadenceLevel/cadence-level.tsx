import { Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'

export interface CyclesListBodyColumnCadenceLevelProperties
  extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

const CyclesListBodyColumnCadenceLevel = ({
  id,
}: CyclesListBodyColumnCadenceLevelProperties): ReactElement => {
  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Text color="#6B7B90" fontSize="14px" fontWeight={400}>
          Anual
        </Text>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnCadenceLevel
