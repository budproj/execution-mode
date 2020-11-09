import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const Logotype = (): ReactElement => {
  const intl = useIntl()

  return (
    <Box>
      <img
        src="/bud-logotype.svg"
        alt={intl.formatMessage(messages.alt)}
        title={intl.formatMessage(messages.title)}
      />
    </Box>
  )
}

export default Logotype
