import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import grid from 'components/KeyResult/Table/grid'

export interface StatusProps {
  id: KeyResult['id']
}

const Status = ({ id }: StatusProps): ReactElement => (
  <BaseCell width={grid.confidence}>{id}</BaseCell>
)

export default Status
