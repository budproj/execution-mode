import { Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface CyclesListBodyColumnCadenceLevelProperties
  extends CyclesListBodyColumnBaseProperties {
  id?: KeyResult['id']
  isDisabled?: boolean
}

const CyclesListBodyColumnCadenceLevel = ({
  id,
  isDisabled,
}: CyclesListBodyColumnCadenceLevelProperties): ReactElement => {
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const isKeyResultLoaded = Boolean(id)

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Text color="#6B7B90" fontSize="14px" fontWeight={400}>
          Cadencia
        </Text>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnCadenceLevel
