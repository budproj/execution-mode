import { Grid, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface CheckInFormActionsProperties {
  isLoading?: boolean
  onCancel?: () => void
}

const Actions = ({ isLoading, onCancel }: CheckInFormActionsProperties) => {
  const intl = useIntl()
  const showCancelButton = Boolean(onCancel)

  return (
    <Grid gridGap={4} templateColumns="1fr 1fr">
      {showCancelButton && (
        <Button variant="outline" w="100%" onClick={onCancel}>
          {intl.formatMessage(messages.cancelButtonLabel)}
        </Button>
      )}
      <Button
        variant="solid"
        type="submit"
        isLoading={isLoading}
        w="100%"
        _hover={{ bg: 'brand.600' }}
        gridColumn={2}
      >
        {intl.formatMessage(messages.saveButtonLabel)}
      </Button>
    </Grid>
  )
}

export default Actions
