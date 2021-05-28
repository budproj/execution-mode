import { defineMessages } from 'react-intl'

type CheckInFormFieldCommentMessage =
  | 'buttonLabel'
  | 'buttonIconDesc'
  | 'buttonIconTitle'
  | 'inputLabel'
  | 'submitButtonText'

export default defineMessages<CheckInFormFieldCommentMessage>({
  buttonLabel: {
    defaultMessage: 'Adicionar Comentário',
    id: 'm4igWj',
    description:
      'This is the label text that is displayed as a button as soon the check in form is displayed',
  },

  buttonIconDesc: {
    defaultMessage: 'Um ícone circular, com bordas e um símbolo de mais ao centro',
    id: 'poN086',
    description: 'This is the desc text that is displayed for screen readers',
  },

  buttonIconTitle: {
    defaultMessage: 'Clique aqui para começar a escrever um comentário',
    id: 'bqCVp4',
    description: 'This is the title text that is displayed if the user hovers the mouse in it',
  },

  inputLabel: {
    defaultMessage: 'Sobre esse check-in',
    id: 'unuB2s',
    description: 'This is the label text that is displayed above the input',
  },

  submitButtonText: {
    defaultMessage: 'Enviar comentário',
    id: 'dgMLta',
    description: 'This label is displayed in the submit button in our drawers',
  },
})
