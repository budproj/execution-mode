import remove from 'lodash/remove'
import { DefaultValue, selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilInterfaceGetter, RecoilInterfaceReadWrite } from 'src/state/recoil/types'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

export const selectProgressReports = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)

export const getCurrentProgress = (id?: KeyResult['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return

  const progressReports = get(selectProgressReports(id))
  const latestProgressReport = progressReports?.[0]

  return latestProgressReport?.valueNew
}

export const setCurrentProgress = (id?: KeyResult['id']) => (
  { get, set }: RecoilInterfaceReadWrite,
  valueNew: ProgressReport['valueNew'] | DefaultValue | undefined,
) => {
  if (!id) return

  const progressReportsSelector = selectProgressReports(id)

  const progressReports = get(progressReportsSelector)
  const latestProgressReport = progressReports?.[0]
  const newLocalReport = {
    valueNew,
    valuePrevious: latestProgressReport?.valueNew,
  }

  set(
    progressReportsSelector,
    remove([newLocalReport as ProgressReport, ...(progressReports ?? [])]),
  )
}

const currentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
  set: setCurrentProgress,
})

export default currentProgress
