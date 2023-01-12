import React from 'react'

import { User } from '../types'

export interface UserOverviewProperties {
  userID: User['id']
}

const UserOverview = ({ userID }: UserOverviewProperties) => {
  console.log({ userID })

  return <div>{userID}</div>
}

export default UserOverview
