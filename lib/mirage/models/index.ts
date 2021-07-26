import { team } from './team'
import { user } from './user'
import { cycle } from './cycle'
import { status } from './status'
import { delta } from './delta'
import { keyResult } from './key-result'
import { keyResultCheckIn } from './key-result-check-in'
import { objective } from './objective'
import { nodePolicy } from './node-policy'

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
