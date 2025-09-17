import { defineMessages } from 'react-intl'

type ObjectiveAccordionMenuMessage =
  | 'optionsButtonIconDesc'
  | 'firstMenuOption'
  | 'secondMenuOption'
  | 'thirdMenuOption'
  | 'fourthMenuOption'
  | 'deleteDialogKeyword'
  | 'deleteObjectiveFirstStageTitle'
  | 'deleteObjectiveFirstStageDescription'
  | 'deleteDialogConfirmationLabel'
  | 'deleteObjectiveSuccessToastMessage'
  | 'deleteObjectiveErrorToastMessage'
  | 'updateObjectiveSucessToastMessage'
  | 'updateObjectiveErrorToastMessage'

export default defineMessages<ObjectiveAccordionMenuMessage>({
  optionsButtonIconDesc: {
    defaultMessage: 'Um ícone de tres pontos, indicando que ao clicar aqui um menu se expandirá',
    id: 'XvdEsU',
    description:
      'The description for screen readers regarding the three dots icon in the objectives accordion',
  },

  firstMenuOption: {
    defaultMessage: 'Editar este Objetivo',
    id: 'I+bKe4',
    description:
      'This is the second option that appears when you open the menu of a given objective inside the accordion button',
  },

  secondMenuOption: {
    defaultMessage: 'Criar resultado-Chave',
    id: 'VO76hY',
    description:
      'This is the first option that appears when you open the menu of a given objective inside the accordion button',
  },

  thirdMenuOption: {
    defaultMessage: 'Excluir este Objetivo',
    id: 'PmauyJ',
    description:
      'This is the third option that appears when you open the menu of a given objective inside the accordion button',
  },

  fourthMenuOption: {
    defaultMessage: 'Mover este KR para outro Time',
    id: 'RG75lg',
    description:
      'This is the fourth option that appears when you open the menu of a given objective inside the accordion button',
  },

  deleteDialogKeyword: {
    defaultMessage: 'EXCLUIR',
    id: 'N8Xs+4',
    description: 'This message is used as a keyword to remove a given objective',
  },

  deleteObjectiveFirstStageTitle: {
    defaultMessage: 'Tem certeza que deseja excluir este objetivo?',
    id: 'QpkwoM',
    description: 'This message is used as the first dialog title while removing an objective',
  },

  deleteObjectiveFirstStageDescription: {
    defaultMessage:
      'Você perderá todos os resultados-chave deste OKR, incluindo todos os check-ins e comentários feitos até aqui.',
    id: 'IGHT6z',
    description: 'This message is used as the modal description while removing a given objective',
  },

  deleteDialogConfirmationLabel: {
    defaultMessage: 'Excluir objetivo',
    id: 'Pf0TwP',
    description: 'This message is used in the confirmation button while removing a given objective',
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

  updateObjectiveSucessToastMessage: {
    defaultMessage: 'O objetivo foi movido de time com sucesso.',
    id: 'ws7tAT',
    description: 'This message appears on a successful toast when update objective team.',
  },

  updateObjectiveErrorToastMessage: {
    defaultMessage: 'Desculpe, mas houve um erro inesperado. Tente novamente mais tarde.',
    id: 'xSSnsF',
    description: 'This message appears on a error toast when update objective team.',
  },
})
