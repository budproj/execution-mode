import { differenceInMinutes } from 'date-fns'
import { useIntl } from 'react-intl'

import messages from './messages'

const useRelativeDateInMinutes = (date: Date, snapshotDate: Date) => {
  const intl = useIntl()

  const minutesDifference = differenceInMinutes(date, snapshotDate)
  const formatters = {
    lessThanOneMinute: () => intl.formatMessage(messages.lessThanOneMinute),
    thisHour: () => intl.formatRelativeTime(minutesDifference, 'minute'),
    longTimeAgo: () => intl.formatDate(date),
  }

  let formatDate = formatters.longTimeAgo
  if (minutesDifference >= 0) formatDate = formatters.lessThanOneMinute
  if (minutesDifference < 0 && minutesDifference > -60) formatDate = formatters.thisHour

  return formatDate()
}

export default useRelativeDateInMinutes
