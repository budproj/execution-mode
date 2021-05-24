import { selectorFamily } from 'recoil'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::PROGRESS_SLIDER_STEP`

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export const getStepBasedOnID =
  (id?: KeyResult['id']) =>
  ({ get }: RecoilInterfaceGetter): number => {
    const format = get(formatSelector(id))
    const defaultStep = 1

    if (!format) return defaultStep

    const formatHashmap: Partial<Record<KEY_RESULT_FORMAT, number>> = {
      [KEY_RESULT_FORMAT.NUMBER]: 1,
      [KEY_RESULT_FORMAT.PERCENTAGE]: 1,
      [KEY_RESULT_FORMAT.COIN_BRL]: 1,
    }

    return formatHashmap[format] ?? defaultStep
  }

export const progressSliderStep = selectorFamily<number, KeyResult['id'] | undefined>({
  key: KEY,
  get: getStepBasedOnID,
})

export default progressSliderStep
