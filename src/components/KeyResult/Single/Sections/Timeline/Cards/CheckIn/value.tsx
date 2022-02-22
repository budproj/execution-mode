import { Flex, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import ArrowRightLongIcon from 'src/components/Icon/ArrowRightLong'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import { selectMaskBasedOnFormat } from '../../../../../NumberMasks/selectors'
import { KEY_RESULT_FORMAT } from '../../../../../constants'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInProgressProperties {
  value?: number
  confidence?: KeyResultCheckIn['confidence']
  parent?: KeyResultCheckIn | null
  format?: KEY_RESULT_FORMAT
  initialValue?: number
}

export const KeyResultSectionTimelineCardCheckInValue = ({
  value,
  confidence,
  parent,
  format,
  initialValue,
}: KeyResultSectionTimelineCardCheckInProgressProperties) => {
  const intl = useIntl()
  const [confidenceTag, setConfidence] = useConfidenceTag(confidence)

  const isLoaded = Boolean(value) || value === 0
  const isSameAsParent = isLoaded && value === parent?.value
  const NumberMask = selectMaskBasedOnFormat(format)

  // <StatNumber fontSize="2xl" color={confidenceTag.color.primary} lineHeight={1}>

  useEffect(() => {
    if (confidence) setConfidence(confidence)
  }, [confidence, setConfidence])

  return (
    <Flex alignItems="center" gridGap={4}>
      <Skeleton isLoaded={isLoaded} fontSize="3xl" color="gray.300" lineHeight={1} fontWeight={500}>
        <NumberMask value={parent?.value ?? initialValue} displayType="text" />
      </Skeleton>
      {!isSameAsParent && (
        <>
          <ArrowRightLongIcon
            fill={isLoaded ? confidenceTag.color.primary : 'black.100'}
            desc={intl.formatMessage(messages.arrowRightDesc)}
            w={5}
            h="auto"
          />
          <Skeleton
            isLoaded={isLoaded}
            fontSize="3xl"
            color={confidenceTag.color.primary}
            lineHeight={1}
            fontWeight={500}
          >
            <NumberMask value={value} displayType="text" />
          </Skeleton>
        </>
      )}
    </Flex>
  )
}
