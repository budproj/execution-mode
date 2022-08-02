import { defineMessages } from 'react-intl'

type AddMembersToTeamMessages =
  | 'modalTitle'
  | 'selectMultipleUsersInputState'
  | 'inputEmptyState'
  | 'modalDescription'
  | 'addOneMemberSuccessToast'
  | 'addMultipleMembersSuccessToast'
  | 'addMembersErrorToast'
  | 'confirmModalButton'
  | 'closeModalButton'

export default defineMessages<AddMembersToTeamMessages>({
  selectMultipleUsersInputState: {
    defaultMessage: '{selectedusersquantity} pessoas',
    id: 'zVdCV2',
    description: 'This message appears in the input when multiple users are selected.',
  },
  inputEmptyState: {
    defaultMessage: 'Selecionar...',
    id: 'fsAK9T',
    description: 'This message appears in the input when no user is selected.',
  },

  modalTitle: {
    defaultMessage: 'Adicionar membro ao time',
    id: 'HSCaRw',
    description: 'This is the title of the modal that is used to add members to a team.',
  },
  modalDescription: {
    defaultMessage:
      ' Para adicionar a este time uma pessoa que já tem acesso ao Bud, use o campo abaixo:',
    id: 'lHI54p',
    description: 'This is the description of the modal that is used to add members to a team.',
  },

  addOneMemberSuccessToast: {
    defaultMessage: 'Membro adicionado ao time com sucesso.',
    id: 'atQu7S',
    description: 'This message appears on a successful toast when we add a user to a team.',
  },
  addMultipleMembersSuccessToast: {
    defaultMessage: '{quantityofmembers} membros adicionados ao time com sucesso.',
    id: '+o53JX',
    description:
      'This message appears in a successful toast when we add more than one user to a team.',
  },

  addMembersErrorToast: {
    defaultMessage: 'Selecione ao menos um membro para completar a ação.',
    id: 'TCJuuU',
    description:
      'This message appears as an error Toast when a user tries to add members to a team without selecting at least one.',
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
