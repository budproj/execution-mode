import { defineMessages } from 'react-intl'

type CheckInFormFieldCurrentConfidenceMessage = 'label' | 'tooltip' | 'tooltipIconDesc'

export default defineMessages<CheckInFormFieldCurrentConfidenceMessage>({
  label: {
    defaultMessage: 'Como está sua confiança?',
    id: 'NOqI9i',
    description:
      'This is the label of the check-in form that indicates to which confidence level the user would update her/his key result',
  },

  tooltip: {
    defaultMessage:
      'O nível de confiança descreve como você vê suas chances de alcançar esse resultado-chave dentro do prazo',
    id: 'k3EFXK',
    description:
      'The tooltip of the check-in form. It appears when the user hovers the question mark icon',
  },

  tooltipIconDesc: {
    defaultMessage: 'Um círculo com um ponto de interrogação no meio',
    id: '6RzNYt',
    description: 'This message explains our tooltip icon for screen readers',
  },
})
