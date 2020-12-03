import { Flex, Box, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import ProgressSlider from 'src/components/KeyResult/ProgressSlider'
import BaseGridItem from 'src/components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdateDraftValue as draftValueAtom } from 'src/state/recoil/key-result/progress-update'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface ProgressProperties {
  id?: KeyResult['id']
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const Progress = ({ id }: ProgressProperties): ReactElement => {
  const draftValue = useRecoilValue(draftValueAtom(id))
  const format = useRecoilValue(formatSelector(id))
  const ProgressMask = selectMaskBasedOnFormat(format)

  const isKeyResultLoaded = Boolean(id)

  return (
    <BaseGridItem preventLineClick>
      <Flex flexDir="column" alignItems="flex-end">
        <Box w="100%">
          <Skeleton
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressSlider id={id} />
          </Skeleton>
        </Box>

        <Skeleton
          noOfLines={1}
          minW="40%"
          mt={isKeyResultLoaded ? 'inherit' : '4px'}
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <ProgressMask
            value={draftValue}
            displayType="text"
            renderText={(value) => (
              <Text color="gray.300" textAlign="right">
                {value}
              </Text>
            )}
          />
        </Skeleton>
      </Flex>
    </BaseGridItem>
  )
}

export default Progress
