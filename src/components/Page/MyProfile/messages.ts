import { defineMessages } from 'react-intl'

type MyProfilePageMessage = 'pageTitle' | 'metaTitle' | 'metaDescription'

export default defineMessages<MyProfilePageMessage>({
  pageTitle: {
    defaultMessage: 'Meu perfil',
    id: 'ilU+Uz',
    description: 'The page title that our users should see in the my profile page',
  },

  metaTitle: {
    defaultMessage: 'Meu perfil | bud ',
    id: 'vm0Yuj',
    description: 'The page title that is displayed in the browser tab for the my profile page',
  },

  metaDescription: {
    defaultMessage: 'Altere seu perfil',
    id: 'jp5RLv',
    description:
      'The page description that is displayed in Google and screen readers for the my profile page',
  },
})
