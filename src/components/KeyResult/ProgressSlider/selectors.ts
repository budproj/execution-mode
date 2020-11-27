import { KeyResult } from 'components/KeyResult/types'

export const selectProgressStep = (
  initialValue?: KeyResult['initialValue'],
  goal?: KeyResult['goal'],
): number => {
  if (!initialValue || !goal) return 1

  return (goal - initialValue) / 100
}
