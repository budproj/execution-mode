import { defineMessages } from 'react-intl'

type HistoryAnswersCardMessages =
  | 'pauseIconDesc'
  | 'subtitleBarrierStatusOnThisWeek'
  | 'barrierStatusOnThisWeek'
  | 'roadblockCallToActionMessage'

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

  roadblockCallToActionMessage: {
    defaultMessage:
      '{user} está com {count, plural, one {uma barreira} other {barreira{count, plural, one {# semana} other { há # semanas}}}}. Talvez {gender, select, MALE {ele precise de ajuda.} FEMALE {ela precise de ajuda.} other {Que tal oferecer uma ajuda?}} ',
    id: 'uw/x8G',
    description:
      'This message appears how a call to action when the feeling answer refer the bad something.',
  },
})
