import { defineMessages } from 'react-intl'

type SettingsPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<SettingsPageMessage>({
  pageTitle: {
    defaultMessage: 'Configurações',
    id: 'kDC8d3',
    description: 'The page title that our users should see in the settings page',
  },

  metaTitle: {
    defaultMessage: 'Settings | bud ',
    id: 'ganP5k',
    description: 'The page title that is displayed in the browser tab for the settings page',
  },

  metaDescription: {
    defaultMessage: 'Visualize e altere as configurações de sua conta.',
    id: '2nlZ3v',
    description:
      'The page description that is displayed in Google and screen readers for the settings page.',
  },
})
