import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage = 'sectionTitle' | 'firstOptionLabel'

export default defineMessages<SidebarMenuSectionPreferencesMessage>({
  sectionTitle: {
    defaultMessage: 'Legal',
    id: 'W2Rb+N',
    description: 'This title is displayed as the heading of the definitions menu section',
  },

  firstOptionLabel: {
    defaultMessage: 'Termo de Privacidade',
    id: '2yQ5iH',
    description: 'This label defines the text on the first menu section option',
  },
})
