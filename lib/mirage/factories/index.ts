import { team } from './team'
import { user } from './user'
import { cycle } from './cycle'
import { status } from './status'
import { deltum } from './delta'
import { keyResult } from './key-result'
import { keyResultCheckIn } from './key-result-check-in'
import { objective } from './objective'
import { nodePolicy } from './node-policy'

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
