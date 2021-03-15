import React from 'react'

import KeyResultCycleList from '../CycleList'

export interface KeyResultOwnedByUserSkeletonProperties {
  numberOfSkeletons: number
}

const KeyResultOwnedByUserSkeleton = ({
  numberOfSkeletons,
}: KeyResultOwnedByUserSkeletonProperties) => (
  <>
    {[...new Array(numberOfSkeletons)].map(() => (
      <KeyResultCycleList key={Math.random()} />
    ))}
  </>
)

KeyResultOwnedByUserSkeleton.defaultProps = {
  numberOfSkeletons: 2,
}

export default KeyResultOwnedByUserSkeleton
