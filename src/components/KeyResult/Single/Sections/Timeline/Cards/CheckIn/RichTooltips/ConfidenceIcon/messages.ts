import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCheckInConfidenceIconTooltipWithRichTextMessage =
  | 'introduction'
  | 'firstLine'
  | 'secondLine'

export default defineMessages<KeyResultsSectionTimelineCardCheckInConfidenceIconTooltipWithRichTextMessage>(
  {
    introduction: {
      defaultMessage: 'A confiança mudou neste check-in:',
      id: 'aO+w74',
      description:
        'This text is the first line of our icon tooltip when the check-in has a different confidence from the previous check-in',
    },

    firstLine: {
      defaultMessage: 'de <highlight>{confidence}</highlight>',
      id: 'Dnh8iG',
      description: 'This text is displayed as the first line of our confidence tooltip',
    },

    secondLine: {
      defaultMessage: 'para <highlight>{confidence}</highlight>',
      id: 'Ii3n+d',
      description: 'This text is displayed as the second line of our confidence tooltip',
    },
  },
)
