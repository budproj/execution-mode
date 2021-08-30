import { FormatDateOptions, IntlShape } from 'react-intl'

import { CADENCE } from 'src/components/Cycle/constants'

export const formatData = (value: number) => Math.round(value * 100)

export const formatDate = (
  intl: IntlShape,
  rawDate?: string,
  cadence: CADENCE = CADENCE.QUARTERLY,
) => {
  const date = rawDate && rawDate !== '' ? new Date(rawDate) : new Date()
  const optionsHashmap: Record<string, FormatDateOptions> = {
    [CADENCE.QUARTERLY]: {
      day: '2-digit',
      month: '2-digit',
    },
    [CADENCE.YEARLY]: {
      month: 'short',
    },
  }

  const options = optionsHashmap[cadence]

  return intl.formatDate(date, options)
}

export const formatTooltipLabel = (label: string, intl: IntlShape, cadence?: CADENCE) => {
  return formatDate(intl, label, cadence)
}

export const distributedCopy = <T>(items: T[], n: number): T[] => {
  const elements = [items[0]]
  const totalItems = items.length - 2
  const interval = Math.floor(totalItems / (n - 2))

  for (let index = 1; index < n - 1; index++) {
    elements.push(items[index * interval])
  }

  elements.push(items[items.length - 1])

  return elements
}
