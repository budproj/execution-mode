import format from 'date-fns/format'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

export const formatData = (value: number) => Math.round(value * 100)

export const formatDate = (rawDate?: string) => {
  const date = rawDate && rawDate !== '' ? new Date(rawDate) : new Date()

  return format(date, 'dd/MM')
}

export const formatTooltipLabel = (_: unknown, [data]: Array<Payload<string, string>>) => {
  return formatDate(data?.payload?.date)
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
