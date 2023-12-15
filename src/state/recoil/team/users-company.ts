import { atom, selector } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

export const usersCompany = atom<User[]>({
  key: 'usersCompany',
  default: [],
})

export const filteredUsersCompany = (teamId?: Team['id']) => {
  return selector<User[]>({
    key: 'filteredUsersCompany',
    get: ({ get }) => {
      const users = get(usersCompany)

      const filteredUsers = users.filter((user) => {
        const teamIds = user.teams?.edges.map((team) => team.node.id)
        const companyUserId = user.companies?.edges[0].node.id

        return teamIds
          ? [...teamIds, companyUserId].includes(teamId)
          : [companyUserId].includes(teamId)
      })
      return filteredUsers
    },
  })
}

export const selectUserFromCompany = (userId: User['id']) => {
  return selector<User | undefined>({
    key: 'selectUser',
    get: ({ get }) => {
      const users = get(usersCompany)

      const filteredUsers = users.find(({ id }) => id === userId)
      return filteredUsers
    },
  })
}
