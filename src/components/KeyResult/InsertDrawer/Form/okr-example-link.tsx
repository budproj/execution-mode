import { Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import ArrowRightLongIcon from 'src/components/Icon/ArrowRightLong'

import messages from './messages'

export const OkrExampleLink = () => {
  const intl = useIntl()

  return (
    <Link isExternal href="https://exemplos-de-okrs.webflow.io/">
      <Flex alignItems="center">
        {intl.formatMessage(messages.okrExampleLink)}
        <ArrowRightLongIcon
          ml="1"
          fill="#6F6EFF"
          desc="tete"
          border="1.2px solid #6F6EFF"
          borderRadius="50%"
          padding="3px"
          height="15px"
          width="15px"
        />
      </Flex>
    </Link>
  )
}
