import { Dispatch, SetStateAction, useState } from 'react'

import { COLOR_SCHEME } from 'src/themes/tokens'

import { KEY_RESULT_TYPE } from '../../../components/KeyResult/constants'

import { COLOR_SCHEME_HASHMAP, INDICATOR, INDICATOR_HASHMAP, SIGNAL } from './constants'

export type ValueSignalHook = [
  number,
  Dispatch<SetStateAction<number>>,
  ValueSignalAttributes,
  Dispatch<SetStateAction<ValueSignalOptions>>,
]

export interface ValueSignalAttributes {
  signal: SIGNAL
  indicator: INDICATOR
  colorScheme: COLOR_SCHEME
}

interface ValueSignalOptions {
  type?: KEY_RESULT_TYPE
}

const selectSignal = (value?: number) => {
  if (!value) return SIGNAL.NEUTRAL

  const isPositive = value > 0
  const isNegative = value < 0

  return isPositive ? SIGNAL.POSITIVE : isNegative ? SIGNAL.NEGATIVE : SIGNAL.NEUTRAL
}

const selectColorScheme = (
  signal: SIGNAL,
  colorSchemeHashmap: typeof COLOR_SCHEME_HASHMAP,
  type?: KEY_RESULT_TYPE,
): COLOR_SCHEME => {
  if (!type) return colorSchemeHashmap[signal]

  return type === KEY_RESULT_TYPE.ASCENDING
    ? colorSchemeHashmap[signal]
    : reverseColorScheme(signal, colorSchemeHashmap)
}

const reverseColorScheme = (
  signal: SIGNAL,
  colorSchemeHashmap: typeof COLOR_SCHEME_HASHMAP,
): COLOR_SCHEME => {
  if (signal === SIGNAL.POSITIVE) return colorSchemeHashmap[SIGNAL.NEGATIVE]
  if (signal === SIGNAL.NEGATIVE) return colorSchemeHashmap[SIGNAL.POSITIVE]

  return colorSchemeHashmap[signal]
}

const useValueSignal = (
  initialValue?: number,
  colorSchemeHashmap: typeof COLOR_SCHEME_HASHMAP = COLOR_SCHEME_HASHMAP,
  initialOptions?: ValueSignalOptions,
): ValueSignalHook => {
  const [value, setValue] = useState(initialValue ?? 0)
  const [options, setOptions] = useState(initialOptions ?? {})

  const signal = selectSignal(value)
  const colorScheme = selectColorScheme(signal, colorSchemeHashmap, options.type)

  const attributes = {
    signal,
    colorScheme,
    indicator: INDICATOR_HASHMAP[signal],
  }

  return [value, setValue, attributes, setOptions]
}

export default useValueSignal
