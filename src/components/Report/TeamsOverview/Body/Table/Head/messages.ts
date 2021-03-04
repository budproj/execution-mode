import { defineMessages } from 'react-intl'

type TeamsOverviewBodyMessage =
  | 'firstColumnTitle'
  | 'firstColumnTooltip'
  | 'secondColumnTitle'
  | 'secondColumnTooltip'
  | 'thirdColumnTitle'
  | 'thirdColumnTooltip'

export default defineMessages<TeamsOverviewBodyMessage>({
  firstColumnTitle: {
    defaultMessage: 'Posição do time',
    id: 'CkCxOl',
    description:
      'The title of the first column in our body table at the teams overview report in our dashboard',
  },

  firstColumnTooltip: {
    defaultMessage: 'Ordenada pelo progresso',
    id: 'jxyYl3',
    description: 'This tooltip appears when the user hovers the first column title',
  },

  secondColumnTitle: {
    defaultMessage: 'Progresso',
    id: '+r3NGz',
    description:
      'The title of the second column in our body table at the teams overview report in our dashboard',
  },

  secondColumnTooltip: {
    defaultMessage:
      'Calculado pela média do progresso de todos os objetivos de um time e dos “sub-times” abaixo dele',
    id: 'dB4Sbq',
    description: 'This tooltip appears when the user hovers the second column title',
  },

  thirdColumnTitle: {
    defaultMessage: 'Essa semana',
    id: 'RN1J2p',
    description:
      'The title of the third column in our body table at the teams overview report in our dashboard',
  },

  thirdColumnTooltip: {
    defaultMessage: 'Esse é o progresso acumulado dessa semana',
    id: 'f6/kwR',
    description: 'This tooltip appears when the user hovers the third column title',
  },
})
