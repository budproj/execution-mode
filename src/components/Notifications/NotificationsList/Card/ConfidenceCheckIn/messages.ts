import { defineMessages } from 'react-intl'

type ConfidenceCheckinMessagesProperties =
  | 'barrierMediumMessage'
  | 'lowConfidenceMediumMessage'
  | 'wrapperMessage'

export default defineMessages<ConfidenceCheckinMessagesProperties>({
  barrierMediumMessage: {
    defaultMessage: 'uma barreira no',
    id: '5r52/T',
    description: 'This message appears as notification in confidence check in with barrier.',
  },

  lowConfidenceMediumMessage: {
    defaultMessage: 'baixa confiança em um',
    id: 'rZUL1Q',
    description: 'This message appears as notification in confidence check in with low-confidence.',
  },

  wrapperMessage: {
    defaultMessage: 'reportou {specific} resultado-chave:',
    id: 'i7i3Ew',
    description: 'This message is the wrapper that appears on both types of confidence check ins.',
  },
})
