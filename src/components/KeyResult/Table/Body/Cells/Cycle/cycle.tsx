import { styled, TableCell, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResult as keyResultAtom } from 'state/recoil/key-results/key-result'

import Skeleton from './skeleton'

export interface CycleProps {
  id: KeyResult['id']
}

const StyledDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Cycle = ({ id }: CycleProps): ReactElement => {
  const selectedKeyResult = useRecoilValue<KeyResult | undefined>(keyResultAtom(id))
  const intl = useIntl()
  const dateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
  }

  return selectedKeyResult ? (
    <TableCell width={grid.cycle}>
      <StyledDate>
        {intl.formatDate(selectedKeyResult.cycle.start, dateOptions)} -{' '}
        {intl.formatDate(selectedKeyResult.cycle.end, dateOptions)}
      </StyledDate>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Cycle
