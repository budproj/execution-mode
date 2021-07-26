import { cycle } from './cycle'
import { deltum } from './delta'
import { keyResult } from './key-result'
import { keyResultCheckIn } from './key-result-check-in'
import { nodePolicy } from './node-policy'
import { objective } from './objective'
import { status } from './status'
import { team } from './team'
import { user } from './user'

export const factories = {
  user,
  team,
  cycle,
  status,
  deltum,
  keyResult,
  keyResultCheckIn,
  objective,
  nodePolicy,
}

export type Factories = typeof factories
