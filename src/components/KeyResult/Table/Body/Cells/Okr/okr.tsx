import React, { ReactElement } from 'react'
import { KeyResult, KeyResultsHashmap } from 'components/KeyResult/types'
import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'

import grid from 'components/KeyResult/Table/grid'
import StackIcon from 'components/Icons/Stack'
import { useRecoilValue } from 'recoil'
import { allKeyResults } from 'state/recoil/key-results/all'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface OKRProps {
  id: KeyResult['id']
}

const StyledIconBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  lineHeight: 1,
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}))

const Okr = ({ id }: OKRProps): ReactElement => {
  const keyResultsHashmap = useRecoilValue<KeyResultsHashmap>(allKeyResults)
  const theme = useTheme()
  const intl = useIntl()

  return (
    <TableCell width={grid.objective}>
      <Box display="flex" gridGap={20} alignItems="center">
        <StyledIconBox borderRadius={10} py={2} px={2}>
          <StackIcon
            desc={intl.formatMessage(messages.stackIconDesc)}
            htmlColor={theme.palette.grey[300]}
          />
        </StyledIconBox>

        <Box>
          <StyledTypography variant="body2">{keyResultsHashmap[id].title}</StyledTypography>
        </Box>
      </Box>
    </TableCell>
  )
}

export default Okr
