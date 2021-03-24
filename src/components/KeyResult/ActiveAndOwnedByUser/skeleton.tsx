import React from 'react'

import KeyResultCycleList from '../CycleList'

export interface KeyResultActiveAndOwnedByUserSkeletonProperties {
  numberOfSkeletons: number
}

const KeyResultActiveAndOwnedByUserSkeleton = ({
  numberOfSkeletons,
}: KeyResultActiveAndOwnedByUserSkeletonProperties) => (
  <>
    {[...new Array(numberOfSkeletons)].map(() => (
      <KeyResultCycleList key={Math.random()} />
    ))}
  </>
)

KeyResultActiveAndOwnedByUserSkeleton.defaultProps = {
  numberOfSkeletons: 2,
}

export default KeyResultActiveAndOwnedByUserSkeleton
