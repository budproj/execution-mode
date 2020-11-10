import React, { ReactElement, useEffect } from 'react'
import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'

import { KeyResult } from 'components/KeyResult/types'
import grid from 'components/KeyResult/Table/grid'
import Slider from 'components/Base/Slider'
import { useRecoilState } from 'recoil'
import { selectKeyResultBasedOnID } from 'state/recoil/key-results/key-result'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/Table/Body/Cells/Status'
import { useIntl } from 'react-intl'
import Skeleton from './skeleton'

export interface ProgressProps {
  id: KeyResult['id']
}

const StyledPercentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Progress = ({ id }: ProgressProps): ReactElement => {
  const [selectedKeyResult, setKeyResult] = useRecoilState<KeyResult | undefined>(
    selectKeyResultBasedOnID(id),
  )

  const theme = useTheme()
  const intl = useIntl()

  const confidence = selectedKeyResult?.confidence?.value ?? 100
  const { color } = selectStatusTagBasedInConfidence(confidence, theme)

  return selectedKeyResult ? (
    <TableCell width={grid.progress}>
      <Box display="flex" alignItems="center" gridGap={15}>
        <Box width="70%">
          <Slider defaultValue={selectedKeyResult.progress} trackColor={color} />
        </Box>
        <StyledPercentage variant="body1">
          {intl.formatNumber(selectedKeyResult.progress / 100, { style: 'percent' })}
        </StyledPercentage>
      </Box>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Progress
