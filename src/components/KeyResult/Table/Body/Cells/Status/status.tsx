import { Box, styled, TableCell, Theme, Typography, useTheme } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult, KeyResultConfidence } from 'components/KeyResult/types'
import { keyResult as keyResultAtom } from 'state/recoil/key-results/key-result'

import messages from './messages'
import Skeleton from './skeleton'

export interface StatusProps {
  id: KeyResult['id']
}

export interface Tag {
  message: MessageDescriptor
  color: string
}

export const selectStatusTagBasedInConfidence = (
  confidence: KeyResultConfidence['value'],
  theme: Theme,
): Tag => {
  if (confidence >= 50) return { message: messages.upToDate, color: theme.palette.success.main }
  if (confidence >= 25 && confidence < 50)
    return { message: messages.atRisk, color: theme.palette.warning.main }
  return { message: messages.overdue, color: theme.palette.error.main }
}

const StyledStatus = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}))

const StyledDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[200],
}))

const StyledTagCircle = styled(Box)({
  borderRadius: '100%',
  width: 10,
  height: 10,
})

const Status = ({ id }: StatusProps): ReactElement => {
  const intl = useIntl()
  const theme = useTheme()
  const selectedKeyResult = useRecoilValue<KeyResult | undefined>(keyResultAtom(id))
  const confidence = selectedKeyResult?.confidence?.value ?? 100

  const tag = selectStatusTagBasedInConfidence(confidence, theme)

  return selectedKeyResult ? (
    <TableCell width={grid.confidence}>
      <Box display="flex" gridGap={10}>
        <StyledTagCircle style={{ backgroundColor: tag.color, marginTop: 7 }} />

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <StyledStatus variant="body1">{intl.formatMessage(tag.message)}</StyledStatus>
          <StyledDate variant="subtitle1">
            {intl.formatMessage(messages.updatedAt)} -{' '}
            {intl.formatDate(selectedKeyResult.confidence.createdAt, {
              day: 'numeric',
              month: 'short',
            })}
          </StyledDate>
        </Box>
      </Box>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Status
