import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import remove from 'lodash/remove'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import Slider from 'components/Base/Slider'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { selectStatusTagBasedInConfidence } from 'components/KeyResult/View/Body/Columns/Status'
import { KeyResult, ProgressReport } from 'components/KeyResult/types'
import {
  selectKeyResultConfidenceReports,
  selectKeyResultProgressReports,
} from 'state/recoil/key-result'

export interface ProgressProperties {
  id?: KeyResult['id']
}

const Progress = ({ id }: ProgressProperties): ReactElement => {
  const progressReportsSelector = selectKeyResultProgressReports(id)
  const confidenceReportsSelector = selectKeyResultConfidenceReports(id)

  const [progressReports, setProgressReports] = useRecoilState(progressReportsSelector)
  const confidenceReports = useRecoilValue(confidenceReportsSelector)

  const latestProgressReport = progressReports?.[0]
  const latestConfidenceReport = confidenceReports?.[0]
  const intl = useIntl()

  const currentProgress = latestProgressReport?.valueNew ?? 0
  const currentConfidence = latestConfidenceReport?.valueNew
  const { color } = selectStatusTagBasedInConfidence(currentConfidence ?? 0)

  const handleSliderUpdate = (valueNew?: number): void => {
    if (valueNew) {
      const previousReport = progressReports?.[0]
      const newLocalReport = {
        valueNew,
        valuePrevious: previousReport?.valueNew,
      }

      setProgressReports(remove([newLocalReport as ProgressReport, ...(progressReports ?? [])]))
    }
  }

  const handleSliderUpdateEnd = async (newValue: number | number[]): Promise<number | number[]> => {
    if (newValue === currentProgress) return currentProgress

    const newKeyResultPartial = { progress: newValue as number, id }
    console.log('NAH')
    return newValue
    // Await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  const isKeyResultLoaded = Boolean(id)

  return (
    <BaseGridItem>
      <Flex alignItems="center" justifyContent="center" gridGap={5}>
        <Box w="70%">
          <Skeleton
            isLoaded={isKeyResultLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <Slider
              value={currentProgress}
              trackColor={color}
              onChange={handleSliderUpdate}
              onChangeEnd={handleSliderUpdateEnd}
            />
          </Skeleton>
        </Box>

        <SkeletonText
          noOfLines={1}
          minW="10%"
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <Text color="gray.300">
            {intl.formatNumber((currentProgress ?? 0) / 100, { style: 'percent' })}
          </Text>
        </SkeletonText>
      </Flex>
    </BaseGridItem>
  )
}

export default Progress
