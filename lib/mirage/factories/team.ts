import faker from 'faker'
import { Factory } from 'miragejs'

import { CompanyTeam } from 'components/Company'

export default Factory.extend({
  name: () => faker.random.words(2),
} as CompanyTeam)
