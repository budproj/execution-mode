import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface UpdateCycleModalActionsProperties {
  onClose?: () => void
}

export const UpdateCycleModalActions = ({ onClose }: UpdateCycleModalActionsProperties) => {
  const intl = useIntl()

  return (
    <Box display="flex" justifyContent="end" alignItems="center" width="100%" gap={2}>
      <Button
        fontSize={16}
        fontWeight={700}
        color="brand.500"
        _hover={{ color: 'brand.400' }}
        paddingY={6}
        width={160}
        onClick={onClose}
      >
        {intl.formatMessage(messages.closeModalButton)}
      </Button>

      <Button
        bg="brand.500"
        color="black.50"
        fontSize={16}
        fontWeight={700}
        _hover={{ background: 'brand.400', color: 'black.50' }}
        paddingY={6}
        width={160}
        type="submit"
      >
        {intl.formatMessage(messages.saveEditCycleButton)}
      </Button>
    </Box>
  )
}
