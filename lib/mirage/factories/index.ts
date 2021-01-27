import confidenceReport from './confidence-report'
import cycle from './cycle'
import keyResult from './key-result'
import keyResultCustomList from './key-result-view'
import objective from './objective'
import policy from './policy'
import progressReport from './progress-report'
import team from './team'
import user from './user'

const factories = {
  keyResult,
  user,
  cycle,
  objective,
  keyResultCustomList,
  team,
  confidenceReport,
  progressReport,
  policy,
}

export default factories
