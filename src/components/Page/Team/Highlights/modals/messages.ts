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
      'Membros desse time {type, select, feeling {com baixo sentimento na semana} productivity {com baixa produtividade na semana} roadblock {com bloqueio na semana} other {sem resultados-chave}}',
    id: 'Nh5OeF',
    description: 'The title of the routines modals',
  },
})
