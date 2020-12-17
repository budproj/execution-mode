import { selectorFamily } from 'recoil'

import { Company } from 'src/components/Company/types'
import { ProgressReport } from 'src/components/KeyResult/types'
import {
  getCeiledAverageProgress,
  getTeamPercentageProgress,
} from 'src/state/recoil/team/selectors/current-progress'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import companyAtomFamily from '../atom-family'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

export const getCurrentProgress = (id?: Company['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return 0

  const company = get(companyAtomFamily(id))
  if (!company) return 0

  const childTeamsPercentageProgresses = company.teams?.map(getTeamPercentageProgress)
  const companyCeiledAverageProgress = getCeiledAverageProgress(childTeamsPercentageProgresses)
  const isNaN = Number.isNaN(companyCeiledAverageProgress)

  return isNaN ? 0 : companyCeiledAverageProgress
}

const companyCurrentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  Company['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
})

export default companyCurrentProgress
