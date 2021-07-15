import { defineMessages } from 'react-intl'

type ExpandableTextMessage = 'expandButton' | 'collapseButton'

export default defineMessages<ExpandableTextMessage>({
  expandButton: {
    defaultMessage: 'Mostrar mais',
    id: 'VDLkuO',
    description: 'This text is displayed in the button that expands a truncated text',
  },

  collapseButton: {
    defaultMessage: 'Mostrar menos',
    id: 'sP2MCY',
    description: 'This text is displayed in the button that collapses the truncated text',
  },
})
