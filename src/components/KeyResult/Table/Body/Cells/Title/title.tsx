import { Box, styled, Typography } from '@material-ui/core'
import { KeyResult, KeyResultsHashmap } from 'components/KeyResult/types'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { allKeyResults } from 'state/recoil/key-results/all'
import BaseCell from 'components/KeyResult/Table/Body/Cells/Base'
import DynamicIcon from 'components/KeyResult/DynamicIcon'
import grid from 'components/KeyResult/Table/grid'

export interface TitleProps {
  id: KeyResult['id']
}

const StyledCell = styled(BaseCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledHighlightedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}))

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Title = ({ id }: TitleProps): ReactElement => {
  const keyResultsHashmap = useRecoilValue<KeyResultsHashmap>(allKeyResults)

  return (
    <StyledCell width={grid.title}>
      <Box display="flex" gridGap={20} alignItems="center">
        <Box>
          <DynamicIcon id={id} />
        </Box>

        <Box>
          <StyledHighlightedText variant="body2">
            {keyResultsHashmap[id].title}
          </StyledHighlightedText>
          <StyledSubtitle variant="subtitle1">{keyResultsHashmap[id].team.name}</StyledSubtitle>
        </Box>
      </Box>
    </StyledCell>
  )
}

export default Title
