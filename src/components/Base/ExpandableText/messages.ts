import { defineMessages } from 'react-intl'

type ExpandableTextMessage = 'expandButton' | 'collapseButton'

export default defineMessages<ExpandableTextMessage>({
  expandButton: {
    defaultMessage: 'Ver mais...',
    id: '+G9goh',
    description: 'This text is displayed in the button that expands a truncated text',
  },

  collapseButton: {
    defaultMessage: 'Ver menos...',
    id: 'I+MSuS',
    description: 'This text is displayed in the button that collapses the truncated text',
  },
})
