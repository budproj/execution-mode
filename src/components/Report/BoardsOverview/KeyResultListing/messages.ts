import { defineMessages } from 'react-intl'

type DashboardKeyResultsModalMessage = 'modalTitle'

export default defineMessages<DashboardKeyResultsModalMessage>({
  modalTitle: {
    defaultMessage:
      '{confidence, select, barrier {Todos os resultados-chave {confidencetext}} other {Todos os resultados-chave de {confidencetext}}}',
    id: 'FWsiRf',
    description: 'The title for the dashboard key results modal',
  },
})
