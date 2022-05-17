import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage = 'sectionTitle' | 'firstOptionLabel'

export default defineMessages<SidebarMenuSectionPreferencesMessage>({
  sectionTitle: {
    defaultMessage: 'Minha conta',
    id: 'SdgM/R',
    description: 'This title is displayed as the heading of the definitions menu section',
  },

  firstOptionLabel: {
    defaultMessage: 'Informações pessoais',
    id: 'CEhx3c',
    description: 'This label defines the text on the first menu section option',
  },
})
