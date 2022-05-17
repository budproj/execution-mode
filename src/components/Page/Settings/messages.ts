import { defineMessages } from 'react-intl'

type SettingsPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<SettingsPageMessage>({
  pageTitle: {
    defaultMessage: 'Configurações',
    id: 'HZeOLc',
    description: 'The page title that our users should see in the my profile page',
  },

  metaTitle: {
    defaultMessage: 'Settings | bud ',
    id: 'sgir8z',
    description: 'The page title that is displayed in the browser tab for the my profile page',
  },

  metaDescription: {
    defaultMessage: 'Visualize ou altere suas configurações.',
    id: '7j5aFU',
    description:
      'The page description that is displayed in Google and screen readers for the my profile page',
  },
})
