import remove from 'lodash/remove'
import { selectorFamily } from 'recoil'

import { KeyResult, ConfidenceReport } from 'components/KeyResult/types'
import { PREFIX } from 'state/recoil/intl/constants'
import { buildPartialSelector } from 'state/recoil/key-result/selectors'

const KEY = `${PREFIX}::CURRENT_CONFIDENCE`

const selectConfidenceReports = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const currentConfidence = selectorFamily<
  ConfidenceReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: (id) => ({ get }) => {
    if (!id) return

    const confidenceReports = get(selectConfidenceReports(id))
    const latestConfidenceReport = confidenceReports?.[0]

    return latestConfidenceReport?.valueNew
  },
  set: (id) => ({ get, set }, valueNew) => {
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
})

export default currentConfidence
