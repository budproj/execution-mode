import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Slider from 'components/Base/Slider'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/View/Body/Columns/Status'
import { KeyResult } from 'components/KeyResult/types'

export interface ProgressProperties {
  keyResult?: KeyResult
}

const Progress = ({ keyResult }: ProgressProperties): ReactElement => {
  const latestProgressReport = keyResult?.progressReports?.[0]
  const latestConfidenceReport = keyResult?.confidenceReports?.[0]
  const intl = useIntl()

  const currentProgress = latestProgressReport?.valueNew ?? 0
  const currentConfidence = latestConfidenceReport?.valueNew
  const { color } = selectStatusTagBasedInConfidence(currentConfidence ?? 0)

  const handleSliderUpdate = (newValue?: number | number[]): void => {
    if (newValue) console.log(newValue, keyResult)
  }

  const handleSliderUpdateEnd = async (newValue: number | number[]): Promise<void> => {
    const newKeyResultPartial = { progress: newValue as number }
    console.log(newKeyResultPartial)
    console.log(keyResult)
    // Await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  const isKeyResultLoaded = Boolean(keyResult)

  return (
    <BaseGridItem>
      <Flex alignItems="center" justifyContent="center" gridGap={5}>
        <Box w="70%">
          <Skeleton isLoaded={isKeyResultLoaded}>
            <Slider
              value={currentProgress}
              trackColor={color}
              onChange={handleSliderUpdate}
              onChangeEnd={handleSliderUpdateEnd}
            />
          </Skeleton>
        </Box>

        <SkeletonText noOfLines={1} minW="10%" isLoaded={isKeyResultLoaded}>
          <Text color="gray.300">
            {intl.formatNumber((currentProgress ?? 0) / 100, { style: 'percent' })}
          </Text>
        </SkeletonText>
      </Flex>
    </BaseGridItem>
  )
}

export default Progress
