import { defineMessages } from 'react-intl'

type AvatarMessage = 'imageIconTitle' | 'imageIconDesc'

export default defineMessages<AvatarMessage>({
  imageIconTitle: {
    defaultMessage: 'Seu avatar',
    id: '+/9Nj7',
    description:
      'The title text of our image icon in our settings account page, it is displayed when an user hover the icon itself',
  },

  imageIconDesc: {
    defaultMessage: 'Um ícone de imagem. Ele indica que nesse campo fica seu avatar',
    id: 'Uu0OJV',
    description: 'The alternative text explaining our image icon in the settings account page',
  },
})
