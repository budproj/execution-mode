import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage = 'sectionTitle' | 'firstOptionLabel'

export default defineMessages<SidebarMenuSectionPreferencesMessage>({
  sectionTitle: {
    defaultMessage: 'Definições',
    id: 'TKIxVB',
    description: 'This title is displayed as the heading of the definitions menu section',
  },

  firstOptionLabel: {
    defaultMessage: 'Meu perfil',
    id: 'JYkjjF',
    description: 'This label defines the text on the first menu section option',
  },
})
