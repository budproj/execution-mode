import { Flex, Box, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import StackIcon from 'src/components/Icon/Stack'
import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import messages from './messages'
import { KeyResultListBodyColumnObjectiveProperties } from './objective'

const KeyResultListBodyColumnObjectiveSkeleton = (
  _properties: KeyResultListBodyColumnObjectiveProperties,
): ReactElement => {
  const intl = useIntl()

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={4} alignItems="center">
        <Skeleton borderRadius={10}>
          <Box borderRadius={10} p={4} bg="gray.50">
            <StackIcon
              desc={intl.formatMessage(messages.stackIconDesc)}
              fill="gray.200"
              w={8}
              h={8}
            />
          </Box>
        </Skeleton>

        <Box>
          <Skeleton w={36} h={6} />
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnObjectiveSkeleton
