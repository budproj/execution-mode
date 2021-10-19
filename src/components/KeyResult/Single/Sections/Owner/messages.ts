import { defineMessages } from 'react-intl'

type KeyResultsSectionOwnerMessage =
  | 'label'
  | 'supportTeam'
  | 'add'
  | 'addSupportTeam'
  | 'addPerson'
  | 'supportTeamDescription'

export default defineMessages<KeyResultsSectionOwnerMessage>({
  label: {
    defaultMessage: 'Responsável',
    id: 'IHNvqx',
    description: 'The label text above the Owner section in our key result single page or drawers',
  },

  supportTeam: {
    defaultMessage: 'Time de Apoio',
    id: 'iWDn4y',
    description:
      'The label text above Support Team section in our key resulg single page or drawers',
  },

  add: {
    defaultMessage: 'Adicionar',
    id: 'U1tYhb',
    description: 'The label text for the add button in our key result single page or drawers',
  },

  addSupportTeam: {
    defaultMessage: 'Adicionar Time de Apoio',
    id: 'ooNWJL',
    description: 'The label text for the add button icon in our key result single page or drawers',
  },

  addPerson: {
    defaultMessage: 'Adicionar Pessoa',
    id: '2+RDgf',
    description: 'The label text for the add button in our support team popover',
  },

  supportTeamDescription: {
    defaultMessage: 'Essas são as pessoas ajudando {name} neste resultado-chave',
    id: '5uf2Lq',
    description: 'The message to guide and describe on what is a support team',
  },
})
