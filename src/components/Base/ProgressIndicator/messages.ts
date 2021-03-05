import { defineMessages } from 'react-intl'

type ProgressIndicatorMessage = 'increaseIconDesc' | 'decreaseIconDesc' | 'neutralIconDesc'

export default defineMessages<ProgressIndicatorMessage>({
  increaseIconDesc: {
    defaultMessage: 'Um ícone de seta para cima, indicando que o progress aumentou',
    id: 'Qt/E5T',
    description: 'This desc message explains the increase icon for screen readers',
  },

  decreaseIconDesc: {
    defaultMessage: 'Um ícone de seta para baixo, indicando que o progress reduziu',
    id: 'UTF2eY',
    description: 'This desc message explains the decrease icon for screen readers',
  },

  neutralIconDesc: {
    defaultMessage:
      'Um círculo com um sinal de subtração do meio, indicando que o progress se manteve o mesmo',
    id: '81xtg9',
    description: 'This desc message explains the neutral icon for screen readers',
  },
})
