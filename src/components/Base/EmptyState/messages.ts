import { defineMessages } from 'react-intl'

type EmptyStateMessage = 'workingTeamAlt' | 'emptyFolderAlt'

export default defineMessages<EmptyStateMessage>({
  workingTeamAlt: {
    defaultMessage:
      'Um desenho de uma mulher e um homem, cada qual segurando um pedaço de um quebra-cabeça e colaborando para montá-lo',
    id: 'Zn0eYa',
    description: 'The alternative text explaining our team at work image',
  },

  emptyFolderAlt: {
    defaultMessage: 'Um desenho de uma pasta aberta sem nada dentro',
    id: 'L/b/G/',
    description: 'The alternative text explaining the empty folder image',
  },
})
