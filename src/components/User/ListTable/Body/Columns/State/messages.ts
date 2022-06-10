import { defineMessages } from 'react-intl'

type UsersTableListBodyColumnStateMessage =
  | 'userAccountIsActiveTitleOption'
  | 'userAccountIsNotActiveTitleOption'

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
})
