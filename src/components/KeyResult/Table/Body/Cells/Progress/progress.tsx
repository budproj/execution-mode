import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import Slider from 'components/Base/Slider'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/Table/Body/Cells/Status'
import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import updateKeyResult from 'state/actions/key-results/update-key-result'
import { selectKeyResultBasedOnID } from 'state/recoil/key-results/key-result'

import Skeleton from './skeleton'

export interface ProgressProps {
  id: KeyResult['id']
}

const StyledPercentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Progress = ({ id }: ProgressProps): ReactElement => {
  const [selectedKeyResult, setKeyResult] = useRecoilState<Partial<KeyResult> | undefined>(
    selectKeyResultBasedOnID(id),
  )

  const theme = useTheme()
  const intl = useIntl()
  const [progress, setProgress] = useState(selectedKeyResult?.progress ?? 0)

  const confidence = selectedKeyResult?.confidence?.value ?? 100
  const { color } = selectStatusTagBasedInConfidence(confidence, theme)

  const handleSliderUpdate = (_: ChangeEvent<unknown>, newValue?: number | number[]): void => {
    if (newValue) setProgress(newValue as number)
  }

  const handleSliderUpdateCommit = async (
    _: ChangeEvent<unknown>,
    newValue: number | number[],
  ): Promise<void> => {
    if (newValue !== selectedKeyResult?.progress) {
      setProgress(newValue as number)

      const newKeyResultPartial = { progress: newValue as number }
      await updateKeyResult(id, newKeyResultPartial, setKeyResult)
    }
  }

  return selectedKeyResult ? (
    <TableCell width={grid.progress}>
      <Box display="flex" alignItems="center" gridGap={15}>
        <Box width="70%">
          <Slider
            value={progress}
            trackColor={color}
            onChange={handleSliderUpdate}
            onChangeCommitted={handleSliderUpdateCommit}
          />
        </Box>
        <StyledPercentage variant="body1">
          {intl.formatNumber(progress / 100, { style: 'percent' })}
        </StyledPercentage>
      </Box>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Progress
