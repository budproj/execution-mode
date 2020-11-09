import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'

import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import grid from 'components/KeyResult/Table/grid'

export interface OwnerProps {
  id: KeyResult['id']
}

const Owner = ({ id }: OwnerProps): ReactElement => <BaseCell width={grid.owner}>{id}</BaseCell>

export default Owner
