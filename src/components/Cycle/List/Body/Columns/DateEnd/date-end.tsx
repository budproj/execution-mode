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

export interface CyclesListBodyColumnEndDateProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}
const dateEndSelector = buildPartialSelector<Cycle['dateEnd']>('dateEnd')

const CyclesListBodyColumnDateEnd = ({
  id,
}: CyclesListBodyColumnEndDateProperties): ReactElement => {
  const intl = useIntl()

  const dateEnd = useRecoilValue(dateEndSelector(id))
  const isdateEndLoaded = Boolean(dateEnd)

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton isLoaded={isdateEndLoaded} {...buildSkeletonMinSize(isdateEndLoaded, 100, 20)}>
          <Text>{intl.formatDate(dateEnd)}</Text>
        </Skeleton>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnDateEnd
