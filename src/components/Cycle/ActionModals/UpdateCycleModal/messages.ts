import { defineMessages } from 'react-intl'

type ActionMenuMessage =
  | 'crateCycleModalTitle'
  | 'editCycleModalTitle'
  | 'cycleActionModalCreateDesc'
  | 'cycleActionModalEditDesc'
  | 'successEditToastMessage'
  | 'existingUserErrorToastMessage'
  | 'unknownErrorToastMessage'
  | 'closeModalButton'
  | 'saveEditCycleButton'

export default defineMessages<ActionMenuMessage>({
  crateCycleModalTitle: {
    defaultMessage: 'Criar novo ciclo',
    id: 'ZCWI2f',
    description: 'The title for cycle modal',
  },

  editCycleModalTitle: {
    defaultMessage: 'Editar ciclo',
    id: 'Vytr8A',
    description: 'The title for cycle modal',
  },
  cycleActionModalCreateDesc: {
    defaultMessage: 'Para criar um novo ciclo de OKRs,{breakline} preencha os campos abaixo:',
    id: 'rFUuVv',
    description: 'The description for cycle modal',
  },

  cycleActionModalEditDesc: {
    defaultMessage: 'Use os campos abaixo para fazer{breakline} alterações neste ciclo:',
    id: 'L3D4+H',
    description: 'The description for cycle modal',
  },

  successEditToastMessage: {
    defaultMessage: 'Ciclo {period} editado com sucesso!',
    id: 't7xKJo',
    description: 'This message appears when we create a new cycle as a toast',
  },

  existingUserErrorToastMessage: {
    defaultMessage: 'Não foi possível criar o ciclo.',
    id: 'MyqmeF',
    description: 'This message is used as an toast error message when we try to create an cycle',
  },

  unknownErrorToastMessage: {
    defaultMessage: 'Desculpe, aconteceu um erro inesperado. Tente novamente mais tarde',
    id: 'cGFQsk',
    description:
      'This message appears as an error toast when we have an unknown error while creating a new cycle',
  },

  closeModalButton: {
    defaultMessage: 'Cancelar',
    id: 'ej/Q3X',
    description: 'The button to close the modal cycle',
  },

  saveEditCycleButton: {
    defaultMessage: 'Salvar',
    id: 'TGP9cN',
    description: 'The button to create or edit a cycle on modal',
  },
})
