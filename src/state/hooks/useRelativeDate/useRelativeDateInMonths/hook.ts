import { differenceInMonths } from 'date-fns'
import { useIntl } from 'react-intl'

import messages from './messages'

const hook = (date: Date, snapshotDate: Date = new Date()) => {
  const intl = useIntl()

  const monthsDifference = differenceInMonths(date, snapshotDate)
  const formatters = {
    oneMonthOrLess: () => intl.formatMessage(messages.oneMonthOrLess),
    thisQuarter: () => intl.formatRelativeTime(monthsDifference, 'month'),
    longTimeAgo: () => intl.formatDate(date),
  }

  let formatDate = formatters.longTimeAgo
  if (monthsDifference < 1) formatDate = formatters.oneMonthOrLess
  if (monthsDifference > 1 && monthsDifference < 4) formatDate = formatters.thisQuarter

  return formatDate()
}

export default hook
