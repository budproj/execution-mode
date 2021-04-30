import { defineMessages } from 'react-intl'

type EditableTextAreaValueMessage =
  | 'fallbackValue'
  | 'editableIconDesc'
  | 'editableIconTitle'
  | 'cancelIconDesc'
  | 'cancelIconTitle'
  | 'saveIconDesc'
  | 'saveIconTitle'

export default defineMessages<EditableTextAreaValueMessage>({
  fallbackValue: {
    defaultMessage: 'Nenhuma informação',
    id: 'CWzl6a',
    description:
      'The fallback value appears if no value is defined for that text area. This text area is customizable, so it will only appears if no value is defined, and no custom fallback value was provided',
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

  cancelIconDesc: {
    defaultMessage: 'Um ícone de X. Ao clicar nele você irá cancelar a edição deste campo',
    id: 'FQaST6',
    description:
      'This text is used by screen readers to explain the X icon. This icon appears below an EditableTextArea. It is used to cancel the edition of that field',
  },

  cancelIconTitle: {
    defaultMessage: 'Cancelar',
    id: 'ObFHxY',
    description:
      'This text appears as a browser tooltip above the icon. This icon appears below an EditableTextArea. It is used to cancel the edition of that field',
  },

  saveIconDesc: {
    defaultMessage: 'Um ícone de check. Ao clicar nele você irá salvar suas alterações',
    id: 'xywRWB',
    description:
      'This text is used by screen readers to explain the check icon. This icon appears below the EditableTextArea. It is used to save the edition of the field',
  },

  saveIconTitle: {
    defaultMessage: 'Salvar',
    id: 'A6/DXF',
    description:
      'This text appears as a browser tooltip above the icon. This icon appears below an EditableTextArea. It is used to save the edition of that field',
  },
})
