import { defineMessages } from 'react-intl'

type KeyResultsSectionDeadlineMessage = 'iconDescription' | 'heading'

export default defineMessages<KeyResultsSectionDeadlineMessage>({
  iconDescription: {
    defaultMessage:
      'Um ícone de um calendário, indicando que essa é a data limite do seu resultado-chave',
    id: '1Ve0Ag',
    description: 'The description text for the key-result section goal icon',
  },

  heading: {
    defaultMessage: 'Data Limite',
    id: 's6b2FE',
    description: 'The heading text of the goal section in our key-result drawers',
  },
})
