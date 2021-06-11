import { defineMessages } from 'react-intl'

type ObjectiveAccordionMenuMessage =
  | 'firstMenuOption'
  | 'secondMenuOption'
  | 'thirdMenuOption'
  | 'deleteObjectiveDialogType'
  | 'deleteObjectiveDescription'
  | 'deleteObjectiveSuccessToastMessage'
  | 'deleteObjectiveErrorToastMessage'

export default defineMessages<ObjectiveAccordionMenuMessage>({
  firstMenuOption: {
    defaultMessage: 'Adicionar resultado-chave',
    id: '7tvIOz',
    description:
      'This is the first option that appears when you open the menu of a given objective inside the accordion button',
  },

  secondMenuOption: {
    defaultMessage: 'Editar este OKR',
    id: 'd7EKd5',
    description:
      'This is the second option that appears when you open the menu of a given objective inside the accordion button',
  },

  thirdMenuOption: {
    defaultMessage: 'Excluir este OKR',
    id: '6BeRhq',
    description:
      'This is the third option that appears when you open the menu of a given objective inside the accordion button',
  },

  deleteObjectiveDialogType: {
    defaultMessage: 'objetivo',
    id: 'lf4c2p',
    description: 'This message is used as our resource type while removing a objective',
  },

  deleteObjectiveDescription: {
    defaultMessage:
      'Você perderá todos os resultados-chave deste OKR, incluindo todos os check-ins e comentários feitos até aqui.',
    id: 'IGHT6z',
    description: 'This message is used as the modal description while removing a given objective',
  },

  deleteObjectiveSuccessToastMessage: {
    defaultMessage: 'O objetivo foi removido com sucesso',
    id: 'jjr+Ye',
    description: 'This message appears in a toast after the user removes an objective',
  },

  deleteObjectiveErrorToastMessage: {
    defaultMessage: 'Desculpe, mas houve um erro inesperado. Tente novamente mais tarde',
    id: 'SDzYq9',
    description:
      'This message appears when the user tries to remove a given objective, but receives an error',
  },
})
