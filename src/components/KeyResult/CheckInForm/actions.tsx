import { Box, Button, Divider, SpaceProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface CheckInFormActionsProperties {
  isLoading: boolean
  gutter: SpaceProps['p']
}

const Actions = ({ isLoading, gutter }: CheckInFormActionsProperties) => {
  const intl = useIntl()

  return (
    <Box>
      <Divider />

      <Box textAlign="center" p={gutter}>
        <Button variant="solid" type="submit" isLoading={isLoading}>
          {intl.formatMessage(messages.save)}
        </Button>
      </Box>
    </Box>
  )
}

export default Actions
