import { defineMessages } from 'react-intl'

type ExploreTeamChildTeamsMessage =
  | 'title'
  | 'emptyState'
  | 'searchPlaceholder'
  | 'createSubteamOptionGroupIconDesc'
  | 'newSubeamOption'

export default defineMessages<ExploreTeamChildTeamsMessage>({
  title: {
    defaultMessage: 'Subtimes {isLoaded, select, true {({totalTeamsCount})} other{}}',
    id: 'NojznG',
    description: 'This message is displayed inside the explore page, above the child teams section',
  },

  emptyState: {
    defaultMessage: 'Este time não possui nenhum subtime.',
    id: 'DsPsDZ',
    description:
      'This message is displayed in our team plage inside the child teams section when that team has no child teams',
  },

  searchPlaceholder: {
    defaultMessage: 'Buscar subtimes',
    id: '/H4hHb',
    description: 'This message is displayed inside the child teams section, on the search bar',
  },

  createSubteamOptionGroupIconDesc: {
    defaultMessage:
      'Um ícone com o sinal de "mais". Ao clicar aqui você irá abrir o menu para inserir um novo subtime',
    id: 'z2jAqq',
    description: 'This message is used in our new subteam button while seeing the team list',
  },

  newSubeamOption: {
    defaultMessage: 'Criar novo subtime',
    id: 'EkoIl2',
    description: 'This message appears as an option in the team page while adding a new user',
  },
})
