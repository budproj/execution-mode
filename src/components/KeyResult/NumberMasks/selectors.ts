import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

import Absolute from './Absolute'
import CoinBRL from './CoinBRL'
import CoinEUR from './CoinEUR'
import CoinGBP from './CoinGBP'
import CoinUSD from './CoinUSD'
import Percentage from './Percentage'

export const selectMaskBasedOnFormat = (format: KEY_RESULT_FORMAT = KEY_RESULT_FORMAT.NUMBER) => {
  const masksHashmap = {
    [KEY_RESULT_FORMAT.NUMBER]: Absolute,
    [KEY_RESULT_FORMAT.PERCENTAGE]: Percentage,
    [KEY_RESULT_FORMAT.COIN_BRL]: CoinBRL,
    [KEY_RESULT_FORMAT.COIN_EUR]: CoinEUR,
    [KEY_RESULT_FORMAT.COIN_GBP]: CoinGBP,
    [KEY_RESULT_FORMAT.COIN_USD]: CoinUSD,
  }
  const Mask = masksHashmap[format]

  return Mask ?? masksHashmap[KEY_RESULT_FORMAT.NUMBER]
}
