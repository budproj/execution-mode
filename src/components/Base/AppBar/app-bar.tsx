import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Logotype from 'components/Base/Logotype'
import NamedAvatar from 'components/User/NamedAvatar'

import AppBarMenuItem from './MenuItem'
import messages from './messages'

const AppBar = (): ReactElement => {
  const intl = useIntl()

  return (
    <Grid
      templateColumns="1fr 6fr 3fr"
      px={6}
      py={4}
      borderBottom={1}
      borderColor="gray.200"
      borderStyle="solid"
      alignItems="center"
    >
      <GridItem>
        <Logotype />
      </GridItem>

      <GridItem>
        <Flex gridGap={20}>
          <AppBarMenuItem label={intl.formatMessage(messages.dashboard)} href="/" />
          <AppBarMenuItem label={intl.formatMessage(messages.keyResults)} href="/key-results" />
          <AppBarMenuItem label={intl.formatMessage(messages.item)} href="/" />
          <AppBarMenuItem label={intl.formatMessage(messages.item)} href="/" />
        </Flex>
      </GridItem>

      <GridItem alignSelf="end">
        <NamedAvatar />
      </GridItem>
    </Grid>
  )
}

export default AppBar
