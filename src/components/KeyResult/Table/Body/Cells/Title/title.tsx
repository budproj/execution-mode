import { Box, styled, TableCell, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import DynamicIcon from 'components/KeyResult/DynamicIcon'
import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultTeam } from 'state/recoil/key-results/single/team'
import { keyResultTitle } from 'state/recoil/key-results/single/title'

import Skeleton from './skeleton'

export interface TitleProperties {
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

const Title = ({ id }: TitleProperties): ReactElement => {
  const title = useRecoilValue<KeyResult['title'] | undefined>(keyResultTitle(id))
  const team = useRecoilValue<KeyResult['team'] | undefined>(keyResultTeam(id))

  return title && team ? (
    <StyledCell width={grid.title}>
      <Box display="flex" gridGap={20} alignItems="center">
        <DynamicIcon title={title} />

        <Box>
          <StyledHighlightedText variant="body2">{title}</StyledHighlightedText>
          <StyledSubtitle variant="subtitle1">{team.name}</StyledSubtitle>
        </Box>
      </Box>
    </StyledCell>
  ) : (
    <Skeleton />
  )
}

export default Title
