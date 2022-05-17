import { defineMessages } from 'react-intl'

type SidebarMenuSectionPreferencesMessage =
  | 'sectionTitle'
  | 'firstOptionLabel'
  | 'secondOptionLabel'

export default defineMessages<SidebarMenuSectionPreferencesMessage>({
  sectionTitle: {
    defaultMessage: 'Empresa',
    id: '4iiGjr',
    description: 'This title is displayed as the heading of the definitions menu section',
  },

  firstOptionLabel: {
    defaultMessage: 'Usuários',
    id: 'UozvhV',
    description: 'This label defines the text on the first menu section option',
  },

  secondOptionLabel: {
    defaultMessage: 'Ciclos de OKR',
    id: 'ulnySu',
    description: 'This label defines the text on the first menu section option',
  },
})
