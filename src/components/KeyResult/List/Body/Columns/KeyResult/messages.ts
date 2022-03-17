import { defineMessages } from 'react-intl'

type KeyResultListBodyColumnKeyResultMessage =
  | 'lastUpdateTextPrefix'
  | 'outdatedUpdateTextPrefix'
  | 'outdatedUpdateIconDescription'
  | 'upToDateUpdateIconDescription'

export default defineMessages<KeyResultListBodyColumnKeyResultMessage>({
  lastUpdateTextPrefix: {
    defaultMessage: 'Check-in realizado',
    id: 'ItLQef',
    description:
      'This message is displayed alongisde with the key-result name, as the prefix for our last update text component',
  },

  outdatedUpdateTextPrefix: {
    defaultMessage: 'Sem check-in',
    id: 'M2QJC/',
    description:
      'This message is displayed alongisde with the key-result name, as the prefix for our last update text component',
  },

  outdatedUpdateIconDescription: {
    defaultMessage: 'Check-in pendente',
    id: 'vgU7fC',
    description:
      'This string is used as the description for the icon that indicates that the key-result has not been updated',
  },

  upToDateUpdateIconDescription: {
    defaultMessage: 'Check-in realizado',
    id: 'I8NCD3',
    description:
      'This string is used as the description for the icon that indicates that the key-result is updated',
  },
})
