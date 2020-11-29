import remove from 'lodash/remove'
import { selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { PREFIX } from 'src/state/recoil/intl/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { RecoilSpecificationGetter, RecoilSpecificationSetter } from 'state/recoil/types'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

export const selectProgressReports = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)

export const selectorSpecification = {
  key: KEY,
  get: (id?: KeyResult['id']) => ({ get }: RecoilSpecificationGetter) => {
    if (!id) return

    const progressReports = get(selectProgressReports(id))
    const latestProgressReport = progressReports?.[0]

    return latestProgressReport?.valueNew
  },
  set: (id?: KeyResult['id']) => (
    { get, set }: RecoilSpecificationSetter,
    valueNew: ProgressReport['valueNew'],
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
  },
}

const currentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  KeyResult['id'] | undefined
>(selectorSpecification)

export default currentProgress
