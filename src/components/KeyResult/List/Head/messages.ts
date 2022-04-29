import { defineMessages } from 'react-intl'

type KeyResultListHeadMessage =
  | 'listHeadKeyResult'
  | 'listHeadKeyResultTooltip'
  | 'listHeadObjective'
  | 'listHeadObjectiveTooltip'
  | 'listHeadConfidenceLevel'
  | 'listHeadProgress'
  | 'listHeadProgressTooltip'
  | 'listHeadCycle'
  | 'listHeadCycleTooltip'
  | 'listHeadOwner'
  | 'listHeadOwnerTooltip'
  | 'listHeadConfidenceLevelColor'
  | 'listHeadConfidenceLevelIconDesc'
  | 'listHeadPercentualProgress'
  | 'listHeadPercentualProgressTooltip'
  | 'listHeadActions'
  | 'listHeadTeam'

export default defineMessages<KeyResultListHeadMessage>({
  listHeadKeyResult: {
    defaultMessage: 'Resultado-chave',
    id: 'fd6kjy',
    description: 'The text of the table head related to the KeyResult column',
  },

  listHeadKeyResultTooltip: {
    defaultMessage: 'Esses são os resultados-chave que fazem parte desse objetivo',
    id: '3n0bhJ',
    description: 'This tooltip explains the first column of the key result list',
  },

  listHeadObjective: {
    defaultMessage: 'Objetivo',
    id: '8LTdv4',
    description: 'The text of the table head related to the Objective column',
  },

  listHeadObjectiveTooltip: {
    defaultMessage: 'Cada resultado-chave pertence a um objetivo',
    id: 'dymB9a',
    description: 'This tooltip explains the second column of the key result list',
  },

  listHeadConfidenceLevel: {
    defaultMessage: 'Confiança',
    id: 'X2V7x7',
    description: 'The text of the table head related to the Confidence Level column',
  },

  listHeadProgress: {
    defaultMessage: 'Progresso',
    id: 'kXNgkQ',
    description: 'The text of the table head related to the Progress column',
  },

  listHeadProgressTooltip: {
    defaultMessage: 'Indica o quanto esse resultado-chave evoluiu até o momento',
    id: '0d1/rp',
    description: 'This tooltip explains the fourth column of the key result list',
  },

  listHeadCycle: {
    defaultMessage: 'Ciclo',
    id: 'IGODpK',
    description: 'The text of the table head related to the Cycle column',
  },

  listHeadCycleTooltip: {
    defaultMessage: 'Descreve o período no qual esse resultado-chave faz parte',
    id: 'Smwz9L',
    description: 'This tooltip explains the sixth column of the key result list',
  },

  listHeadOwner: {
    defaultMessage: 'Responsável',
    id: 'u7Yaxx',
    description: 'The text of the table head related to the Owner column',
  },

  listHeadOwnerTooltip: {
    defaultMessage: 'A pessoa responsável por garantir que esse resultado-chave aconteça',
    id: 'wJjuae',
    description: 'This tooltip explains the seventh column of the key result list',
  },

  listHeadConfidenceLevelColor: {
    defaultMessage: 'Cor do Nível de Confiança',
    id: 'F33Lyk',
    description: 'The text of the table head related to the Confidence Level color column',
  },

  listHeadConfidenceLevelIconDesc: {
    defaultMessage: 'Um círculo com um ponto de interrogação ao centro',
    id: 'wwt9p1',
    description: 'This message describes the info circle icon to our screen readers',
  },

  listHeadPercentualProgress: {
    defaultMessage: '%',
    id: 'KSjqcC',
    description: 'The text of the table head related to the percentual progress column',
  },

  listHeadPercentualProgressTooltip: {
    defaultMessage: 'Percentual de progresso entre o valor inicial e a meta',
    id: 'QEsnT8',
    description: 'This tooltip explains the fifth column of the key result list',
  },

  listHeadActions: {
    defaultMessage: 'Ações',
    id: 'QKkwxU',
    description:
      'This message is displayed as the column header for the key-result table in the actions column',
  },

  listHeadTeam: {
    defaultMessage: 'Team',
    id: 'yROxQI',
    description:
      'This message is displayed as the column header for the key-result table in the team column',
  },
})
