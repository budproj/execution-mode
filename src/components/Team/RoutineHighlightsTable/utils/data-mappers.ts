import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'

import { RequestReturnMapped } from '../hooks/getTeamRoutineHighlightsData/get-team-routine-highlights-data'

export const teamRoutinesHighlightsDataMapper = {
  toFront(data: RequestReturnMapped[], cardType: CARD_TYPES) {
    return data.map(({ data: retrospectiveData, userId }) => {
      const { feeling, lastRoutineAnswerId, productivity, roadBlock } = retrospectiveData

      return {
        user: {
          userId,
        },
        team: {
          userId,
        },
        custom: {
          userId,
          lastUserRoutineAnswer: retrospectiveData,
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
          userId,
        },
      }
    })
  },
}
