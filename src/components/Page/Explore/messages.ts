import { defineMessages } from 'react-intl'

type TeamsOverviewPageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<TeamsOverviewPageMessage>({
  pageTitle: {
    defaultMessage: 'Explorar',
    id: '5yQyMg',
    description: 'The page title that our users should see in the teams explore page',
  },

  metaTitle: {
    defaultMessage: 'Explorar | bud ',
    id: 'z1+f17',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize o avanço geral de todas as áreas da empresa e os respectivos times que as compõem através das barras de evolução.',
    id: 'uXQE/x',
    description: 'The page description that is displayed in Google and screen readers',
  },
})
