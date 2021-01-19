import { FormatDateOptions, useIntl } from 'react-intl'

const useRelativeDateFallback = (date: Date) => {
  const intl = useIntl()
  const options: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  return intl.formatDate(date, options)
}

export default useRelativeDateFallback
