import { Grid, GridItem, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { GRID_TEMPLATE_COLUMN, BORDER_COLOR } from 'src/components/KeyResult/View/constants'

import messages from './messages'

const KeyResultHead = (): ReactElement => {
  const intl = useIntl()

  return (
    <Grid
      templateColumns={GRID_TEMPLATE_COLUMN}
      pb={4}
      color="gray.400"
      fontWeight={500}
      borderBottom={1}
      borderColor={BORDER_COLOR}
      borderStyle="solid"
    >
      <GridItem>
        <Text>{intl.formatMessage(messages.tableHeadTitle)}</Text>
      </GridItem>

      <GridItem>
        <Text pl={6}>{intl.formatMessage(messages.tableHeadOKR)}</Text>
      </GridItem>

      <GridItem>
        <Text pl={6}>{intl.formatMessage(messages.tableHeadStatus)}</Text>
      </GridItem>

      <GridItem>
        <Text pl={6}>{intl.formatMessage(messages.tableHeadProgress)}</Text>
      </GridItem>

      <GridItem>
        <Text pl={6}>{intl.formatMessage(messages.tableHeadDate)}</Text>
      </GridItem>

      <GridItem>
        <Text>{intl.formatMessage(messages.tableHeadOwner)}</Text>
      </GridItem>
    </Grid>
  )
}

export default KeyResultHead
