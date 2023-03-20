import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'
import { useGetUserDetails } from 'src/components/User/hooks'

import { RequestReturnMapped } from '../hooks/getTeamRoutineHighlightsData/get-team-routine-highlights-data'

export const teamRoutinesHighlightsDataMapper = {
  toFront(data: RequestReturnMapped[], cardType: CARD_TYPES) {
    return data.map(
      ({ data: { feeling, lastRoutineAnswerId, productivity, roadBlock }, userId }) => ({
        user: {
          userId,
        },
        team: {
          userId,
        },
        custom: {
          userId,
          lastRoutineAnswerId,
          cardType,
        },
        lastRetrospective: {
          lastRetrospetiveAnswerId: lastRoutineAnswerId,
          feeling,
          userId,
          productivity,
          roadBlock,
        },
        lastAccess: {
          lastDateAccess: useGetUserDetails(userId).data?.amplitude?.last_used,
        },
      }),
    )
  },
}
