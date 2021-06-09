import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodyColumnActionsProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnActions = ({
  id,
}: KeyResultListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <p>Teste</p>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnActions
