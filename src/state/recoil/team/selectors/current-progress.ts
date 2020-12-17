import sum from 'lodash/sum'
import { selectorFamily } from 'recoil'

import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'
import { RecoilInterfaceGetter } from 'src/state/recoil/types'

import teamAtomFamily from '../atom-family'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_PROGRESS`

export const getCurrentProgress = (id?: Team['id']) => ({ get }: RecoilInterfaceGetter) => {
  if (!id) return 0

  const team = get(teamAtomFamily(id))
  if (!team) return 0

  const childTeamsPercentageProgresses = team.teams?.map(getTeamPercentageProgress)
  const teamCeiledAverageProgress = getCeiledAverageProgress(childTeamsPercentageProgresses)
  const isNaN = Number.isNaN(teamCeiledAverageProgress)

  return isNaN ? 0 : teamCeiledAverageProgress
}

export const getTeamPercentageProgress = (team: Partial<Team>) => {
  if (!team.keyResults) return 0

  const keyResultsPercentageProgresses = team.keyResults.map(getKeyResultPercentageProgress)
  const teamCeiledAverageProgress = getCeiledAverageProgress(keyResultsPercentageProgresses)

  return teamCeiledAverageProgress
}

const getKeyResultPercentageProgress = ({ goal, progressReports }: Partial<KeyResult>) => {
  const latestProgressReport = progressReports?.[0]
  if (!latestProgressReport) return 0

  const latestReportedValue = latestProgressReport.valueNew
  const percentageProgress = getProgressAsCeiledPercentage(latestReportedValue, goal)

  return percentageProgress
}

const getProgressAsCeiledPercentage = (
  latestReportedValue: ProgressReport['valueNew'] | undefined,
  goal: KeyResult['goal'] | undefined,
) => (latestReportedValue && goal ? Math.ceil((latestReportedValue / goal) * 100) : 0)

export const getCeiledAverageProgress = (
  // For some reason, if I enable the following eslint rule, it crashes into a loop trying to change typeof Number.NaN by itself recursively
  // eslint-disable-next-line unicorn/prefer-number-properties
  progressReports?: Array<ProgressReport['valueNew'] | typeof Number.NaN>,
) => {
  if (!progressReports) return 0

  const clearedProgressReports = progressReports.filter((value) => !Number.isNaN(value))
  const ceiledAverageProgress = Math.ceil(
    sum(clearedProgressReports) / clearedProgressReports.length,
  )

  return ceiledAverageProgress
}

const teamCurrentProgress = selectorFamily<
  ProgressReport['valueNew'] | undefined,
  Team['id'] | undefined
>({
  key: KEY,
  get: getCurrentProgress,
})

export default teamCurrentProgress
