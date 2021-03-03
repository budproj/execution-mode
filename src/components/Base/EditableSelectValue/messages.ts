import { defineMessages } from 'react-intl'

type EditableSelectValueMessage = 'fallbackPlaceholder' | 'editableIconDesc' | 'editableIconTitle'

export default defineMessages<EditableSelectValueMessage>({
  fallbackPlaceholder: {
    defaultMessage: 'Nenhuma informação',
    id: 'eI6jYw',
    description:
      'The fallback value appears if no value is defined for that input. This input is customizable, so it will only appears if no value is defined, and no custom fallback value was provided',
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
