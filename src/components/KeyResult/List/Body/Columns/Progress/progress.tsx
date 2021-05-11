import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import ProgressSlider from 'src/components/KeyResult/ProgressSlider'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import {
  keyResultCheckInIsSlidding,
  keyResultCheckInProgressDraft,
} from 'src/state/recoil/key-result/check-in'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import { keyResultAtomFamily } from '../../../../../../state/recoil/key-result'
import { GraphQLEffect } from '../../../../../types'

import messages from './messages'

export interface KeyResultListBodyColumnProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  isDisabled?: boolean
  isActive?: boolean
}

const KeyResultListBodyColumnProgress = ({
  id,
  isDisabled,
  isActive,
}: KeyResultListBodyColumnProgressProperties): ReactElement => {
  const draftValue = useRecoilValue(keyResultCheckInProgressDraft(id))
  const keyResult = useRecoilValue(keyResultAtomFamily(id))
  const isSlidding = useRecoilValue(keyResultCheckInIsSlidding(id))
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const [confidenceTag, setConfidence] = useConfidenceTag(latestKeyResultCheckIn?.confidence)
  const intl = useIntl()

  const ProgressMask = selectMaskBasedOnFormat(keyResult?.format)
  const isKeyResultLoaded = Boolean(id)
  const canCreateCheckIn = keyResult?.keyResultCheckIns?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    if (latestKeyResultCheckIn?.confidence) setConfidence(latestKeyResultCheckIn?.confidence)
  }, [latestKeyResultCheckIn?.confidence, setConfidence])

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Flex flexDir="column">
        <Box w="100%">
          <Skeleton isLoaded={isKeyResultLoaded}>
            <ProgressSlider
              id={id}
              isDisabled={isDisabled ?? !canCreateCheckIn}
              isActive={isActive}
            />
          </Skeleton>
        </Box>

        <Flex>
          <Skeleton
            noOfLines={1}
            minW="40%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
          >
            <ProgressMask
              value={draftValue}
              displayType="text"
              renderText={(value) => (
                <TooltipWithDelay
                  label={intl.formatMessage(messages.leftSideValueTooltip)}
                  placement="bottom-start"
                >
                  <Text color={isSlidding ? confidenceTag.color.primary : 'gray.300'} cursor="help">
                    {value}
                  </Text>
                </TooltipWithDelay>
              )}
            />
          </Skeleton>

          <Box flexGrow={1} />

          <Skeleton
            noOfLines={1}
            minW="40%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
          >
            <ProgressMask
              value={keyResult?.goal}
              displayType="text"
              renderText={(value) => (
                <TooltipWithDelay
                  label={intl.formatMessage(messages.rightSideValueTooltip)}
                  placement="bottom-end"
                >
                  <Text color="gray.300" textAlign="right" cursor="help">
                    {value}
                  </Text>
                </TooltipWithDelay>
              )}
            />
          </Skeleton>
        </Flex>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnProgress
