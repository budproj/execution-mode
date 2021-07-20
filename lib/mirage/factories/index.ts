import { team } from './team'
import { user } from './user'

export const factories = {
  user,
  team,
}

export type Factories = typeof factories
