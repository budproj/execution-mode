import { defineMessages } from 'react-intl'

type ProfileCardMessage = 'aboutTitle' | 'linkedInIconDesc'

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
})
