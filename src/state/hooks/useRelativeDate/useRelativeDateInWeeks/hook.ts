import { differenceInWeeks } from 'date-fns'
import { useIntl } from 'react-intl'

import messages from './messages'

const hook = (date: Date, snapshotDate: Date = new Date()) => {
  const intl = useIntl()

  const weeksDifference = differenceInWeeks(date, snapshotDate)
  const formatters = {
    oneWeekOrLess: () => intl.formatMessage(messages.oneWeekOrLess),
    thisMonth: () => intl.formatRelativeTime(weeksDifference, 'week'),
    longTimeAgo: () => intl.formatDate(date),
  }

  let formatDate = formatters.longTimeAgo
  if (weeksDifference <= 1) formatDate = formatters.oneWeekOrLess
  if (weeksDifference > 1 && weeksDifference < 5) formatDate = formatters.thisMonth

  return formatDate()
}

export default hook
