import remove from 'lodash/remove'
import { selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'components/KeyResult/types'
import { PREFIX } from 'state/recoil/intl/constants'
import { buildPartialSelector } from 'state/recoil/key-result/selectors'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

const selectProgressReports = buildPartialSelector<KeyResult['progressReports']>('progressReports')

const currentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  get: (id) => ({ get }) => {
    if (!id) return

    const progressReports = get(selectProgressReports(id))
    const latestProgressReport = progressReports?.[0]

    return latestProgressReport?.valueNew
  },
  set: (id) => ({ get, set }, valueNew) => {
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
  },
})

export default currentProgress
