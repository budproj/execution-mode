import { defineMessages } from 'react-intl'

type EditableFieldMessage = 'fallbackValue'

export default defineMessages<EditableFieldMessage>({
  fallbackValue: {
    defaultMessage: 'Nenhuma informação',
    id: 'yJ4O6G',
    description:
      'The fallback value appears if no value is defined for that field. This field is customizable, so it will only appears if no value is defined, and no custom fallback value was provided',
  },
})
