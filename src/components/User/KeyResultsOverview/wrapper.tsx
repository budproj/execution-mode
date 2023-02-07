import React from 'react'

import { User } from '../types'

import KeyResultsOverview from './key-results-overview'
import KeyResultsOverviewSkeleton from './key-results-overview.skeleton'

type Delta = {
  progress?: number
  confidence?: number
}

export interface UserKeyResultsOverviewProperties {
  userId: User['id']
  isLoaded?: boolean
  progress?: number
  latestCheckIn?: string
  delta?: Delta
  onClick?: () => void
}

const WrapperUserKeyResultsOverview = (data: UserKeyResultsOverviewProperties) => {
  const isKeyResultsOverviewLoaded = data?.isLoaded

  return isKeyResultsOverviewLoaded ? (
    <KeyResultsOverview {...data} />
  ) : (
    <KeyResultsOverviewSkeleton />
  )
}

export default WrapperUserKeyResultsOverview
