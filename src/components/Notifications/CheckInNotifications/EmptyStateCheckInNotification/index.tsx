import { Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { EmptyState } from 'src/components/Base'

const EmptyStateCheckInNotifications = () => {
  const intl = useIntl()

  return (
    <Box padding="50px 0px">
      <EmptyState
        imageKey="people-with-pages"
        labelMessage={{
          defaultMessage:
            'Você não tem check-ins pendentes porque não está envolvido em nenhum resultado-chave.',
          id: '1',
          description: 'aaaaa',
        }}
      />
    </Box>
  )
}

export default EmptyStateCheckInNotifications
