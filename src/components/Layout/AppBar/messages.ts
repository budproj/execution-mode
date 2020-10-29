import { defineMessages } from 'react-intl'
import { IntlMessages } from 'server/intl/types'

const messages: IntlMessages = {
  overview: {
    defaultMessage: 'Overview',
    description: 'The main menu item showing the overview button',
  },
}

export default defineMessages(messages)
