import { defineMessages } from 'react-intl'

type SettingsAccountUserCardPreviewMessage = 'title' | 'subtitle'

export default defineMessages<SettingsAccountUserCardPreviewMessage>({
  title: {
    defaultMessage: 'Pré-visualização',
    id: 'zsB72A',
    description:
      'This title is displayed as the heading of the user card preview section in our user account settings page',
  },

  subtitle: {
    defaultMessage: 'Confira como seu card aparecerá para outros usuários.',
    id: '3rnKj8',
    description:
      'This subtitle is displayed as the subtitle of the user card preview section in our user account settings page',
  },
})
