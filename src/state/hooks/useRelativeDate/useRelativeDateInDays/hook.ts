import { differenceInDays } from 'date-fns'
import { useIntl } from 'react-intl'

import messages from './messages'

const hook = (date: Date, snapshotDate: Date = new Date()) => {
  const intl = useIntl()

  const daysDifference = differenceInDays(date, snapshotDate)
  const formatters = {
    today: () => intl.formatMessage(messages.todayLabel),
    yesterday: () => intl.formatMessage(messages.yesterdayLabel),
    thisWeek: () => intl.formatRelativeTime(daysDifference, 'day'),
    longTimeAgo: () => intl.formatDate(date),
  }

  let formatDate = formatters.longTimeAgo
  if (daysDifference === 0) formatDate = formatters.today
  if (daysDifference === -1) formatDate = formatters.yesterday
  if (daysDifference < -1 && daysDifference > -8) formatDate = formatters.thisWeek

  return formatDate()
}

export default hook
