import { defineMessages } from 'react-intl'

type KeyResultsSectionGoalUpdateFormMessage =
  | 'firstLabel'
  | 'secondLabel'
  | 'firstButton'
  | 'lastButton'

export default defineMessages<KeyResultsSectionGoalUpdateFormMessage>({
  firstLabel: {
    defaultMessage: 'Valor Inicial',
    id: '15BMJI',
    description:
      'This text is used as a label on the update goal form inside the key-result drawers. That is the first label of that form',
  },

  secondLabel: {
    defaultMessage: 'Meta',
    id: '1bgaUB',
    description:
      'This text is used as a label on the update goal form inside the key-result drawers. That is the second label of that form',
  },

  firstButton: {
    defaultMessage: 'Cancelar',
    id: 'x8ytCP',
    description:
      'This text is displayed as the button that will cancel the update for ou goal update popover inside the key-result drawers',
  },

  lastButton: {
    defaultMessage: 'Salvar',
    id: 'DHoDPU',
    description:
      'This text is displayed as the button that will save the update for our goal update popover inside the key-result drawers',
  },
})
