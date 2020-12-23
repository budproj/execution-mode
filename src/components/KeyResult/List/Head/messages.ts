import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultListHeadMessages =
  | 'listHeadTitle'
  | 'listHeadOKR'
  | 'listHeadStatus'
  | 'listHeadProgress'
  | 'listHeadDate'
  | 'listHeadOwner'
  | 'listHeadStatusColor'

export default defineMessages({
  listHeadTitle: {
    defaultMessage: 'Nome da KR',
    id: 'vzYQ5r',
    description: 'The text of the table head related to the Title column',
  },

  listHeadOKR: {
    defaultMessage: 'OKR',
    id: '9hslRd',
    description: 'The text of the table head related to the OKR column',
  },

  listHeadStatus: {
    defaultMessage: 'Status',
    id: 'MfmBCB',
    description: 'The text of the table head related to the Status column',
  },

  listHeadProgress: {
    defaultMessage: 'Progresso',
    id: 'kXNgkQ',
    description: 'The text of the table head related to the Progress column',
  },

  listHeadDate: {
    defaultMessage: 'Data',
    id: '17XVCU',
    description: 'The text of the table head related to the Date column',
  },

  listHeadOwner: {
    defaultMessage: 'Proprietário',
    id: 'BlDXcz',
    description: 'The text of the table head related to the Owner column',
  },

  listHeadStatusColor: {
    defaultMessage: 'Cor do Status',
    id: 'keLWnT',
    description: 'The text of the table head related to the Status color column',
  },
}) as Record<KeyResultListHeadMessages, MessageDescriptor>
