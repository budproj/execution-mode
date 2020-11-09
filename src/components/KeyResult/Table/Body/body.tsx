import { TableBody, TableRow, TableCell, Typography, Box, styled } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'

import { KeyResult } from 'components/KeyResult'
import logger from 'lib/logger'
import { hasFetchedAllValues } from 'specifications'
import { buildCustomSorter } from 'state/actions/users'
import { allKeyResults as allKeyResultsAtom } from 'state/recoil/key-results/all'
import { userKeyResultsCustomSorting as userCustomSortingAtom } from 'state/recoil/users/current/custom-sorting/key-results'
import { userID as userIDAtom } from 'state/recoil/users/current/id'

import { buildDroppableBody, buildDraggableRow } from './dnd'

const StyledHighlightedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}))

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td:nth-child(2)': {
    borderRight: `1px solid ${theme.palette.grey[200]}`,
  },

  '& td:nth-child(3)': {
    paddingLeft: 13,
  },
}))

const KeyResultsTableBody = (): ReactElement => {
  const userID = useRecoilValueLoadable(userIDAtom)
  const allKeyResults = useRecoilValueLoadable(allKeyResultsAtom)
  const [userCustomSorting, setUserCustomSorting] = useRecoilStateLoadable(userCustomSortingAtom)
  const reorderCustomSorting = buildCustomSorter(userID, userCustomSorting, setUserCustomSorting)

  const wasDataFetched = hasFetchedAllValues(userID, userCustomSorting)
  const keyResultsHashmap = wasDataFetched ? allKeyResults.getValue() : {}

  logger.debug('Rerendered Key Results table body. Take a look at our Recoil hooks data:', {
    data: {
      allKeyResults,
      userCustomSorting,
    },
    component: 'KeyResultsTableBody',
  })

  const onDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? reorderCustomSorting(source.index, destination.index)
      : userCustomSorting.getValue()

  return wasDataFetched ? (
    <TableBody component={buildDroppableBody(onDragEnd)}>
      {userCustomSorting.getValue().map((id: KeyResult['id'], index: number) => (
        <StyledTableRow key={id} component={buildDraggableRow(id, index)}>
          <StyledCell>
            <Box>
              <StyledHighlightedText variant="body2">
                {keyResultsHashmap[id].title}
              </StyledHighlightedText>
              <StyledSubtitle variant="subtitle1">{keyResultsHashmap[id].team.name}</StyledSubtitle>
            </Box>
          </StyledCell>
          <StyledCell>{id}</StyledCell>
          <StyledCell>{id}</StyledCell>
          <StyledCell>{id}</StyledCell>
          <StyledCell>{id}</StyledCell>
          <StyledCell>{id}</StyledCell>
        </StyledTableRow>
      ))}
    </TableBody>
  ) : (
    <div>Loading...</div>
  )
}

export default KeyResultsTableBody
