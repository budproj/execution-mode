export const teamHighlightsTableSkeletonData = (numberOfLines: number) => {
  const mockedArray = []

  for (let index = numberOfLines; index > 0; index--) {
    mockedArray.push(Math.random())
  }

  return mockedArray.map((_) => ({
    user: 'user',
    team: 'team',
    custom: 'custom',
    lastRetrospective: 'lastRetrospective',
    lastAccess: 'lastAccess',
  }))
}
