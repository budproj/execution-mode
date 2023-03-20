export const indicatorsTableSkeletonData = (numberOfLines: number) => {
  const mockedArray = []

  for (let index = numberOfLines; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return mockedArray.map((_) => ({
    userKeyResultsOverviewSkeleton: 'userKeyResultsOverviewSkeleton',
    checkinSkeleton: 'checkinSkeleton',
    checklistSkeleton: 'checklistSkeleton',
    lastAccessSkeleton: 'lastAccessSkeleton',
    lastRetrospectiveAnswerSkeleton: 'lastRetrospectiveAnswerSkeleton',
  }))
}
