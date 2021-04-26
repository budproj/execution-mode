import { defineMessages } from 'react-intl'

type EditableInputValueMessage =
  | 'fallbackValue'
  | 'editableIconDesc'
  | 'editableIconTitle'
  | 'collapseButton'
  | 'expandButton'

export default defineMessages<EditableInputValueMessage>({
  fallbackValue: {
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

  expandButton: {
    defaultMessage: 'Ver mais...',
    id: '+G9goh',
    description: 'This text is displayed in the button that expands a truncated text',
  },

  collapseButton: {
    defaultMessage: 'Ver menos...',
    id: 'I+MSuS',
    description: 'This text is displayed in the button that collapses the truncated text',
  },
})
