import { GridItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'

import messages from './messages'

const TeamsOverviewBodyTableHead = () => {
  const intl = useIntl()

  return (
    <TeamsOverviewBodyTableLineTemplate fontSize="sm" color="black.600" fontWeight={500}>
      <GridItem>{intl.formatMessage(messages.firstColumnTitle)}</GridItem>
      <GridItem>{intl.formatMessage(messages.secondColumnTitle)}</GridItem>
      <GridItem>{intl.formatMessage(messages.thirdColumnTitle)}</GridItem>
    </TeamsOverviewBodyTableLineTemplate>
  )
}

export default TeamsOverviewBodyTableHead
