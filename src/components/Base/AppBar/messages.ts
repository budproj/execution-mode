import { defineMessages } from 'react-intl'

type AppBarMessage =
  | 'firstMenuItem'
  | 'secondMenuItem'
  | 'thirdMenuItem'
  | 'searchIconTitle'
  | 'searchIconDesc'
  | 'notificationBellIconTitle'
  | 'notificationBellIconDesc'
  | 'settingsIconTitle'
  | 'settingsIconDesc'

export default defineMessages<AppBarMessage>({
  firstMenuItem: {
    defaultMessage: 'Painel',
    id: 'RcUoJA',
    description: 'AppBar menu item that links to "Dashboard" page',
  },

  secondMenuItem: {
    defaultMessage: 'Meus Resultados-Chave',
    id: 'B5ZikQ',
    description: 'AppBar menu item that links to "My Key Results" page',
  },

  thirdMenuItem: {
    defaultMessage: 'Explorar',
    id: 'I5aN4R',
    description: 'AppBar menu item that links to teams "Explore" page',
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
})
