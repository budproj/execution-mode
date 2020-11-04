import { MessageDescriptor, defineMessages } from 'react-intl'

export default defineMessages({
  dashboard: {
    defaultMessage: 'Dashboard',
    id: '25ACLj',
    description: 'AppBar menu item that links to Dashboard page',
  },

  keyResults: {
    defaultMessage: 'Minhas KR',
    id: '2Ej1Zi',
    description: 'AppBar menu item that links to My Key Results page',
  },

  item: {
    defaultMessage: 'Item',
    id: 'qakF7T',
    description: 'Placeholder item for layout purposes',
  },

  searchIconTitle: {
    defaultMessage: 'Clique aqui para fazer uma busca',
    id: 'x30AaU',
    description:
      'The title text of our search icon, it is displayed when an user hover the icon itself',
  },

  searchIconDesc: {
    defaultMessage: 'Um ícone de busca. Ao clicar nele uma barra de busca se abrirá para você',
    id: 'CmE1a+',
    description: 'The alternative text explaining our search icon',
  },

  notificationBellIconTitle: {
    defaultMessage: 'Clique aqui para ver suas notificações',
    id: 'zIx/gZ',
    description:
      'The title text of our notification bell, it is displayed when an user hover the icon itself',
  },

  notificationBellIconDesc: {
    defaultMessage: 'Um ícone de sino, ao clicar nele você verá suas notificações',
    id: 'Sn7K6v',
    description: 'The alternative text explaining our notification bell icon',
  },

  settingsIconTitle: {
    defaultMessage: 'Clique aqui para editar suas configurações',
    id: 'XYg5xf',
    description:
      'The title text of our settings icon, it is displayed when an user hover the icon itself',
  },

  settingsIconDesc: {
    defaultMessage:
      'Um ícone de configurações. Ao clicar nele você irá para a tela de configurações da nossa plataforma',
    id: 'GeAU92',
    description: 'The alternative text explaining our settings icon',
  },
}) as Record<string, MessageDescriptor>
