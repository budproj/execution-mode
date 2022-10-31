import { defineMessages } from 'react-intl'

type EmptyStateMessage =
  | 'workingTeamAlt'
  | 'emptyFolderAlt'
  | 'pagesAlt'
  | 'emptyBenchAlt'
  | 'checkItem'
  | 'emptyPersonalObjectives'
  | 'emptyNotificationsList'
  | 'noMoreNotificationsToListing'
  | 'zenGirl'

export default defineMessages<EmptyStateMessage>({
  workingTeamAlt: {
    defaultMessage:
      'Um desenho de uma mulher e um homem, cada qual segurando um pedaço de um quebra-cabeça e colaborando para montá-lo',
    id: 'Zn0eYa',
    description: 'The alternative text explaining our team at work image',
  },
  zenGirl: {
    defaultMessage:
      'Um desenho de uma mulher com um café na mão e mexendo em um computador, aparentemente feliz.',
    id: '3dAyni',
    description: 'The alternative text explaining the zen girl image',
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

  emptyPersonalObjectives: {
    defaultMessage: 'Uma mulher analisando gráficos e apontando com um dedo.',
    id: 'XZcPVc',
    description: 'The alternative text explaining the empty item image',
  },

  emptyNotificationsList: {
    defaultMessage: 'Uma caixa vazia.',
    id: 'JKqe2t',
    description: 'The alternative text explain the empty state message from notifications list.',
  },
  noMoreNotificationsToListing: {
    defaultMessage: 'Uma imagem que representa a ausência de novas notificações.',
    id: 'XZF51J',
    description:
      'The alternative text explain the empty state message when no more notifications to listing.',
  },
})
