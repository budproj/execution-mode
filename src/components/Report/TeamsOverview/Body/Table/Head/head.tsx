import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'

import messages from './messages'

const TeamsOverviewBodyTableHead = () => {
  const intl = useIntl()

  return (
    <TeamsOverviewBodyTableLineTemplate fontSize="sm" color="black.600" fontWeight={500}>
      <GridItem>
        <TooltipWithDelay
          label={intl.formatMessage(messages.firstColumnTooltip)}
          placement="bottom-start"
        >
          <Text cursor="help">{intl.formatMessage(messages.firstColumnTitle)}</Text>
        </TooltipWithDelay>
      </GridItem>
      <GridItem>
        <TooltipWithDelay
          label={intl.formatMessage(messages.secondColumnTooltip)}
          placement="bottom-start"
        >
          <Text cursor="help">{intl.formatMessage(messages.secondColumnTitle)}</Text>
        </TooltipWithDelay>
      </GridItem>
      <GridItem>
        <TooltipWithDelay
          label={intl.formatMessage(messages.thirdColumnTooltip)}
          placement="bottom-start"
        >
          <Text cursor="help">{intl.formatMessage(messages.thirdColumnTitle)}</Text>
        </TooltipWithDelay>
      </GridItem>
    </TeamsOverviewBodyTableLineTemplate>
  )
}

export default TeamsOverviewBodyTableHead
