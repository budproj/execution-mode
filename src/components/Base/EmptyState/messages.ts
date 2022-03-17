import { defineMessages } from 'react-intl'

type EmptyStateMessage =
  | 'workingTeamAlt'
  | 'emptyFolderAlt'
  | 'pagesAlt'
  | 'emptyBenchAlt'
  | 'checkItem'

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

  pagesAlt: {
    defaultMessage: 'Algumas páginas, exibindo também alguns ícones e outros desenhos',
    id: '1rAwNV',
    description: 'The alternative text explaining the pages image',
  },

  emptyBenchAlt: {
    defaultMessage: 'Um banco vazio, representando que não tem ninguém aqui',
    id: 'zUEhBk',
    description: 'The alternative text explaining the empty bench image',
  },

  checkItem: {
    defaultMessage: 'Uma mão apertando um botão com um icone de seleção de uma tarefa',
    id: 'GepLaP',
    description: 'The alternative text explaining the check item image',
  },
})
