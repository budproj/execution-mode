import { Dispatch, SetStateAction, useState } from 'react'

import { ColorScheme } from 'src/themes/tokens'

import { COLOR_SCHEME_HASHMAP, INDICATOR, INDICATOR_HASHMAP, SIGNAL } from './constants'

export type ValueSignalHook = [number, Dispatch<SetStateAction<number>>, ValueSignalAttributes]

export interface ValueSignalAttributes {
  signal: SIGNAL
  indicator: INDICATOR
  colorScheme: ColorScheme
}

const selectSignal = (value?: number) => {
  if (!value) return SIGNAL.NEUTRAL

  const isPositive = value > 0
  const isNegative = value < 0

  const signal = isPositive ? SIGNAL.POSITIVE : isNegative ? SIGNAL.NEGATIVE : SIGNAL.NEUTRAL

  return signal
}

const useValueSignal = (
  initialValue?: number,
  colorSchemeHashmap: typeof COLOR_SCHEME_HASHMAP = COLOR_SCHEME_HASHMAP,
): ValueSignalHook => {
  const [value, setValue] = useState(initialValue ?? 0)

  const signal = selectSignal(value)

  const attributes = {
    signal,
    indicator: INDICATOR_HASHMAP[signal],
    colorScheme: colorSchemeHashmap[signal],
  }

  return [value, setValue, attributes]
}

export default useValueSignal
