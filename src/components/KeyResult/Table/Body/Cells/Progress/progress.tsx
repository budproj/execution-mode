import React, { ReactElement } from 'react'
import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'

import { KeyResult } from 'components/KeyResult/types'
import grid from 'components/KeyResult/Table/grid'
import Slider from 'components/Base/Slider'
import { useRecoilState } from 'recoil'
import { selectKeyResultByID } from 'state/recoil/key-results/single'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/Table/Body/Cells/Status'
import { useIntl } from 'react-intl'

export interface ProgressProps {
  id: KeyResult['id']
}

const StyledPercentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Progress = ({ id }: ProgressProps): ReactElement => {
  const [keyResult, setKeyResult] = useRecoilState<KeyResult>(selectKeyResultByID(id))

  const theme = useTheme()
  const intl = useIntl()

  const { color } = selectStatusTagBasedInConfidence(keyResult.confidence.value, theme)

  setKeyResult({ progress: 20 })

  return (
    <TableCell width={grid.progress}>
      <Box display="flex" alignItems="center" gridGap={15}>
        <Box width="70%">
          <Slider defaultValue={keyResult.progress} trackColor={color} />
        </Box>
        <StyledPercentage variant="body1">
          {intl.formatNumber(keyResult.progress / 100, { style: 'percent' })}
        </StyledPercentage>
      </Box>
    </TableCell>
  )
}

export default Progress
