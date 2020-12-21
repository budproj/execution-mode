import { MessageDescriptor, defineMessages } from 'react-intl'

type ObjectiveAccordionItemMessages = 'calendarIconTitle' | 'calendarIconDesc'

export default defineMessages({
  calendarIconTitle: {
    defaultMessage: 'O prazo deste objetivo',
    id: '/2GFGI',
    description:
      'The title text of our calendar icon in our objective accordion, it is displayed when an user hover the icon itself',
  },

  calendarIconDesc: {
    defaultMessage: 'Um ícone de calendário. Ele indica que nesse campo fica o prazo do objetivo',
    id: 'SpAXmO',
    description:
      'The alternative text explaining our calendar icon in the objective accordion item',
  },
}) as Record<ObjectiveAccordionItemMessages, MessageDescriptor>
