import { defineMessages } from 'react-intl'

type CyclesListBodyColumnActionsMessage =
  | 'optionsButtonDesc'
  | 'firstMenuItemOption'
  | 'secondMenuItemOption'
  | 'thirdMenuItemOption'

export default defineMessages<CyclesListBodyColumnActionsMessage>({
  optionsButtonDesc: {
    defaultMessage: 'Botão de opções.',
    id: 'vrROtV',
    description:
      'This button allows you to view details, reset password or deactivate a users account.',
  },

  firstMenuItemOption: {
    defaultMessage: 'Ver detalhes',
    id: '61S7n7',
    description: 'This message is the description of the option to view details  of a user.',
  },

  secondMenuItemOption: {
    defaultMessage: 'Redefinir senha',
    id: 'minQA9',
    description: 'This message is the description of the option to alter password of a user.',
  },

  thirdMenuItemOption: {
    defaultMessage: 'Desativar conta',
    id: 'GKl+a6',
    description: 'This message is the description of the option to deactivate a user account.',
  },
})
