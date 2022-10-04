import { defineMessages } from 'react-intl'

type HistoryAnswersCardMessages =
  | 'graphicIconDesc'
  | 'historyAnswersCardTitle'
  | 'arrowRightIcon'
  | 'arrowLeftIcon'

export default defineMessages<HistoryAnswersCardMessages>({
  graphicIconDesc: {
    defaultMessage:
      'Um ícone de gráfico que aparece ao lado da lista de histórico de respostas de um usuário.',
    id: 'QcWe3c',
    description: 'The alternative text explaining our graphic icon',
  },

  historyAnswersCardTitle: {
    defaultMessage: 'Histórico de respostas',
    id: '2Vtwxl',
    description:
      'This message appears as the title of the card that lists the history of retrospectives answered by a user.',
  },
  arrowRightIcon: {
    defaultMessage:
      'Um ícone de seta para a direita que indica que o usuário pode avançar no histórico para conferir outras respostas da rotina.',
    id: 'gOltd4',
    description: 'The alternative text explaining our graphic icon',
  },
  arrowLeftIcon: {
    defaultMessage:
      'Um ícone de seta para a esquerda que indica que o usuário pode retroceder no histórico para conferir outras respostas da rotina.',
    id: 'h6wsCP',
    description: 'The alternative text explaining our graphic icon',
  },
})
