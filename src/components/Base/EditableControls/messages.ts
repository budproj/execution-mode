import { defineMessages } from 'react-intl'

type EditableControlsMessage =
  | 'cancelButtonDesc'
  | 'submitButtonDesc'
  | 'editableIconDesc'
  | 'editableIconTitle'

export default defineMessages<EditableControlsMessage>({
  cancelButtonDesc: {
    defaultMessage:
      'Um botão com um ícone de X. Ao clicar nele você irá cancelar a atualização do objetivo',
    id: 'npWxt7',
    description:
      'This text is displayed inside the objective accordion at the team page. It is used by screen readers to explain the cancel button',
  },

  submitButtonDesc: {
    defaultMessage:
      'Um botão com um ícone de confirmação. Ao clicar nele você irá salvar sua atualização do objetivo',
    id: 'xfx/rc',
    description:
      'This text is displayed inside the objective accordion at the team page. It is used by screen readers to explain the check button',
  },

  editableIconDesc: {
    defaultMessage: 'Um ícone de caneta. Ao clicar nele você irá editar esse campo',
    id: 'pLYuso',
    description:
      'The description for our pen icon. This message is used by screen readers to improve our accesibility',
  },

  editableIconTitle: {
    defaultMessage: 'Clique aqui para editar esse campo',
    id: 'WKevJy',
    description: 'The title for our pen icon. This message is displayed in our UI as a tooltip',
  },
})
