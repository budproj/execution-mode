import { team } from './team'
import { user } from './user'
import { cycle } from './cycle'
import { status } from './status'
import { deltum } from './delta'
import { keyResultCheckIn } from './key-result-check-in'

export const factories = {
  user,
  team,
  cycle,
  status,
  deltum,
  keyResultCheckIn,
}

export type Factories = typeof factories
