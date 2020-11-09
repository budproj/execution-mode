import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import grid from 'components/KeyResult/Table/grid'

export interface CycleProps {
  id: KeyResult['id']
}

const Cycle = ({ id }: CycleProps): ReactElement => <BaseCell width={grid.cycle}>{id}</BaseCell>

export default Cycle
