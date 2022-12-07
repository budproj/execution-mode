import { defineMessages } from 'react-intl'

type KeyResultsHighlightsModalMessage = 'modalTitle' | 'routineModalTitle'

export default defineMessages<KeyResultsHighlightsModalMessage>({
  modalTitle: {
    defaultMessage:
      'Resultados-chave deste time com {confidence, select, barrier {barreira} confidence {baixa confiança} other {check-in atrasado}}',
    id: 'ie2eTm',
    description: 'The title for the dashboard key results modal',
  },
  routineModalTitle: {
    defaultMessage:
      '{type, select, feeling {desanimados} productivity {com baixa produtividade} roadblock {com bloqueio} other {}}',
    id: '2xU9JM',
    description: 'The title of the routines modals',
  },
})
