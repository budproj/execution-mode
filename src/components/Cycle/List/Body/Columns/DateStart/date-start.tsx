import { Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'

export interface CyclesListBodyColumnDateStartProperties
  extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

const dateStartSelector = buildPartialSelector<Cycle['dateStart']>('dateStart')

const CyclesListBodyColumnDateStart = ({
  id,
}: CyclesListBodyColumnDateStartProperties): ReactElement => {
  const intl = useIntl()
  const dateStart = useRecoilValue(dateStartSelector(id))
  const isdateStartLoaded = Boolean(dateStart)

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isdateStartLoaded}
          {...buildSkeletonMinSize(isdateStartLoaded, 100, 28)}
        >
          <Text>{intl.formatDate(dateStart, { timeZone: 'UTC' })}</Text>
        </Skeleton>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnDateStart
