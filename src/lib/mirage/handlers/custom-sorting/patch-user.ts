import { Request } from 'miragejs'
import DbCollection from 'miragejs/db-collection'

import { CustomSorting } from 'components/User'
import { MirageResponse } from 'lib/mirage/handlers'

interface PatchUserRequestBody {
  keyResults: CustomSorting['keyResults']
}

const patchUser = (
  schema: Record<string, DbCollection>,
  request: Request,
): MirageResponse<CustomSorting['keyResults']> => {
  const userId = request.params.id
  const newCustomSort: PatchUserRequestBody = JSON.parse(request.requestBody)

  const keyResults = newCustomSort.keyResults.map((id: number | string) =>
    schema.keyResults.find(id),
  )
  const updatedData = schema.customSortings.findBy({ userId }).update({ keyResults }).save()

  return {
    data: updatedData,
  }
}

export default patchUser
