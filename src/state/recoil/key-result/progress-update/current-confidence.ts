import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, ConfidenceReport } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilSpecificationGetter, RecoilSpecificationSetter } from 'state/recoil/types'

const KEY = `${PREFIX}::CURRENT_CONFIDENCE`

export const selectConfidenceReports = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

export const getCurrentConfidence = (id?: KeyResult['id']) => ({
  get,
}: RecoilSpecificationGetter) => {
  if (!id) return

  const confidenceReports = get(selectConfidenceReports(id))
  const latestConfidenceReport = confidenceReports?.[0]

  return latestConfidenceReport?.valueNew
}

export const setCurrentConfidence = (id?: KeyResult['id']) => (
  { get, set }: RecoilSpecificationSetter,
  valueNew: ConfidenceReport['valueNew'] | DefaultValue | undefined,
) => {
  if (!id) return

  const confidenceReportsSelector = selectConfidenceReports(id)

  const confidenceReports = get(confidenceReportsSelector)
  const latestConfidenceReport = confidenceReports?.[0]
  const newLocalReport = {
    valueNew,
    valuePrevious: latestConfidenceReport?.valueNew,
  }

  set(
    confidenceReportsSelector,
    remove([newLocalReport as ConfidenceReport, ...(confidenceReports ?? [])]),
  )
}

const currentConfidence = selectorFamily<
  ConfidenceReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getCurrentConfidence,
  set: setCurrentConfidence,
})

export default currentConfidence
