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
        totalOfDoneCheckIns: 124,
        totalOfKeyResultsThatNeedsCheckIn: 287,
      },
      checklist: {
        userId: id,
        checked: 123,
        total: 256,
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
