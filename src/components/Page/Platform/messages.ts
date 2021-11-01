import { defineMessages } from 'react-intl'

type SettingsMyAccountPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<SettingsMyAccountPageMessage>({
  pageTitle: {
    defaultMessage: 'Plataforma',
    id: 'gioO8X',
    description: 'The page title that our users should see in the platform settings page',
  },

  metaTitle: {
    defaultMessage: 'Configurações da plataforma | bud ',
    id: 'fX4pLO',
    description:
      'The page title that is displayed in the browser tab for the platform settings page',
  },

  metaDescription: {
    defaultMessage: 'Visualize e atualize as preferências referentes a plataforma',
    id: 'z75EmS',
    description:
      'The page description that is displayed in Google and screen readers for the platform settings page',
  },
})
