import { cycle } from './cycle'
import { delta } from './delta'
import { keyResult } from './key-result'
import { keyResultCheckIn } from './key-result-check-in'
import { nodePolicy } from './node-policy'
import { objective } from './objective'
import { status } from './status'
import { team } from './team'
import { user } from './user'

export const models = {
  user,
  team,
  cycle,
  status,
  delta,
  keyResult,
  keyResultCheckIn,
  objective,
  nodePolicy,
}

export type Models = typeof models
