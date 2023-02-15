import { User } from 'src/components/User/types'

export const teamIndicatorsDataMapper = {
  toFront(data: User[]) {
    return data.map(({ id, userIndicators, amplitude, lastRoutine }) => ({
      userKeyResultsOverview: {
        userId: id,
        delta: {
          confidence: userIndicators?.keyResultsProgress.delta.confidence,
          progress: userIndicators?.keyResultsProgress.delta.progress,
        },
        latestCheckIn: userIndicators?.keyResultsProgress.latestCheckIn?.createdAt,
        progress: userIndicators?.keyResultsProgress.progress,
      },
      checkin: {
        userId: id,
        totalOfDoneCheckIns: userIndicators?.keyResultsCheckInProgress.checked,
        totalOfKeyResultsThatNeedsCheckIn: userIndicators?.keyResultsCheckInProgress.total,
      },
      checklist: {
        userId: id,
        checked: userIndicators?.keyResultsCheckListProgress.checked,
        total: userIndicators?.keyResultsCheckListProgress.total,
      },
      lastAccess: {
        lastDateAccess: amplitude?.last_used,
      },
      lastRetrospectiveAnswer: {
        userId: id,
        lastRetrospetiveAnswerId: lastRoutine?.id,
        feeling: lastRoutine?.answers.find(
          ({ questionId }) => questionId === '44bd7498-e528-4f96-b45e-3a2374790373',
        )?.value,
        productity: lastRoutine?.answers.find(
          ({ questionId }) => questionId === '9a56911a-61c1-49af-87a8-7a35a1804f6b',
        )?.value,
        roadblock: lastRoutine?.answers.find(
          ({ questionId }) => questionId === 'cf785f20-5a0b-4c4c-b882-9e3949589df2',
        )?.value,
      },
    }))
  },
}
