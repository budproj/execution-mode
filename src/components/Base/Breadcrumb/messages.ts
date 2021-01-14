import { defineMessages } from 'react-intl'

export type BreadcrumbMessage = 'home' | 'key-results' | 'arrowRightIconDesc' | 'explore'

export default defineMessages<BreadcrumbMessage>({
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

  explore: {
    defaultMessage: 'Explorar',
    id: '987MLd',
    description: 'The name of the Explore page, located at "/explore"',
  },

  arrowRightIconDesc: {
    defaultMessage: 'Um ícone de seta para o lado direito, meramente ilustrativo',
    id: 'FVnpVq',
    description: 'The alternative text explaining our arrow right icon',
  },
})
