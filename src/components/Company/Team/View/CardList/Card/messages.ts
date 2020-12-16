import { defineMessages, MessageDescriptor } from 'react-intl'

export type CardMessageKey = 'crownIconDesc' | 'crownIconTitle'

const cardMessages: Record<CardMessageKey, MessageDescriptor> = defineMessages({
  crownIconDesc: {
    defaultMessage: 'Um ícone de coroa',
    id: 'pVkTLM',
    description:
      'The desc message for the crown icon. This icon is used to ilustrate when a team card is actually a company',
  },

  crownIconTitle: {
    defaultMessage: 'Este time é uma empresa',
    id: 'UUo+Pt',
    description:
      'The title message for the crown icon. This icon is used to ilustrate when a team card is actually a company',
  },
})

export default cardMessages
