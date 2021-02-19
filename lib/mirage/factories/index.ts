import cycle from './cycle'
import keyResult from './key-result'
import keyResultCheckIn from './key-result-check-in'
import keyResultComment from './key-result-comment'
import keyResultCustomList from './key-result-custom-list'
import objective from './objective'
import policy from './policy'
import status from './status'
import team from './team'
import user from './user'

const factories = {
  keyResult,
  keyResultCustomList,
  keyResultCheckIn,
  keyResultComment,
  user,
  cycle,
  objective,
  team,
  policy,
  status,
}

export default factories
