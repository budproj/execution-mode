import assert from 'assert'
import chalk from 'chalk'
import { Context } from './common.js'
import { freshAuth } from '../auth.js'
import { spinningRun } from '../util.js'

export default ({ program, apiUrl, email, password }: Context) => {
  program
    .command('auth')
    .description('Authenticate with the platform')
    .option('--gui', 'displays the browser window')
    .action(async (options) => {
      try {
        await spinningRun(
          `Authenticating user ${email}`,
          freshAuth({
            apiUrl,
            email,
            password,
            headless: !options.gui,
          }),
        )
      } catch (err) {
        if (err instanceof assert.AssertionError) {
          console.error(chalk.redBright(err.message))
          process.exit(1)
        } else {
          throw err
        }
      }
    })
}
