import { defineMessages } from 'react-intl'

type ObjectiveAccordionItemMessage =
  | 'calendarIconTitle'
  | 'calendarIconDesc'
  | 'progressTagLabel'
  | 'progressTagTooltip'
  | 'progressTooltip'
  | 'optionsButtonIconDesc'

export default defineMessages<ObjectiveAccordionItemMessage>({
  calendarIconTitle: {
    defaultMessage: 'O prazo deste objetivo',
    id: '/2GFGI',
    description:
      'The title text of our calendar icon in our objective accordion, it is displayed when an user hover the icon itself',
  },

  calendarIconDesc: {
    defaultMessage: 'Um ícone de calendário. Ele indica que nesse campo fica o prazo do objetivo',
    id: 'SpAXmO',
    description:
      'The alternative text explaining our calendar icon in the objective accordion item',
  },

  progressTagLabel: {
    defaultMessage: 'Essa semana:',
    id: '02eAuB',
    description:
      'The text displayed as a prefix in our progress tag label in the team objective accordion button',
  },

  progressTagTooltip: {
    defaultMessage: 'Progresso do objetivo acumulado na semana',
    id: 'gm1hfm',
    description: 'This tooltip explains regarding our progress tag',
  },

  progressTooltip: {
    defaultMessage:
      'O progresso do objetivo é calculado pela média de evolução dos seus resultados-chave. É preciso atingir todos esses resultados para alcançar o objetivo. Por isso, a cor desse indicador reflete a menor confiança entre seus resultados-chave.',
    id: 'kFrglO',
    description: 'This tooltip explains how the progress of the objective is calculated',
  },

  optionsButtonIconDesc: {
    defaultMessage: 'Um ícone de tres pontos, indicando que ao clicar aqui um menu se expandirá',
    id: 'XvdEsU',
    description:
      'The description for screen readers regarding the three dots icon in the objectives accordion',
  },
})
