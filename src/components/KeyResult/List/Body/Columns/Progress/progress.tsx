import { Flex, Box, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import ProgressSlider from 'src/components/KeyResult/ProgressSlider'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInIsSlidding,
  keyResultCheckInProgressDraft,
} from 'src/state/recoil/key-result/check-in'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface KeyResultListBodyColumnProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  canChange?: boolean
}

const formatSelector = buildPartialSelector<KeyResult['format']>('format')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')

const KeyResultListBodyColumnProgress = ({
  id,
  canChange,
}: KeyResultListBodyColumnProgressProperties): ReactElement => {
  const draftValue = useRecoilValue(keyResultCheckInProgressDraft(id))
  const format = useRecoilValue(formatSelector(id))
  const goal = useRecoilValue(goalSelector(id))
  const isSlidding = useRecoilValue(keyResultCheckInIsSlidding(id))
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const [confidenceTag, setConfidence] = useConfidenceTag(latestKeyResultCheckIn?.confidence)

  const ProgressMask = selectMaskBasedOnFormat(format)
  const isKeyResultLoaded = Boolean(id)

  useEffect(() => {
    if (latestKeyResultCheckIn?.confidence) setConfidence(latestKeyResultCheckIn?.confidence)
  }, [latestKeyResultCheckIn?.confidence, setConfidence])

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Flex flexDir="column">
        <Box w="100%">
          <Skeleton
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressSlider id={id} canChange={canChange} />
          </Skeleton>
        </Box>

        <Flex>
          <Skeleton
            noOfLines={1}
            minW="40%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
            flexGrow={1}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressMask
              value={draftValue}
              displayType="text"
              renderText={(value) => (
                <Text color={isSlidding ? confidenceTag.color.primary : 'gray.300'}>{value}</Text>
              )}
            />
          </Skeleton>

          <Skeleton
            noOfLines={1}
            minW="40%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <ProgressMask
              value={goal}
              displayType="text"
              renderText={(value) => (
                <Text color="gray.300" textAlign="right">
                  {value}
                </Text>
              )}
            />
          </Skeleton>
        </Flex>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnProgress
