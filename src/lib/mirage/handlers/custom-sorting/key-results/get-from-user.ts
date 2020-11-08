import { Request } from 'miragejs'
import DbCollection from 'miragejs/db-collection'

import { CustomSorting } from 'components/User'
import { MirageResponse } from 'lib/mirage/handlers'

const getFromUser = (
  schema: Record<string, DbCollection>,
  request: Request,
): MirageResponse<CustomSorting['keyResults']> => {
  const userId = request.params.id
  const userCustomSorting = schema.customSortings.findBy({ userId }).attrs

  return {
    data: userCustomSorting.keyResultIds,
  }
}

export default getFromUser
