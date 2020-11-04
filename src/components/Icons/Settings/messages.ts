import { MessageDescriptor, defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: 'Clique aqui para editar suas configurações',
    id: 'XYg5xf',
    description:
      'The title text of our settings icon, it is displayed when an user hover the icon itself',
  },

  desc: {
    defaultMessage:
      'Um ícone de configurações. Ao clicar nele você irá para a tela de configurações da nossa plataforma',
    id: 'GeAU92',
    description: 'The alternative text explaining our settings icon',
  },
}) as Record<string, MessageDescriptor>
