import { GridItem, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'

import messages from './messages'

const TeamsOverviewBodyTableHead = () => {
  const intl = useIntl()

  return (
    <TeamsOverviewBodyTableLineTemplate fontSize="sm" color="black.600" fontWeight={500}>
      <Tooltip label={intl.formatMessage(messages.firstColumnTooltip)} placement="bottom-start">
        <GridItem>{intl.formatMessage(messages.firstColumnTitle)}</GridItem>
      </Tooltip>
      <Tooltip label={intl.formatMessage(messages.secondColumnTooltip)} placement="bottom-start">
        <GridItem>{intl.formatMessage(messages.secondColumnTitle)}</GridItem>
      </Tooltip>
      <Tooltip label={intl.formatMessage(messages.thirdColumnTooltip)} placement="bottom-start">
        <GridItem>{intl.formatMessage(messages.thirdColumnTitle)}</GridItem>
      </Tooltip>
    </TeamsOverviewBodyTableLineTemplate>
  )
}

export default TeamsOverviewBodyTableHead
