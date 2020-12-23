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

  objectives: {
    defaultMessage: 'Objetivos',
    id: '8nqWsp',
    description: 'The name of the Objectives page, located at "/objectives"',
  },

  company: {
    defaultMessage: 'Empresa',
    id: 'uU2v6P',
    description: 'The name of the Company Objectives page, located at "/objectives/company"',
  },

  team: {
    defaultMessage: 'Time',
    id: 'xfeZtN',
    description: 'The name of the Team Objectives page, located at "/objectives/team"',
  },

  arrowRightIconDesc: {
    defaultMessage: 'Um ícone de seta para o lado direito, meramente ilustrativo',
    id: 'FVnpVq',
    description: 'The alternative text explaining our arrow right icon',
  },
}) as Record<BreadcrumbMessages, MessageDescriptor>
