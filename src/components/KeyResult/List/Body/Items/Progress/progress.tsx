import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import Slider from 'components/Base/Slider'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/List/Body/Items/Status'
import { KeyResult } from 'components/KeyResult/types'
import updateRemoteKeyResult from 'state/actions/key-results/update-remote-key-result'
import { keyResultConfidence } from 'state/recoil/key-results/single/confidence'
import { keyResultProgress } from 'state/recoil/key-results/single/progress'

export interface ProgressProperties {
  id?: KeyResult['id']
}

const Progress = ({ id }: ProgressProperties): ReactElement => {
  const intl = useIntl()

  const confidence = useRecoilValue<KeyResult['confidence'] | undefined>(keyResultConfidence(id))
  const [progress, setProgress] = useRecoilState<KeyResult['progress'] | undefined>(
    keyResultProgress(id),
  )

  const { color } = selectStatusTagBasedInConfidence(confidence?.value ?? 0)

  const handleSliderUpdate = (newValue?: number | number[]): void => {
    if (newValue) setProgress(newValue as number)
  }

  const handleSliderUpdateEnd = async (newValue: number | number[]): Promise<void> => {
    if (!id) return

    const newKeyResultPartial = { progress: newValue as number }
    await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  const isProgressLoaded = Boolean(progress === 0 || progress)

  return (
    <BaseGridItem>
      <Flex alignItems="center" justifyContent="center" gridGap={5}>
        <Box w="70%">
          <Skeleton isLoaded={isProgressLoaded}>
            <Slider
              value={progress}
              trackColor={color}
              onChange={handleSliderUpdate}
              onChangeEnd={handleSliderUpdateEnd}
            />
          </Skeleton>
        </Box>

        <SkeletonText noOfLines={1} minW="10%" isLoaded={isProgressLoaded}>
          <Text color="gray.300">
            {intl.formatNumber((progress ?? 0) / 100, { style: 'percent' })}
          </Text>
        </SkeletonText>
      </Flex>
    </BaseGridItem>
  )
}

export default Progress
