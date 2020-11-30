import { MessageDescriptor, defineMessages } from 'react-intl'

export type BreadcrumbMessages = 'home' | 'key-results' | 'arrowRightIconDesc'

export default defineMessages({
  home: {
    defaultMessage: 'Home',
    id: 'RZrZdZ',
    description: 'The name of the Home page, located at "/"',
  },

  'key-results': {
    defaultMessage: 'Minhas Key Result',
    id: 'Pkdkh4',
    description: 'The name of the Key Results page, located at "/keyResults"',
  },

  arrowRightIconDesc: {
    defaultMessage: 'Um ícone de seta para o lado direito, meramente ilustrativo',
    id: 'FVnpVq',
    description: 'The alternative text explaining our arrow right icon',
  },
}) as Record<BreadcrumbMessages, MessageDescriptor>
