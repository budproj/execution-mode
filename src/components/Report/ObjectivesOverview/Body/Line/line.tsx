import { Flex, Heading, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { PercentageProgressIncreaseTag, SliderWithFilledTrack } from 'src/components/Base'
import { Objective } from 'src/components/Objective/types'
import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { BORDER_COLOR, BORDER_WIDTH } from 'src/components/Report/Overview/constants'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

export interface ObjectivesOverviewBodyLineProperties {
  orderTagNumber: number
  id?: Objective['id']
  enableBorder?: boolean
}

const ObjectivesOverviewBodyLine = ({
  id,
  orderTagNumber,
  enableBorder,
}: ObjectivesOverviewBodyLineProperties) => {
  const intl = useIntl()
  const objective = useRecoilValue(objectiveAtomFamily(id))
  const [confidenceTag, setConfidence] = useConfidenceTag(objective?.status?.confidence)
  const isLoaded = Boolean(objective)

  useEffect(() => {
    if (typeof objective?.status?.confidence !== 'undefined')
      setConfidence(objective.status.confidence)
  }, [objective, setConfidence])

  return (
    <OverviewBodyBox
      borderBottomWidth={enableBorder ? BORDER_WIDTH : 0}
      borderColor={BORDER_COLOR}
      gridGap={8}
      pb={10}
    >
      <Flex alignItems="center" gridGap={6}>
        <Text fontSize="xl">{intl.formatNumber(orderTagNumber, { minimumIntegerDigits: 2 })}.</Text>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 400, 24)}>
          <Heading fontSize="xl" as="h3" fontWeight={400}>
            {objective?.title}
          </Heading>
        </Skeleton>

        <Flex flexGrow={1} justifyContent="flex-end">
          <PercentageProgressIncreaseTag value={objective?.progressIncreaseSinceLastWeek} />
        </Flex>
      </Flex>

      <SliderWithFilledTrack
        trackThickness={3}
        value={objective?.status?.progress}
        trackColor={confidenceTag.color.primary}
      />
    </OverviewBodyBox>
  )
}

ObjectivesOverviewBodyLine.defaultProps = {
  enableBorder: true,
}

export default ObjectivesOverviewBodyLine
