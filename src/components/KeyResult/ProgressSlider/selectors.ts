import { KeyResult, KeyResultFormat } from 'src/components/KeyResult/types'

export const selectProgressStep = (format?: KeyResult['format']): number => {
  const defaultStep = 1

  if (!format) return defaultStep

  const formatHashmap: Partial<Record<KeyResultFormat, number>> = {
    [KeyResultFormat.PERCENTAGE]: 0.01,
  }

  return formatHashmap[format] ?? defaultStep
}
