import { Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

export interface CyclesListBodyColumnDateStartProperties
  extends CyclesListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const CyclesListBodyColumnDateStart = ({
  id,
}: CyclesListBodyColumnDateStartProperties): ReactElement => {
  const intl = useIntl()

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Text>{intl.formatDate('2022-01-01T03:00:00.000Z')}</Text>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnDateStart
