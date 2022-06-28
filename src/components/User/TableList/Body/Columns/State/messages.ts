import { defineMessages } from 'react-intl'

type UsersTableListBodyColumnStateMessage =
  | 'userAccountIsActiveTitleOption'
  | 'userAccountIsNotActiveTitleOption'
  | 'activeUserTooltip'
  | 'inactiveUserTooltip'

export default defineMessages<UsersTableListBodyColumnStateMessage>({
  userAccountIsActiveTitleOption: {
    defaultMessage: 'conta ativa',
    id: 's8fzur',
    description: 'This string is used to select the active cycles option.',
  },

  userAccountIsNotActiveTitleOption: {
    defaultMessage: 'conta desativada',
    id: 'MBvlAH',
    description: 'This string is used to select the not-active cycles option.',
  },

  activeUserTooltip: {
    defaultMessage: 'Esta pessoa tem acesso ao Bud.',
    id: 'jNuy4b',
    description: 'This message appears in the tooltip of users with active account state.',
  },

  inactiveUserTooltip: {
    defaultMessage: 'O acesso desta pessoa ao Bud foi desativado.',
    id: 'G9m+Ed',
    description: 'This message appears in the tooltip of users with inactive account state.',
  },
})
