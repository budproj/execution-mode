import { MessageDescriptor, defineMessages } from 'react-intl'

export default defineMessages({
  tableHeadTitle: {
    defaultMessage: 'Nome da KR',
    id: 'vzYQ5r',
    description: 'The text of the table head related to the Title column',
  },

  tableHeadOKR: {
    defaultMessage: 'OKR',
    id: '9hslRd',
    description: 'The text of the table head related to the OKR column',
  },

  tableHeadStatus: {
    defaultMessage: 'Status',
    id: 'MfmBCB',
    description: 'The text of the table head related to the Status column',
  },

  tableHeadProgress: {
    defaultMessage: 'Progresso',
    id: 'kXNgkQ',
    description: 'The text of the table head related to the Progress column',
  },

  tableHeadDate: {
    defaultMessage: 'Data',
    id: '17XVCU',
    description: 'The text of the table head related to the Date column',
  },

  tableHeadOwner: {
    defaultMessage: 'Proprietário',
    id: 'BlDXcz',
    description: 'The text of the table head related to the Owner column',
  },
}) as Record<string, MessageDescriptor>
