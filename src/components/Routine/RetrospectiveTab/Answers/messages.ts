import { defineMessages } from 'react-intl'

type AnswersMessage =
  | 'arrowLeftIconDescription'
  | 'arrowRightIconDescription'
  | 'threeLayersIconDescription'
  | 'redBellIconDescription'
  | 'notAnsweredText'
  | 'answerNowButton'
  | 'clockIconDescription'
  | 'thinkingBalloonDescription'
  | 'hourPrefix'
  | 'noAnswerText'
  | 'weekText'

export default defineMessages<AnswersMessage>({
  arrowLeftIconDescription: {
    defaultMessage: 'Seta para esquerda',
    id: 'kbccVO',
    description: 'The description of the arrow icon.',
  },
  arrowRightIconDescription: {
    defaultMessage: 'Seta para direita',
    id: 'MIYGie',
    description: 'The description of the arrow icon.',
  },

  threeLayersIconDescription: {
    defaultMessage: 'Ícone de filtro com 3 linhas',
    id: 'I3ms2g',
    description: 'The description of three layer icon that filters the answer search.',
  },
  redBellIconDescription: {
    defaultMessage: 'Ícone de sino vermelho',
    id: '91fiAW',
    description: 'The description of bell icon that warns you to answer the routine. ',
  },
  notAnsweredText: {
    defaultMessage: 'Você ainda não respondeu essa semana.',
    id: 'ZmSQ0o',
    description:
      "The text that appears at the bottom of the answer component if you didn't answer the routine yet",
  },
  answerNowButton: {
    defaultMessage: 'Responder agora',
    id: 'RojqOy',
    description: 'The text in the button to answer the routine',
  },
  clockIconDescription: {
    defaultMessage: 'Ícone de relógio',
    id: 'QOiwwe',
    description: 'The description of the clock icon',
  },
  thinkingBalloonDescription: {
    defaultMessage: 'Ícone de um balão de fala',
    id: 'd62Bt/',
    description: 'The description of the thinking balloon icon',
  },
  hourPrefix: {
    defaultMessage: '{today, select, true {hoje às} false {às} other {às}}',
    id: 'AngG7m',
    description: 'The prefix of the hour description',
  },
  noAnswerText: {
    defaultMessage: 'sem resposta',
    id: 'AFjRlx',
    description: "The text that appears in the user list, if the user hasn't answered yet",
  },
  weekText: {
    defaultMessage: 'Semana',
    id: 'IfVw1+',
    description: 'The text that appears at the week description',
  },
})
