import { Flex, Skeleton, StatNumber } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

import ArrowRightLongIcon from 'src/components/Icon/ArrowRightLong'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInProgressProperties {
  progress?: KeyResultCheckIn['progress']
  confidence?: KeyResultCheckIn['confidence']
  parent?: KeyResultCheckIn | null
}

const normalizeProgress = (progress?: number) => (progress ? progress / 100 : 0)

const KeyResultSectionTimelineCardCheckInProgress = ({
  progress,
  confidence,
  parent,
}: KeyResultSectionTimelineCardCheckInProgressProperties) => {
  const intl = useIntl()
  const [confidenceTag, setConfidence] = useConfidenceTag(confidence)

  const normalizedParentProgress = normalizeProgress(parent?.progress)
  const normalizedProgress = normalizeProgress(progress)
  const isLoaded = Boolean(progress) || progress === 0
  const isSameAsParent = isLoaded && normalizedParentProgress === normalizedProgress

  const progressNumberFormat: FormatNumberOptions = {
    style: 'percent',
  }

  useEffect(() => {
    if (confidence) setConfidence(confidence)
  }, [confidence, setConfidence])

  return (
    <Flex alignItems="center" gridGap={4}>
      <Skeleton isLoaded={isLoaded}>
        <StatNumber fontSize="2xl" color="gray.200" lineHeight={1}>
          {intl.formatNumber(normalizedParentProgress, progressNumberFormat)}
        </StatNumber>
      </Skeleton>
      {!isSameAsParent && (
        <>
          <ArrowRightLongIcon
            fill={isLoaded ? confidenceTag.color.primary : 'gray.100'}
            desc={intl.formatMessage(messages.arrowRightDesc)}
            w={5}
            h="auto"
          />
          <Skeleton isLoaded={isLoaded}>
            <StatNumber fontSize="2xl" color={confidenceTag.color.primary} lineHeight={1}>
              {intl.formatNumber(normalizedProgress, progressNumberFormat)}
            </StatNumber>
          </Skeleton>
        </>
      )}
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInProgress
