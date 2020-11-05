import { JSONAPISerializer } from 'miragejs'

export default {
  keyResult: JSONAPISerializer.extend({
    alwaysIncludeLinkageData: true,
  }),
}
