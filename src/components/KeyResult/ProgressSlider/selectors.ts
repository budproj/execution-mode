import { KeyResult, KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

export const selectProgressStep = (format?: KeyResult['format']): number => {
  const defaultStep = 1

  if (!format) return defaultStep

  const formatHashmap: Partial<Record<KEY_RESULT_FORMAT, number>> = {
    [KEY_RESULT_FORMAT.PERCENTAGE]: 0.01,
  }

  return formatHashmap[format] ?? defaultStep
}
