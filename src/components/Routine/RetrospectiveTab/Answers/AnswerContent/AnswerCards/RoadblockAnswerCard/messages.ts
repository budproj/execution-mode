import { defineMessages } from 'react-intl'

type HistoryAnswersCardMessages =
  | 'pauseIconDesc'
  | 'subtitleBarrierStatusOnThisWeek'
  | 'barrierStatusOnThisWeek'

export default defineMessages<HistoryAnswersCardMessages>({
  pauseIconDesc: {
    defaultMessage:
      'Um ícone de pause, que aparece junto com a pergunta de se o usuario tem alguma barreira.',
    id: 'mkTrvf',
    description: 'The alternative text explaining our graphic icon',
  },

  subtitleBarrierStatusOnThisWeek: {
    defaultMessage: 'Essa semana',
    id: 'iVxx6N',
    description:
      'This message appears with a subtitle in the cad that informs the user barrier status for the current week.',
  },

  barrierStatusOnThisWeek: {
    defaultMessage: 'Sim!',
    id: 'nriJkh',
    description: 'This message appears when the user has a blockage during the week.',
  },
})
