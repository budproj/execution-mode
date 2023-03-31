import { Command } from 'commander'

import { BudSdk } from '../sdk.js'

export interface Context {
  program: Command
  sdk: BudSdk
  apiUrl: string
  email: string
  password: string
  companyId: string
}
