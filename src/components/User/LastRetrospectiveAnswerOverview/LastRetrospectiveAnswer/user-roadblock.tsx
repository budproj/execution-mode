import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { PauseIcon } from 'src/components/Icon'
import teamMembersHighlightsMessages from 'src/components/Page/Team/Highlights/modals/UsersTeamList/messages'

import messages from '../messages'

interface UserRoadblockProperties {
  roadblock?: string
}

const UserRoadblock = ({ roadblock }: UserRoadblockProperties) => {
  const intl = useIntl()

  return (
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
            hasBlock: roadblock,
          })}
        </Text>
      </Box>
    </TooltipWithDelay>
  )
}

export default UserRoadblock
