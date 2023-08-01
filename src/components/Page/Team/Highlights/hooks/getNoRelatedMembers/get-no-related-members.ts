import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

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
  loading: boolean
  called: boolean
}

export const useNoRelatedMembers = (): GetNoRelatedMembers => {
  const [noRelatedUsersIds, setNoRelatedUsersIds] = useState<Array<User['id']>>([])
  const teamId = useRecoilValue(selectedTeamIdHighlight)

  const query = {
    teamId,
  }

  const { loading, called } = useQuery<noRelatedMembersQueryFormat>(GET_NO_RELATED_MEMBERS, {
    variables: query,
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const usersIDs = data.getTeamFlagsData.noRelated.edges.map((edge) => edge.node.id)
      if (usersIDs) setNoRelatedUsersIds(usersIDs)
    },
  })

  return { data: noRelatedUsersIds, loading, called }
}
