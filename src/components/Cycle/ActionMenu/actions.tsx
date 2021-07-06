import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

type OptionsProperties = {
  onViewOldCycles?: () => void
  onCreateOKR?: () => void
}

export const Actions = ({ onViewOldCycles, onCreateOKR }: OptionsProperties) => {
  const intl = useIntl()

  return (
    <>
      {onViewOldCycles && (
        <MenuItem onClick={onViewOldCycles}>
          {intl.formatMessage(messages.explorePreviousCyclesOption)}
        </MenuItem>
      )}
      {onCreateOKR && (
        <MenuItem onClick={onCreateOKR}>{intl.formatMessage(messages.createOKROption)}</MenuItem>
      )}
    </>
  )
}
