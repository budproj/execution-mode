import { GridItem, Tooltip, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'

import messages from './messages'

const TeamsOverviewBodyTableHead = () => {
  const intl = useIntl()

  return (
    <TeamsOverviewBodyTableLineTemplate fontSize="sm" color="black.600" fontWeight={500}>
      <GridItem>
        <Tooltip label={intl.formatMessage(messages.firstColumnTooltip)} placement="bottom-start">
          <Text cursor="help">{intl.formatMessage(messages.firstColumnTitle)}</Text>
        </Tooltip>
      </GridItem>
      <GridItem>
        <Tooltip label={intl.formatMessage(messages.secondColumnTooltip)} placement="bottom-start">
          <Text cursor="help">{intl.formatMessage(messages.secondColumnTitle)}</Text>
        </Tooltip>
      </GridItem>
      <GridItem>
        <Tooltip label={intl.formatMessage(messages.thirdColumnTooltip)} placement="bottom-start">
          <Text cursor="help">{intl.formatMessage(messages.thirdColumnTitle)}</Text>
        </Tooltip>
      </GridItem>
    </TeamsOverviewBodyTableLineTemplate>
  )
}

export default TeamsOverviewBodyTableHead
