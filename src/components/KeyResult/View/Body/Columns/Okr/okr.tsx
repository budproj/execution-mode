import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import StackIcon from 'components/Icons/Stack'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'components/KeyResult/types'
import { selectKeyResultObjective } from 'state/recoil/key-result'

import messages from './messages'

export interface OKRProperties {
  id?: KeyResult['id']
}

const Okr = ({ id }: OKRProperties): ReactElement => {
  const objectiveSelector = selectKeyResultObjective(id)
  const objective = useRecoilValue(objectiveSelector)
  const intl = useIntl()

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
