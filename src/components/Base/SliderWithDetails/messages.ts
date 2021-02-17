import { defineMessages } from 'react-intl'

type SliderWithDetailsMessage = 'progress' | 'goal'

export default defineMessages<SliderWithDetailsMessage>({
  progress: {
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
