import remove from 'lodash/remove'
import { selectorFamily } from 'recoil'

import { KeyResult, ConfidenceReport } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilSpecificationGetter, RecoilSpecificationSetter } from 'state/recoil/types'

const KEY = `${PREFIX}::CURRENT_CONFIDENCE`

export const selectConfidenceReports = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

export const selectorSpecification = {
  key: KEY,
  get: (id: KeyResult['id'] | undefined) => ({ get }: RecoilSpecificationGetter) => {
    if (!id) return

    const confidenceReports = get(selectConfidenceReports(id))
    const latestConfidenceReport = confidenceReports?.[0]

    return latestConfidenceReport?.valueNew
  },
  set: (id: KeyResult['id'] | undefined) => (
    { get, set }: RecoilSpecificationSetter,
    valueNew: ConfidenceReport['valueNew'],
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
  },
}

const currentConfidence = selectorFamily<
  ConfidenceReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>(selectorSpecification)

export default currentConfidence
