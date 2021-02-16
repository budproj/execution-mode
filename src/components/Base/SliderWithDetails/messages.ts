import { defineMessages } from 'react-intl'

type SliderWithDetailsMessage = 'currentProgress' | 'goal'

export default defineMessages<SliderWithDetailsMessage>({
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
