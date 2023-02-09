import { addDays } from 'date-fns'
import { useIntl } from 'react-intl'

interface useRangeDataFormatProperties {
  weekIntervalFormattedDate(data: Date): string
}
export const useGetRangeDateFormatted = (): useRangeDataFormatProperties => {
  const intl = useIntl()

  const formatedDate = (date: Date) => {
    return `${intl.formatDate(date, { day: 'numeric', timeZone: 'utc' })}/${
      intl
        .formatDate(date, {
          month: 'short',
        })
        .split('.')[0]
    }`
  }

  const rangeFormat = (startDate: Date) => {
    const finishDate = addDays(startDate, 6)

    const formatedStartAt = formatedDate(startDate)
    const formatedFinishAt = formatedDate(finishDate)
    return `${formatedStartAt} - ${formatedFinishAt}`
  }

  const weekIntervalFormattedDate = (date: Date) => rangeFormat(date)

  return { weekIntervalFormattedDate }
}
