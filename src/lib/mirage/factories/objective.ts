import faker from 'faker'
import { Factory } from 'miragejs'

import { Objective } from 'components/Objective'

export default Factory.extend({
  title: faker.name.title(),
} as Objective)
