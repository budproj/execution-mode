import { defineMessages } from 'react-intl'

type SettingsCyclesPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<SettingsCyclesPageMessage>({
  pageTitle: {
    defaultMessage: 'Configurações',
    id: 'HZeOLc',
    description: 'The page title that our users should see in the my profile page',
  },

  metaTitle: {
    defaultMessage: 'Cycles | bud ',
    id: 'tygJHd',
    description: 'The page title that is displayed in the browser tab for the my profile page',
  },

  metaDescription: {
    defaultMessage: 'Visualize e configure os ciclos',
    id: 'kfZAcb',
    description:
      'The page description that is displayed in Google and screen readers for the my profile page',
  },
})
