import faker from 'faker'
import { Factory } from 'miragejs'

import { Objective } from 'components/Objective'

export default Factory.extend({
  title: () => faker.random.words(3),
} as Objective)
