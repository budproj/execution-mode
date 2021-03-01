import { defineMessages } from 'react-intl'

type EditableInputFieldMessage = 'fallbackValue' | 'editableIconDesc' | 'editableIconTitle'

export default defineMessages<EditableInputFieldMessage>({
  fallbackValue: {
    defaultMessage: 'Nenhuma informação',
    id: 'yJ4O6G',
    description:
      'The fallback value appears if no value is defined for that field. This field is customizable, so it will only appears if no value is defined, and no custom fallback value was provided',
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
