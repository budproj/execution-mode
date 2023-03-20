import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import teamMembersHighlightsMessages from 'src/components/Page/Team/Highlights/modals/UsersTeamList/messages'

interface UserproductivityProperties {
  productivity?: string
}

const Userproductivity = ({ productivity }: UserproductivityProperties) => {
  const intl = useIntl()

  return (
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

        <Text color="blue.400">{productivity}</Text>
      </Box>
    </TooltipWithDelay>
  )
}

export default Userproductivity
