import { differenceInHours } from 'date-fns'
import { useIntl } from 'react-intl'

import messages from './messages'

const useRelativeDateInHours = (date: Date, snapshotDate: Date) => {
  const intl = useIntl()

  const hoursDifference = differenceInHours(date, snapshotDate)
  const formatters = {
    lessThanOneHour: () => intl.formatMessage(messages.lessThanOneHour),
    thisDay: () => intl.formatRelativeTime(hoursDifference, 'hour'),
    longTimeAgo: () => intl.formatDate(date),
  }

  let formatDate = formatters.longTimeAgo
  if (hoursDifference >= 0) formatDate = formatters.lessThanOneHour
  if (hoursDifference < 0 && hoursDifference > -25) formatDate = formatters.thisDay

  return formatDate()
}

export default useRelativeDateInHours
