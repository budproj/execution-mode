import { Box, styled, TableCell, Typography, useTheme } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import StackIcon from 'components/Icons/Stack'
import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResult as keyResultAtom } from 'state/recoil/key-results/key-result'

import messages from './messages'
import Skeleton from './skeleton'

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
  const theme = useTheme()
  const intl = useIntl()
  const selectedKeyResult = useRecoilValue<KeyResult | undefined>(keyResultAtom(id))

  return selectedKeyResult ? (
    <TableCell width={grid.objective}>
      <Box display="flex" gridGap={20} alignItems="center">
        <StyledIconBox borderRadius={10} py={2} px={2}>
          <StackIcon
            desc={intl.formatMessage(messages.stackIconDesc)}
            htmlColor={theme.palette.grey[300]}
          />
        </StyledIconBox>

        <Box>
          <StyledTypography variant="body2">{selectedKeyResult.objective.title}</StyledTypography>
        </Box>
      </Box>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Okr
