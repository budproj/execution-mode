import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import teamMembersHighlightsMessages from 'src/components/Page/Team/Highlights/modals/UsersTeamList/messages'
import { useGetEmoji } from 'src/components/Routine/hooks'

import { UserRetrospectiveAnswerOverviewDataProperties } from '../hooks/use-get-last-retrospective-answer-overview'

interface UserRetrospectiveFeelingProperties {
  feeling: UserRetrospectiveAnswerOverviewDataProperties['feeling']
}

const UserFeeling = ({ feeling }: UserRetrospectiveFeelingProperties) => {
  const intl = useIntl()
  const { getEmoji } = useGetEmoji()

  return (
    <TooltipWithDelay label={intl.formatMessage(teamMembersHighlightsMessages.feelingLabel)}>
      <Box display="flex" flexDir="column" textAlign="center">
        {getEmoji({ felling: Number(feeling), size: '25px' })}

        <Text color="yellow.600">{feeling}</Text>
      </Box>
    </TooltipWithDelay>
  )
}

export default UserFeeling
