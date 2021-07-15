import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCheckInMessage =
  | 'title'
  | 'helperText'
  | 'arrowRightDesc'
  | 'cardType'
  | 'commentTitle'
  | 'valueIncreaseLeftColumnTitle'
  | 'valueIncreaseRightColumnTitle'

export default defineMessages<KeyResultsSectionTimelineCardCheckInMessage>({
  title: {
    defaultMessage: 'Check-in',
    id: 'Cr1hEp',
    description: 'This text is displayed as the title of our check-in cards',
  },

  helperText: {
    defaultMessage:
      'Realizado por <highlight>{author}</highlight> {unit, select, fallback {em} other {}} {time}',
    id: 'Ykg0Jh',
    description: 'This text is displayed as a helper text, below the check-in card title',
  },

  arrowRightDesc: {
    defaultMessage:
      'Uma seta longa para a direita, separando o progresso anterior (à esquerda) do novo progress do check-in (à direita)',
    id: 'HsEMwj',
    description:
      'This text is displayed to screen readers, explaining the right arrow icon in our check-in card',
  },

  cardType: {
    defaultMessage: 'Check-in',
    id: 'YxNkP6',
    description:
      'This text is displayed in some places in our timeline card, showing the type of the card in a friendly name',
  },

  commentTitle: {
    defaultMessage: 'Sobre',
    id: 'sp/6lg',
    description: 'This text is displayed in our check-in card, above the user comment if it exists',
  },

  valueIncreaseLeftColumnTitle: {
    defaultMessage: 'Neste check-in',
    id: 'gLS6ev',
    description:
      'This text is displayed in our check-in card, as a title for the left column in the progress increase section',
  },

  valueIncreaseRightColumnTitle: {
    defaultMessage: 'Status',
    id: '/9JMMz',
    description:
      'This text is displayed in our check-in card, as a title for the right column in the progress increase section',
  },
})
