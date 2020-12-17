import sum from 'lodash/sum'
import { selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import teamAtomFamily from '../atom-family'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_CONFIDENCE`

export const getCurrentProgress = (id?: Team['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return 0

  const team = get(teamAtomFamily(id))
  if (!team) return 0

  const childTeamsPercentageProgresses = team.teams?.map(getTeamPercentageProgress)
  const teamCeiledAverageProgress = getCeiledAverageProgress(childTeamsPercentageProgresses)

  return teamCeiledAverageProgress
}

const getTeamPercentageProgress = (team: Partial<Team>) => {
  if (!team.keyResults) return 0

  const keyResultsPercentageProgresses = team.keyResults.map(getKeyResultPercentageProgress)
  const teamCeiledAverageProgress = getCeiledAverageProgress(keyResultsPercentageProgresses)

  return teamCeiledAverageProgress
}

const getKeyResultPercentageProgress = ({ goal, progressReports }: Partial<KeyResult>) => {
  const latestReportedValue = progressReports?.[0].valueNew
  const percentageProgress = getProgressAsCeiledPercentage(latestReportedValue, goal)

  return percentageProgress
}

const getProgressAsCeiledPercentage = (
  latestReportedValue: ProgressReport['valueNew'] | undefined,
  goal: KeyResult['goal'] | undefined,
) => (latestReportedValue && goal ? Math.ceil((latestReportedValue / goal) * 100) : 0)

const getCeiledAverageProgress = (progressReports: Array<ProgressReport['valueNew']> | undefined) =>
  progressReports ? Math.ceil(sum(progressReports) / progressReports.length) : 0

const teamCurrentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  Team['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
})

export default teamCurrentProgress
