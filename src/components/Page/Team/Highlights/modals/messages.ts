import { defineMessages } from 'react-intl'

type KeyResultsHighlightsModalMessage = 'modalTitle'

export default defineMessages<KeyResultsHighlightsModalMessage>({
  modalTitle: {
    defaultMessage:
      'Resultados-chave deste time com {confidence, select, barrier {barreira} confidence {baixa confiança} other {check-in atrasado}}',
    id: 'ie2eTm',
    description: 'The title for the dashboard key results modal',
  },
})
