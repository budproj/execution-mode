import { User } from 'src/components/User/types'

export const teamIndicatorsDataMapper = {
  toFront(data: User[]) {
    return data.map(({ id, userIndicators }) => ({
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
        userId: id,
      },
      lastRetrospectiveAnswer: {
        userId: id,
      },
    }))
  },
}
