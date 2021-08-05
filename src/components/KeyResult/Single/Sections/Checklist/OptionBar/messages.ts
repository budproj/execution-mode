import { defineMessages } from 'react-intl'

type OptionBarMessages = 'completed' | 'checkIconDescription' | 'newChecklistButtonLabel'

export default defineMessages<OptionBarMessages>({
  completed: {
    defaultMessage: '{completed}/{total}',
    id: 'O13rH5',
    description:
      'This messages is displayed in our our key-result drawer above the checklist as the count of total completed checkmarks',
  },

  checkIconDescription: {
    defaultMessage:
      'Um ícone de check. Ele representa a quantidade de itens marcados como completo em sua checklist',
    id: 'W37c+K',
    description:
      'This text is used by screen readers to explain the check icon in our key-result drawer checklist section',
  },

  newChecklistButtonLabel: {
    defaultMessage: 'Adicionar uma Check-list',
    id: 's4h8ne',
    description: 'This text is used as a button when the key-result has no check-marks',
  },
})
