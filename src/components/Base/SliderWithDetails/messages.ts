import { defineMessages } from 'react-intl'

type SliderWithDetailsMessage = 'progress' | 'goal' | 'projectProgressTooltip'

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
  projectProgressTooltip: {
    defaultMessage: 'Progresso esperado: {progress}%',
    id: 'Jc/lcm',
    description: 'The tooltip content for the projected progress thumb',
  },
})
