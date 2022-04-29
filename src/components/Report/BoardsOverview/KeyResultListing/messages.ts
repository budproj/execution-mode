import { defineMessages } from 'react-intl'

type DashboardKeyResultsModalMessage = 'modalTitle'

export default defineMessages<DashboardKeyResultsModalMessage>({
  modalTitle: {
    defaultMessage:
      '{confidence, select, roadblock {All key results with {confidence}} other {All {confidence} key results}}',
    id: 'Tp/cz3',
    description: 'The title for the dashboard key results modal',
  },
})
