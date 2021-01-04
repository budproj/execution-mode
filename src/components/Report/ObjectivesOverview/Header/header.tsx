import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import OverviewHeaderBox from 'src/components/Report/Overview/OverviewHeaderBox'

import messages from './messages'

const ObjectivesOverviewHeader = () => {
  const intl = useIntl()

  return (
    <OverviewHeaderBox>
      <Heading as="h2" fontSize="xl">
        {intl.formatMessage(messages.title)}
      </Heading>
    </OverviewHeaderBox>
  )
}

export default ObjectivesOverviewHeader
