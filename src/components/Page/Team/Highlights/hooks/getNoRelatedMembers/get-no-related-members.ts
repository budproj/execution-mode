import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import GET_NO_RELATED_MEMBERS from './get-no-related-members.gql'

type edge = {
  node: {
    id: User['id']
  }
}

type noRelatedMembersQueryFormat = {
  getTeamFlagsData: {
    noRelated: {
      edges: edge[]
    }
  }
}

interface GetNoRelatedMembers {
  data: Array<User['id']>
  setTeamId: (teamId: Team['id']) => void
  loading: boolean
  called: boolean
}

export const useNoRelatedMembers = (): GetNoRelatedMembers => {
  const [noRelatedUsersIds, setNoRelatedUsersIds] = useState<Array<User['id']>>([])
  const [teamId, setTeamId] = useState<Team['id'] | undefined>()

  const query = {
    teamId,
  }

  const { loading, called } = useQuery<noRelatedMembersQueryFormat>(GET_NO_RELATED_MEMBERS, {
    variables: query,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const usersIDs = data.getTeamFlagsData.noRelated.edges.map((edge) => edge.node.id)
      if (usersIDs) setNoRelatedUsersIds(usersIDs)
    },
  })

  return { data: noRelatedUsersIds, setTeamId, loading, called }
}
