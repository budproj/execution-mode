import { defineMessages } from 'react-intl'

type MainAppBarMessage =
  | 'firstMenuItem'
  | 'secondMenuItem'
  | 'thirdMenuItem'
  | 'searchIconTitle'
  | 'searchIconDesc'
  | 'notificationBellIconTitle'
  | 'notificationBellIconDesc'
  | 'settingsIconTitle'
  | 'settingsIconDesc'
  | 'newItem'

export default defineMessages<MainAppBarMessage>({
  firstMenuItem: {
    defaultMessage: 'Painel',
    id: '4cmOYV',
    description: 'MainAppBar menu item that links to "Dashboard" page',
  },

  secondMenuItem: {
    defaultMessage: 'Minhas Coisas',
    id: 'K8KvrI',
    description: 'MainAppBar menu item that links to "My Things" page',
  },

  thirdMenuItem: {
    defaultMessage: 'Explorar',
    id: 'ciNUJf',
    description: 'MainAppBar menu item that links to teams "Explore" page',
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

  newItem: {
    defaultMessage: 'novo!',
    id: 'bh8jgN',
    description: 'The text inside the tag to inform new buttons',
  },
})
