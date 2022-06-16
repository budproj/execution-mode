import { defineMessages } from 'react-intl'

type UsersTableListBodyColumnRoleMessage =
  | 'userDefaultRoleTitle'
  | 'userDefaultRoleDescription'
  | 'userLeaderRoleTitle'
  | 'userLeaderRoleDescription'
  | 'userOkrMasterRoleTitle'
  | 'userOkrMasteRoleDescription'
  | 'userAdminUserRoleTitle'
  | 'userAdminRoleDescription'
  | 'unknownErrorToastMessage'
  | 'successUpdateUserRoleToastMessage'

export default defineMessages<UsersTableListBodyColumnRoleMessage>({
  userDefaultRoleTitle: {
    defaultMessage: 'Padrão',
    id: 'bZXWCR',
    description: 'This string is used to select the user default role.',
  },

  userDefaultRoleDescription: {
    defaultMessage:
      'Usuários com essa permissão podem editar e fazer check-in apenas dos resultados-chave que fazem parte.',
    id: 'Z9w45E',
    description: 'This string is used to describe the user default role selection.',
  },

  userLeaderRoleTitle: {
    defaultMessage: 'Líder',
    id: 'pmuG/e',
    description: 'This string is used to select the user edit role.',
  },

  userLeaderRoleDescription: {
    defaultMessage:
      'Líderes podem criar, editar e excluir objetivos e resultados-chave dos times aos quais pertencem.',
    id: 'i915bK',
    description: 'This string is used to describe the user edit role selection.',
  },

  userOkrMasterRoleTitle: {
    defaultMessage: 'OKR Master',
    id: 'J3ARiQ',
    description: 'This string is used to select the user edit role.',
  },

  userOkrMasteRoleDescription: {
    defaultMessage:
      'Esses usuários podem criar, editar e excluir qualquer objetivo ou resultado-chave no Bud.',
    id: 'R6SREn',
    description: 'This string is used to describe the user edit role selection.',
  },

  userAdminUserRoleTitle: {
    defaultMessage: 'Admin',
    id: 'ndABHM',
    description: 'This string is used to select the user admin role.',
  },

  userAdminRoleDescription: {
    defaultMessage:
      'Administradores possuem acesso total de criação, edição e exclusão de OKRs, usuários e ciclos de estratégia.',
    id: 'Jj0rRJ',
    description: 'This string is used to describe the user admin role selection.',
  },

  unknownErrorToastMessage: {
    defaultMessage: 'Desculpe, aconteceu um erro inesperado. Tente novamente mais tarde',
    id: 'SZONnG',
    description:
      'This message appears as an error toast when we have an unknown error while updater the user role',
  },

  successUpdateUserRoleToastMessage: {
    defaultMessage: 'Papel do usuário {user} alterado com sucesso!',
    id: 'Xv5t+7',
    description: 'This message appears when we updating the user role with success.',
  },
})
