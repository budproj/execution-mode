import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultTableBodyMessages = 'reorderIconDesc'

export default defineMessages({
  reorderIconDesc: {
    defaultMessage:
      'Um ícone com uma série de traços verticais. Clique e arraste ele para reordenar seus resultados chave',
    id: '+O5SW4',
    description: 'The alternative text explaining our reorder icon',
  },
}) as Record<KeyResultTableBodyMessages, MessageDescriptor>
