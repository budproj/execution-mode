import { defineMessages } from 'react-intl'

export type BreadcrumbMessage =
  | 'home'
  | 'key-results'
  | 'arrowRightIconDesc'
  | 'overview'
  | 'company'
  | 'team'

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

  overview: {
    defaultMessage: 'Visão Geral',
    id: 'UgaIhX',
    description: 'The name of the Overview page, located at "/overview"',
  },

  company: {
    defaultMessage: 'Empresa',
    id: 'loRR0C',
    description: 'The name of the Company Objectives page, located at "/overview/company"',
  },

  team: {
    defaultMessage: 'Time',
    id: '0JqGQL',
    description: 'The name of the Team Objectives page, located at "/overview/team"',
  },

  arrowRightIconDesc: {
    defaultMessage: 'Um ícone de seta para o lado direito, meramente ilustrativo',
    id: 'FVnpVq',
    description: 'The alternative text explaining our arrow right icon',
  },
})
