import { styled, TableCell, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultCycle } from 'state/recoil/key-results/single/cycle'

import Skeleton from './skeleton'

export interface CycleProperties {
  id: KeyResult['id']
}

const StyledDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Cycle = ({ id }: CycleProperties): ReactElement => {
  const cycle = useRecoilValue<KeyResult['cycle'] | undefined>(keyResultCycle(id))
  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  return cycle ? (
    <TableCell width={grid.cycle}>
      <StyledDate>
        {intl.formatDate(cycle.start, dateOptions)} - {intl.formatDate(cycle.end, dateOptions)}
      </StyledDate>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Cycle
