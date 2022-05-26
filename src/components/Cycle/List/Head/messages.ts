import { defineMessages } from 'react-intl'

type CycleListHeadMessage =
  | 'listHeadCycle'
  | 'listHeadActions'
  | 'listHeadCadenceLevel'
  | 'listHeadDateStart'
  | 'listHeadEndDate'
  | 'listHeadStatus'

export default defineMessages<CycleListHeadMessage>({
  listHeadCycle: {
    defaultMessage: 'Nome do Ciclo',
    id: 'tjSA87',
    description:
      'This message is displayed as the column header for the cycle table in the cycle name column',
  },

  listHeadActions: {
    defaultMessage: 'Ações',
    id: 'F9UdBv',
    description:
      'This message is displayed as the column header for the cycle table in the actions column',
  },

  listHeadCadenceLevel: {
    defaultMessage: 'Cadência',
    id: 'ZvutBL',
    description:
      'This message is displayed as the column header for the cycles table in the cadence column',
  },

  listHeadStatus: {
    defaultMessage: 'Status',
    id: '8gbub2',
    description:
      'This message is displayed as the column header for the cycle table in the status column',
  },

  listHeadDateStart: {
    defaultMessage: 'Início',
    id: 'f2OulU',
    description:
      'This message is displayed as the column header for the cycle table in the date start column',
  },

  listHeadEndDate: {
    defaultMessage: 'Fim',
    id: 'Lt+YEZ',
    description:
      'This message is displayed as the column header for the cycle table in the date end column',
  },
})
