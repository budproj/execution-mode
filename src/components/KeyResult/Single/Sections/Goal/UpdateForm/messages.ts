import { defineMessages } from 'react-intl'

type KeyResultsSectionGoalUpdateFormMessage = 'firstLabel' | 'secondLabel'

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
})
