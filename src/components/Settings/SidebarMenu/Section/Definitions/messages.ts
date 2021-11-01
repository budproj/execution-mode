import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage =
  | 'sectionTitle'
  | 'firstOptionLabel'
  | 'secondOptionLabel'

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

  secondOptionLabel: {
    defaultMessage: 'Plataforma',
    id: 'HOpxw5',
    description: 'This message is used in the sidebar of our settings page',
  },
})
