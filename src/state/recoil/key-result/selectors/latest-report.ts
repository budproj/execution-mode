import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LATEST_REPORT`

export const selectReports = buildPartialSelector<KeyResult['reports']>('reports')

export const getLatestReport = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const reports = get(selectReports(id))
  const latestReport = reports?.[0]

  return latestReport
}

export const setLatestReport = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  newReport: Partial<ProgressReport> | DefaultValue | undefined,
) => {
  if (!id) return

  const reportsSelector = selectReports(id)
  const reports = get(reportsSelector)

  const userID = get(meAtom)
  const user = get(userAtomFamily(userID))

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const newLocalReport = {
    user,
    createdAt: new Date(),
    ...newReport,
  } as ProgressReport
  const newReports = remove([newLocalReport, ...(reports ?? [])])

  set(reportsSelector, newReports)
}

const currentConfidence = selectorFamily<
  Partial<ProgressReport> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getLatestReport,
  set: setLatestReport,
})

export default currentConfidence
