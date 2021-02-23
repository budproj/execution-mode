import { ColorScheme } from 'src/themes/tokens'

export enum SIGNAL {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum INDICATOR {
  POSITIVE = '+',
  NEGATIVE = '-',
  NEUTRAL = '',
}

export const INDICATOR_HASHMAP = {
  [SIGNAL.POSITIVE]: INDICATOR.POSITIVE,
  [SIGNAL.NEGATIVE]: INDICATOR.NEGATIVE,
  [SIGNAL.NEUTRAL]: INDICATOR.NEUTRAL,
}

export const COLOR_SCHEME_HASHMAP = {
  [SIGNAL.POSITIVE]: ColorScheme.GREEN,
  [SIGNAL.NEGATIVE]: ColorScheme.RED,
  [SIGNAL.NEUTRAL]: ColorScheme.UNIQUE_GRAY,
}
