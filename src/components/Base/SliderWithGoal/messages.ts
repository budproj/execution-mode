import { defineMessages } from 'react-intl'

type SliderWithGoalMessage = 'currentProgress' | 'goal'

export default defineMessages<SliderWithGoalMessage>({
  currentProgress: {
    defaultMessage: 'Posição atual',
    id: 'Lc60Nd',
    description: 'This message is displayed below the current progress thumb',
  },

  goal: {
    defaultMessage: 'Meta',
    id: 'PYLIcI',
    description: 'This message is displayed below the goal thumb',
  },
})
