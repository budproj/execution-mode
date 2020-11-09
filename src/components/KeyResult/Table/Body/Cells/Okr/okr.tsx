import React, { ReactElement } from 'react'
import { KeyResult } from 'components/KeyResult/types'
import { styled } from '@material-ui/core'

import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import grid from 'components/KeyResult/Table/grid'

export interface OKRProps {
  id: KeyResult['id']
}

const StyledCell = styled(BaseCell)({
  paddingLeft: 13,
})

const Okr = ({ id }: OKRProps): ReactElement => <StyledCell width={grid.objective}>{id}</StyledCell>

export default Okr
