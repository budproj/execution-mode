import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import StackIcon from 'src/components/Icons/Stack'
import BaseGridItem from 'src/components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface OKRProperties {
  id?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const Okr = ({ id }: OKRProperties): ReactElement => {
  const objective = useRecoilValue(objectiveSelector(id))
  const intl = useIntl()

  const isObjectiveLoaded = Boolean(objective)

  return (
    <BaseGridItem>
      <Flex gridGap={4} alignItems="center">
        <Skeleton
          borderRadius={10}
          isLoaded={isObjectiveLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
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
          <Skeleton
            minH="20px"
            minW="150px"
            isLoaded={isObjectiveLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <Text color="gray.500">{objective?.title}</Text>
          </Skeleton>
        </Box>
      </Flex>
    </BaseGridItem>
  )
}

export default Okr
