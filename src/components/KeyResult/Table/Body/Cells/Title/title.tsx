import { Box, styled, TableCell, Typography } from '@material-ui/core'
import { KeyResult } from 'components/KeyResult/types'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { keyResult as keyResultAtom } from 'state/recoil/key-results/key-result'
import DynamicIcon from 'components/KeyResult/DynamicIcon'
import grid from 'components/KeyResult/Table/grid'

import Skeleton from './skeleton'

export interface TitleProps {
  id: KeyResult['id']
}

const StyledCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: 0,
  borderRight: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledHighlightedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}))

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const Title = ({ id }: TitleProps): ReactElement => {
  const selectedKeyResult = useRecoilValue<KeyResult | undefined>(keyResultAtom(id))

  return selectedKeyResult ? (
    <StyledCell width={grid.title}>
      <Box display="flex" gridGap={20} alignItems="center">
        <DynamicIcon title={selectedKeyResult.title} />

        <Box>
          <StyledHighlightedText variant="body2">{selectedKeyResult.title}</StyledHighlightedText>
          <StyledSubtitle variant="subtitle1">{selectedKeyResult.team.name}</StyledSubtitle>
        </Box>
      </Box>
    </StyledCell>
  ) : (
    <Skeleton />
  )
}

export default Title
