import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'
import { User } from 'src/components/User/types'

export const CustomBox = styled(Box)`
  @media (min-width: 1600px) {
    width: 280px;
  }

  @media (max-width: 1417px) {
    width: 160px;
  }
`
export interface RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties {
  lastRetrospetiveAnswerId?: string
  feeling?: string
  userId: User['id']
  productivity?: string
  roadBlock?: string
  onClick?: () => void
}

const RoutinesHighlightsTableLastRetrospectiveAnswerColumn = ({
  lastRetrospetiveAnswerId,
  feeling,
  userId,
  productivity,
  roadBlock,
  onClick,
}: RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties) => {
  return (
    <CustomBox>
      <LastRetrospectiveAnswerOverview
        isLoaded
        userId={userId}
        lastRetrospetiveAnswerId={lastRetrospetiveAnswerId}
        feeling={feeling}
        productivity={productivity}
        roadblock={roadBlock}
        onClick={onClick}
      />
    </CustomBox>
  )
}

export default RoutinesHighlightsTableLastRetrospectiveAnswerColumn
