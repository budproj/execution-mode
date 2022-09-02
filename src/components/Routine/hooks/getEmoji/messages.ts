import { defineMessages } from 'react-intl'

type CustomEmojisMessages = 'felling1' | 'felling2' | 'felling3' | 'felling4' | 'felling5'

export default defineMessages<CustomEmojisMessages>({
  felling1: {
    defaultMessage: 'custom emoji with sad expression',
    id: 'Jl5nlI',
    description: 'This message is used as a description of emoji feeling 1',
  },
  felling2: {
    defaultMessage: 'custom emoji with apathetic expression',
    id: 'huUzRi',
    description: 'This message is used as a description of emoji feeling 2',
  },
  felling3: {
    defaultMessage: 'custom emoji with neutral expression',
    id: 'QAyFQz',
    description: 'This message is used as a description of emoji feeling 3',
  },
  felling4: {
    defaultMessage: 'custom emoji with happy expression',
    id: '59sgdb',
    description: 'This message is used as a description of emoji feeling 4',
  },
  felling5: {
    defaultMessage: 'custom emoji with smile on face',
    id: 'XbzHtU',
    description: 'This message is used as a description of emoji feeling 5',
  },
})
