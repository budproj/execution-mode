import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import grid from 'components/KeyResult/Table/grid'

export interface ProgressProps {
  id: KeyResult['id']
}

const Progress = ({ id }: ProgressProps): ReactElement => (
  <BaseCell width={grid.progress}>{id}</BaseCell>
)

export default Progress
