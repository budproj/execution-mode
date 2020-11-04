import { MessageDescriptor, defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: 'Clique aqui para fazer uma busca',
    id: 'x30AaU',
    description:
      'The title text of our search icon, it is displayed when an user hover the icon itself',
  },

  desc: {
    defaultMessage: 'Um ícone de busca. Ao clicar nele uma barra de busca se abrirá para você',
    id: 'CmE1a+',
    description: 'The alternative text explaining our search icon',
  },
}) as Record<string, MessageDescriptor>
