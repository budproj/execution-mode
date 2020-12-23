import { Flex, Box, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import ProgressSlider from 'src/components/KeyResult/ProgressSlider'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdateDraftValue as draftValueAtom } from 'src/state/recoil/key-result/progress-update'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultListBodyColumnProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  canChange?: boolean
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const KeyResultListBodyColumnProgress = ({
  id,
  canChange,
}: KeyResultListBodyColumnProgressProperties): ReactElement => {
  const draftValue = useRecoilValue(draftValueAtom(id))
  const format = useRecoilValue(formatSelector(id))
  const ProgressMask = selectMaskBasedOnFormat(format)

  const isKeyResultLoaded = Boolean(id)

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Flex flexDir="column" alignItems="flex-end">
        <Box w="100%">
          <Skeleton
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressSlider id={id} canChange={canChange} />
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
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnProgress
