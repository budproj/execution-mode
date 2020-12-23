import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const KeyResultListBodyStaticEmptyState = () => {
  const intl = useIntl()

  return (
    <Flex alignItems="center" gridGap={8} direction="column" h="200px">
      <Box>
        <Image
          src="/images/bud-team-at-work.png"
          alt={intl.formatMessage(messages.teamAtWorkImageAlt)}
        />
      </Box>
      <Text color="gray.300">{intl.formatMessage(messages.teamAtWorkImageLabel)}</Text>
    </Flex>
  )
}

export default KeyResultListBodyStaticEmptyState
