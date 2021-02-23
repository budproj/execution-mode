import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage = 'sectionTitle' | 'firstOptionLabel'

export default defineMessages<SidebarMenuSectionPreferencesMessage>({
  sectionTitle: {
    defaultMessage: 'Preferências',
    id: 'FF2KvU',
    description: 'This title is displayed as the heading of the preferences menu section',
  },

  firstOptionLabel: {
    defaultMessage: 'Meu perfil',
    id: 'JYkjjF',
    description: 'This label defines the text on the first menu section option',
  },
})
