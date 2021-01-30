import { Flex, Image } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const Logotype = (): ReactElement => {
  const intl = useIntl()

  return (
    <Flex height="50px" direction="column" justifyContent="center">
      <Image
        src="/bud-logotype.svg"
        alt={intl.formatMessage(messages.alt)}
        title={intl.formatMessage(messages.title)}
      />
    </Flex>
  )
}

export default Logotype
