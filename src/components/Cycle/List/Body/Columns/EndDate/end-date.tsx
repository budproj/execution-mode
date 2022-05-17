import { Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

export interface CyclesListBodyColumnEndDateProperties extends CyclesListBodyColumnBaseProperties {
  id?: KeyResult['id']
  isDisabled?: boolean
}

const CyclesListBodyColumnEndDate = ({
  id,
}: CyclesListBodyColumnEndDateProperties): ReactElement => {
  const intl = useIntl()

  return (
    <CyclesListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Flex gridGap={2} flexDir="column">
          <Text>{intl.formatDate('2022-12-31T03:00:00.000Z')}</Text>
        </Flex>
      </Flex>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnEndDate
