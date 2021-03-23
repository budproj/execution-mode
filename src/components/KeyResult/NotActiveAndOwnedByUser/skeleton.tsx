import React from 'react'

import KeyResultCycleList from '../CycleList'

export interface KeyResultNotActiveAndOwnedByUserSkeletonProperties {
  numberOfSkeletons: number
}

const KeyResultNotActiveAndOwnedByUserSkeleton = ({
  numberOfSkeletons,
}: KeyResultNotActiveAndOwnedByUserSkeletonProperties) => (
  <>
    {[...new Array(numberOfSkeletons)].map(() => (
      <KeyResultCycleList key={Math.random()} />
    ))}
  </>
)

KeyResultNotActiveAndOwnedByUserSkeleton.defaultProps = {
  numberOfSkeletons: 2,
}

export default KeyResultNotActiveAndOwnedByUserSkeleton
