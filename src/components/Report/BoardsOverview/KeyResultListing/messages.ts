import { defineMessages } from 'react-intl'

type DashboardKeyResultsModalMessage = 'modalTitle'

export default defineMessages<DashboardKeyResultsModalMessage>({
  modalTitle: {
    defaultMessage:
      '{confidence, select, roadblock {Todos os resultados-chave {confidence}} other {Todos os resultados-chave de {confidence}}}',
    id: 'fv5OeR',
    description: 'The title for the dashboard key results modal',
  },
})
