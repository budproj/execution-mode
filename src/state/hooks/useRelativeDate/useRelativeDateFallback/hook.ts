import { useIntl } from 'react-intl'

const hook = (date: Date) => {
  const intl = useIntl()

  return intl.formatDate(date)
}

export default hook
