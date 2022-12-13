import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface HeadUsersTeamListProperties {
  type?: string
}

export const HeadUsersTeamList = ({ type }: HeadUsersTeamListProperties) => {
  const intl = useIntl()

  return (
    <Grid
      padding="15px 0 15px 0"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      flex="1"
      borderTop="1px solid #D9E2F6"
    >
      <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
        {intl.formatMessage(messages.userColumn)}
      </GridItem>
      <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
        {intl.formatMessage(messages.teamColumn)}
      </GridItem>
      <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
        {intl.formatMessage(messages.modalTitleColumn, { type })}
      </GridItem>
      <GridItem justifySelf="center" color="new-gray.800" fontWeight="500" fontSize="12px">
        {intl.formatMessage(messages.lastRoutineColumn)}
      </GridItem>
    </Grid>
  )
}
