import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, ConfidenceReport } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

import { userAtomFamily } from '../../user'
import meAtom from '../../user/me'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST_CONFIDENCE_REPORT`

export const selectConfidenceReports = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

export const getLatestConfidenceReport = (id?: KeyResult['id']) => ({
  get,
}: RecoilInterfaceGetter) => {
  if (!id) return

  const confidenceReports = get(selectConfidenceReports(id))
  const latestConfidenceReport = confidenceReports?.[0]

  return latestConfidenceReport
}

export const setLatestConfidenceReport = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newReport: Partial<ConfidenceReport> | DefaultValue | undefined,
) => {
  if (!id) return

  const confidenceReportsSelector = selectConfidenceReports(id)

  const confidenceReports = get(confidenceReportsSelector)
  const userID = get(meAtom)
  const user = get(userAtomFamily(userID))

  const latestConfidenceReport = confidenceReports?.[0]
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const newLocalReport = {
    user,
    createdAt: new Date(),
    valuePrevious: latestConfidenceReport?.valueNew,
    ...newReport,
  } as ConfidenceReport
  const newConfidenceReports = remove([newLocalReport, ...(confidenceReports ?? [])])

  set(confidenceReportsSelector, newConfidenceReports)
}

const currentConfidence = selectorFamily<
  Partial<ConfidenceReport> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestConfidenceReport,
  set: setLatestConfidenceReport,
})

export default currentConfidence
