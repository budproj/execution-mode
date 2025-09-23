import { defineMessages } from 'react-intl'

type UpdateModalMessages = 'modalBody' | 'confirmModalButton' | 'closeModalButton' | 'modalTitle'

export default defineMessages<UpdateModalMessages>({
  modalBody: {
    defaultMessage: 'Pesquise ou selecione na lista o {option} que deseja vincular esse OKR',
    id: 'AjIgUB',
    description: 'This message appears on update modal body.',
  },

  modalTitle: {
    defaultMessage: 'Alterar o {type} deste OKR',
    id: 'urN1WV',
    description: 'This message appears on update modal title.',
  },

  confirmModalButton: {
    defaultMessage: 'ADICIONAR',
    id: 'ZkqTBK',
    description: 'This button is used to add selected members to a team.',
  },

  closeModalButton: {
    defaultMessage: 'CANCELAR',
    id: 'bdYpnS',
    description: 'This button is used to close the modal to add team members.',
  },
})
