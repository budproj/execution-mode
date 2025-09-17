import { defineMessages } from 'react-intl'

type UpdateModalMessages = 'modalBody' | 'confirmModalButton' | 'closeModalButton'

export default defineMessages<UpdateModalMessages>({
  modalBody: {
    defaultMessage: 'Pesquise ou selecione na lista o time que deseja vincular esse OKR',
    id: 'Lv7vk/',
    description: 'This message appears on the header in update modal.',
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
