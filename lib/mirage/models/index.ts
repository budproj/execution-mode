import { team } from './team'
import { user } from './user'
import { cycle } from './cycle'
import { status } from './status'
import { delta } from './delta'
import { keyResultCheckIn } from './key-result-check-in'

export const models = {
  user,
  team,
  cycle,
  status,
  delta,
  keyResultCheckIn,
}

export type Models = typeof models
