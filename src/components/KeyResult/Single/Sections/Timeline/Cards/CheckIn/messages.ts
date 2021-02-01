import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCheckInMessage = 'title' | 'helperText' | 'arrowRightDesc'

export default defineMessages<KeyResultsSectionTimelineCardCheckInMessage>({
  title: {
    defaultMessage: 'Check-in',
    id: 'Cr1hEp',
    description: 'This text is displayed as the title of our check-in cards',
  },

  helperText: {
    defaultMessage: 'Realizado por <highlight>{author}</highlight> às {hour}',
    id: 'r0jTFR',
    description: 'This text is displayed as a helper text, below the check-in card title',
  },

  arrowRightDesc: {
    defaultMessage:
      'Uma seta longa para a direita, separando o progresso anterior (à esquerda) do novo progress do check-in (à direita)',
    id: 'HsEMwj',
    description:
      'This text is displayed to screen readers, explaining the right arrow icon in our check-in card',
  },
})
