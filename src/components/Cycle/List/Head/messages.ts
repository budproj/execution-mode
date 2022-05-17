import { defineMessages } from 'react-intl'

type CycleListHeadMessage =
  | 'listHeadCycle'
  | 'listHeadActions'
  | 'listHeadCadenceLevel'
  | 'listHeadInitialDate'
  | 'listHeadEndDate'
  | 'listHeadStatus'
  | 'listHeadCycleTooltip'
  | 'listHeadObjectiveTooltip'
  | 'listHeadProgressTooltip'
  | 'listHeadCadenceLevelTooltip'
  | 'listHeadCycleTooltip'
  | 'listHeadStatusTooltip'
  | 'listHeadInitialDateTooltip'
  | 'listHeadEndDateTooltip'

export default defineMessages<CycleListHeadMessage>({
  listHeadCycle: {
    defaultMessage: 'Nome do Ciclo',
    id: 'F799As',
    description: 'The text of the table head related to the Cycle column',
  },

  listHeadActions: {
    defaultMessage: 'Ações',
    id: 'QKkwxU',
    description:
      'This message is displayed as the column header for the key-result table in the actions column',
  },

  listHeadCadenceLevel: {
    defaultMessage: 'Cadência',
    id: 'fJX5q1',
    description:
      'This message is displayed as the column header for the key-result table in the team column',
  },

  listHeadStatus: {
    defaultMessage: 'Status',
    id: 'MeJoZG',
    description:
      'This message is displayed as the column header for the key-result table in the team column',
  },

  listHeadInitialDate: {
    defaultMessage: 'Início',
    id: '8OLoaN',
    description:
      'This message is displayed as the column header for the key-result table in the team column',
  },

  listHeadEndDate: {
    defaultMessage: 'Fim',
    id: 'w7obzY',
    description:
      'This message is displayed as the column header for the key-result table in the team column',
  },

  listHeadCycleTooltip: {
    defaultMessage: 'list head cycle tooltip',
    id: 'dhhB4+',
    description: 'mudar',
  },

  listHeadObjectiveTooltip: {
    defaultMessage: 'list head objective tooltip',
    id: 'L4pSwX',
    description: 'mudar',
  },
  listHeadProgressTooltip: {
    defaultMessage: 'list head progress tooltip',
    id: '1q3tFT',
    description: 'mudar',
  },

  listHeadCadenceLevelTooltip: {
    defaultMessage: 'list cadence level tooltip',
    id: 'vs//wP',
    description: 'mudar',
  },

  listHeadStatusTooltip: {
    defaultMessage: 'list status tooltip',
    id: '0VBpVT',
    description: 'mudar',
  },

  listHeadInitialDateTooltip: {
    defaultMessage: 'list initial date tooltip',
    id: '6K0+rp',
    description: 'mudar',
  },

  listHeadEndDateTooltip: {
    defaultMessage: 'list end date tooltip',
    id: 'flhqtR',
    description: 'mudar',
  },
})
