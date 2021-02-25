import { defineMessages } from 'react-intl'

type SettingsAccountBodySocialMediaMessage = 'sectionTitle' | 'sectionSubtitle' | 'firstFieldLabel'

export default defineMessages<SettingsAccountBodySocialMediaMessage>({
  sectionTitle: {
    defaultMessage: 'Redes sociais',
    id: 'nPCTf0',
    description:
      'This title is displayed as the heading of the social media section in our user account settings page',
  },

  sectionSubtitle: {
    defaultMessage:
      'Vincule seu perfil às suas redes sociais para facilitar a conexão com seus colegas!',
    id: '77LX/s',
    description:
      'This subtitle is displayed as the subtitle of the social media section in our user account settings page',
  },

  firstFieldLabel: {
    defaultMessage: 'LinkedIn',
    id: 'zHAPqJ',
    description:
      'This is the label that goes on our user account settings page, at the first field to update the user social media accounts',
  },
})
