import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import StackIcon from 'components/Icons/Stack'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultObjective } from 'state/recoil/key-results/single/objective'

import messages from './messages'

export interface OKRProperties {
  id?: KeyResult['id']
}

const Okr = ({ id }: OKRProperties): ReactElement => {
  const intl = useIntl()
  const objective = useRecoilValue<KeyResult['objective'] | undefined>(keyResultObjective(id))

  const isObjectiveLoaded = Boolean(objective)

  return (
    <BaseGridItem>
      <Flex gridGap={4} alignItems="center">
        <Skeleton borderRadius={10} isLoaded={isObjectiveLoaded}>
          <Box borderRadius={10} p={4} bg="gray.50">
            <StackIcon
              desc={intl.formatMessage(messages.stackIconDesc)}
              fill="gray.300"
              w={8}
              h={8}
            />
          </Box>
        </Skeleton>

        <Box>
          <Skeleton minH="20px" minW="150px" isLoaded={isObjectiveLoaded}>
            <Text color="gray.500">{objective?.title}</Text>
          </Skeleton>
        </Box>
      </Flex>
    </BaseGridItem>
  )
}

export default Okr
