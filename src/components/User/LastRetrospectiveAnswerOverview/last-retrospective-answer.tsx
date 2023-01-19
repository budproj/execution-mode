import { Box, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import teamMembersHighlightsMessages from 'src/components/Page/Team/Highlights/modals/UsersTeamList/messages'
import { useGetEmoji } from 'src/components/Routine/hooks'

import { UserRetrospectiveAnswerOverviewDataProperties } from './hooks/use-get-last-retrospective-answer-overview'
import messages from './messages'

const LastRetrospectiveAnswer = (
  userRoutineData: UserRetrospectiveAnswerOverviewDataProperties,
) => {
  const { getEmoji } = useGetEmoji()
  const intl = useIntl()

  return (
    <GridItem gap="15px" display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
      <TooltipWithDelay label={intl.formatMessage(teamMembersHighlightsMessages.feelingLabel)}>
        <Box display="flex" flexDir="column" textAlign="center">
          {getEmoji({ felling: Number(userRoutineData?.feeling), size: '25px' })}

          <Text color="yellow.600">{userRoutineData?.feeling}</Text>
        </Box>
      </TooltipWithDelay>
      <TooltipWithDelay label={intl.formatMessage(teamMembersHighlightsMessages.productivityLabel)}>
        <Box display="flex" flexDir="column" textAlign="center">
          <Box
            borderRadius="50%"
            width="24px"
            height="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            background="blue.400"
          >
            <SuitcaseIcon
              boxSize="12px"
              desc={intl.formatMessage(teamMembersHighlightsMessages.suitcaseIconDescription)}
            />
          </Box>

          <Text color="blue.400">{userRoutineData?.productivity}</Text>
        </Box>
      </TooltipWithDelay>
      <TooltipWithDelay label={intl.formatMessage(teamMembersHighlightsMessages.roadblockLabel)}>
        <Box textAlign="center">
          <Box
            borderRadius="50%"
            width="24px"
            height="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            background="pink.500"
          >
            <PauseIcon
              boxSize="28px"
              fill="pink.500"
              desc={intl.formatMessage(teamMembersHighlightsMessages.pauseIconDescription)}
            />
          </Box>

          <Text color="pink.500">
            {intl.formatMessage(messages.roadblockIconLabel, {
              hasBlock: userRoutineData.roadBlock,
            })}
          </Text>
        </Box>
      </TooltipWithDelay>
    </GridItem>
  )
}

export default LastRetrospectiveAnswer
