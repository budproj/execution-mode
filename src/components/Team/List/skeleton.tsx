import React from 'react'

import { TeamListSingle } from './single'

interface TeamListSkeletonProperties {
  numberOfSkeletons?: number
}

export const TeamListSkeleton = ({ numberOfSkeletons }: TeamListSkeletonProperties) => {
  numberOfSkeletons ??= 2

  return (
    <>
      {[...new Array(numberOfSkeletons)].map(() => (
        <TeamListSingle key={Math.random()} />
      ))}
    </>
  )
}
