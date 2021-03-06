import { defineMessages } from 'react-intl'

type SettingsMyAccountPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<SettingsMyAccountPageMessage>({
  pageTitle: {
    defaultMessage: 'Minha conta',
    id: 'h4sP/q',
    description: 'The page title that our users should see in the my profile page',
  },

  metaTitle: {
    defaultMessage: 'Minha conta | bud ',
    id: '2lGnmq',
    description: 'The page title that is displayed in the browser tab for the my profile page',
  },

  metaDescription: {
    defaultMessage: 'Visualize e atualize as preferências do seu perfil',
    id: 'fwIpqP',
    description:
      'The page description that is displayed in Google and screen readers for the my profile page',
  },
})
