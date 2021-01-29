import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCheckInMessage = 'title' | 'helperText'

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
})
