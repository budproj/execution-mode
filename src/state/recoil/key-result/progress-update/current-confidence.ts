import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, ConfidenceReport } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

const KEY = `${PREFIX}::CURRENT_CONFIDENCE`

export const selectConfidenceReports = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

export const getCurrentConfidence = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const confidenceReports = get(selectConfidenceReports(id))
  const latestConfidenceReport = confidenceReports?.[0]

  return latestConfidenceReport?.valueNew
}

export const setCurrentConfidence = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
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
  const newConfidenceReports = remove([
    newLocalReport as ConfidenceReport,
    ...(confidenceReports ?? []),
  ])

  set(confidenceReportsSelector, newConfidenceReports)
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
