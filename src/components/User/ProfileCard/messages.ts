import { defineMessages } from 'react-intl'

type ProfileCardMessage =
  | 'aboutTitle'
  | 'linkedInIconDesc'
  | 'arrowRightLongIconDesc'
  | 'redirectToUserProfileButtonText'

export default defineMessages<ProfileCardMessage>({
  aboutTitle: {
    defaultMessage: 'Sobre {nickname}',
    id: 'mnors5',
    description: 'The about section title for the user in the user card',
  },

  linkedInIconDesc: {
    defaultMessage:
      'O logotipo do LinkedIn. Ao clicar você irá visitar o perfil do LinkedIn deste usuário',
    id: '0dk0bw',
    description: 'This message is displayed to screen readers to explain our LinkedIn icon',
  },

  arrowRightLongIconDesc: {
    defaultMessage: 'Um ícone de seta para o lado direito, meramente ilustrativo',
    id: 'FVnpVq',
    description: 'The alternative text explaining our arrow right icon',
  },

  redirectToUserProfileButtonText: {
    defaultMessage: 'Ir para o perfil de {username}',
    id: 'qp4Qmm',
    description: 'This button redirects to the selected user.',
  },
})
