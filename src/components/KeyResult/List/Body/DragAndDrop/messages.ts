import { defineMessages } from 'react-intl'

type KeyResultListBodyDragAndDropMessage = 'reorderIconDesc' | 'emptyStateLabel'

export default defineMessages<KeyResultListBodyDragAndDropMessage>({
  reorderIconDesc: {
    defaultMessage:
      'Um ícone com uma série de traços verticais. Clique e arraste ele para reordenar seus resultados chave',
    id: '+O5SW4',
    description: 'The alternative text explaining our reorder icon',
  },

  emptyStateLabel: {
    defaultMessage: 'Esse objetivo não tem nenhum resultado-chave',
    id: '/CiLko',
    description: 'The label message that is displayed below our team at work image',
  },
})
