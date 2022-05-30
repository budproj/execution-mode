import { Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'
import { CADENCE } from 'src/components/Cycle/constants'
import { Cycle } from 'src/components/Cycle/types'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'

export interface CyclesListBodyColumnCadenceLevelProperties {
  id: Cycle['id']
}
const cadenceLevelSelector = buildPartialSelector<Cycle['cadence']>('cadence')

const CyclesListBodyColumnCadenceLevel = ({
  id,
}: CyclesListBodyColumnCadenceLevelProperties): ReactElement => {
  const cadenceLevel = useRecoilValue(cadenceLevelSelector(id))
  const isCadenceLevelLoaded = Boolean(cadenceLevel)

  const cadenceLevelFormated = new Map([
    [CADENCE.QUARTERLY, 'Trimestral'],
    [CADENCE.YEARLY, 'Anual'],
  ])

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isCadenceLevelLoaded}
          {...buildSkeletonMinSize(isCadenceLevelLoaded, 40, 8)}
        >
          <Text color="#6B7B90" fontSize="14px" fontWeight={400}>
            {cadenceLevel && cadenceLevelFormated.get(cadenceLevel)}
          </Text>
        </Skeleton>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnCadenceLevel
