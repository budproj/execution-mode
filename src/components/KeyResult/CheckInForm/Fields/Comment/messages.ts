import { MessageDescriptor, defineMessages } from 'react-intl'

type CheckInFormFieldCommentMessages =
  | 'buttonLabel'
  | 'buttonIconDesc'
  | 'buttonIconTitle'
  | 'inputLabel'

export default defineMessages({
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
    defaultMessage: 'Comentário',
    id: 'zgF+iY',
    description: 'This is the label text that is displayed above the input',
  },
}) as Record<CheckInFormFieldCommentMessages, MessageDescriptor>
