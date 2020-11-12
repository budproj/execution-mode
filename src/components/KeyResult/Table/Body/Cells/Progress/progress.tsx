import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'
import React, { ChangeEvent, ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import Slider from 'components/Base/Slider'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/Table/Body/Cells/Status'
import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import updateRemoteKeyResult from 'state/actions/key-results/update-remote-key-result'
import { keyResultConfidence } from 'state/recoil/key-results/single/confidence'
import { keyResultProgress } from 'state/recoil/key-results/single/progress'

import Skeleton from './skeleton'

export interface ProgressProps {
  id: KeyResult['id']
}

const StyledPercentage = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Progress = ({ id }: ProgressProps): ReactElement => {
  const theme = useTheme()
  const intl = useIntl()

  const confidence = useRecoilValue<KeyResult['confidence'] | undefined>(keyResultConfidence(id))
  const [progress, setProgress] = useRecoilState<KeyResult['progress'] | undefined>(
    keyResultProgress(id),
  )

  const { color } = selectStatusTagBasedInConfidence(confidence?.value ?? 0, theme)

  const handleSliderUpdate = (_: ChangeEvent<unknown>, newValue?: number | number[]): void => {
    if (newValue) setProgress(newValue as number)
  }

  const handleSliderUpdateCommit = async (
    _: ChangeEvent<unknown>,
    newValue: number | number[],
  ): Promise<void> => {
    const newKeyResultPartial = { progress: newValue as number }
    await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  return progress ? (
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
