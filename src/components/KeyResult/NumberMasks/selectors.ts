import { KeyResultFormat } from 'src/components/KeyResult/types'

import Absolute from './Absolute'
import CoinBRL from './CoinBRL'
import Percentage from './Percentage'

export const selectMaskBasedOnFormat = (format: KeyResultFormat = KeyResultFormat.NUMBER) => {
  const masksHashmap = {
    [KeyResultFormat.NUMBER]: Absolute,
    [KeyResultFormat.PERCENTAGE]: Percentage,
    [KeyResultFormat.COIN_BRL]: CoinBRL,
  }
  const Mask = masksHashmap[format]

  return Mask ?? masksHashmap[KeyResultFormat.NUMBER]
}
