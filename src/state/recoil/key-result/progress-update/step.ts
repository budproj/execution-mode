import { selectorFamily } from 'recoil'

import { KeyResult, KeyResultFormat } from 'src/components/KeyResult'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilSpecificationGetter } from 'src/state/recoil/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::STEP`

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

export const getStepBasedOnID = (id?: KeyResult['id']) => ({
  get,
}: RecoilSpecificationGetter): number => {
  const format = get(formatSelector(id))
  const defaultStep = 1

  if (!format) return defaultStep

  const formatHashmap: Partial<Record<KeyResultFormat, number>> = {
    [KeyResultFormat.NUMBER]: 1,
    [KeyResultFormat.PERCENTAGE]: 1,
    [KeyResultFormat.COIN_BRL]: 1,
  }

  return formatHashmap[format] ?? defaultStep
}

export const step = selectorFamily<number, KeyResult['id'] | undefined>({
  key: KEY,
  get: getStepBasedOnID,
})

export default step
