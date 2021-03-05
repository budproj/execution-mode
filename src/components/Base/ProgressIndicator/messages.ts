import { defineMessages } from 'react-intl'

type ProgressIndicatorMessage = 'increaseIconDesc' | 'decreaseIconDesc' | 'neutralIconDesc'

export default defineMessages<ProgressIndicatorMessage>({
  increaseIconDesc: {
    defaultMessage: 'Um ícone de seta para cima, indicando que o progresso aumentou',
    id: 'Y1oyYG',
    description: 'This desc message explains the increase icon for screen readers',
  },

  decreaseIconDesc: {
    defaultMessage: 'Um ícone de seta para baixo, indicando que o progresso reduziu',
    id: 'lMxUF9',
    description: 'This desc message explains the decrease icon for screen readers',
  },

  neutralIconDesc: {
    defaultMessage:
      'Um círculo com um sinal de subtração no meio, indicando que o progresso se manteve o mesmo',
    id: 'bZYEAl',
    description: 'This desc message explains the neutral icon for screen readers',
  },
})
