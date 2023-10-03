import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

export interface GetUserPrimaryCompanyQuery {
  me?: User
  team?: Team
}
