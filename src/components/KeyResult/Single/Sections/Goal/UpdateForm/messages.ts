import { defineMessages } from 'react-intl'

type KeyResultsSectionGoalUpdateFormMessage =
  | 'firstLabel'
  | 'secondLabel'
  | 'firstButton'
  | 'lastButton'

export default defineMessages<KeyResultsSectionGoalUpdateFormMessage>({
  firstLabel: {
    defaultMessage: 'Valor Inicial',
    id: 'cHSa08',
    description:
      'This text is used as a label on the update goal form inside the key-result drawer. That is the first label of that form',
  },

  secondLabel: {
    defaultMessage: 'Meta',
    id: 'Qptcpe',
    description:
      'This text is used as a label on the update goal form inside the key-result drawer. That is the second label of that form',
  },

  firstButton: {
    defaultMessage: 'Cancelar',
    id: 'PR6F4W',
    description:
      'This text is displayed as the button that will cancel the update for ou goal update popover inside the key-result drawer',
  },

  lastButton: {
    defaultMessage: 'Salvar',
    id: 'fwpFhg',
    description:
      'This text is displayed as the button that will save the update for our goal update popover inside the key-result drawer',
  },
})
