import { GraphQLEffect } from 'src/components/types'

export interface TeamFlagsProperties {
  permissions: {
    flags: {
      read?: GraphQLEffect
    }
  }
}
