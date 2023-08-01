import { Flex, Text, Skeleton, Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { IntlLink } from 'src/components/Base'
import { CircularProgress } from 'src/components/Base/CircularProgress'
import { DraftPen } from 'src/components/Icon'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { myselfAtom } from '../../../../../state/recoil/shared/atoms'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

export interface KeyResultSectionObjectiveProperties {
  keyResultID?: KeyResult['id']
  isKeyResultPage?: boolean
  isDraft?: boolean
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')
const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const KeyResultSectionObjective = ({
  keyResultID,
  isKeyResultPage,
  isDraft,
}: KeyResultSectionObjectiveProperties) => {
  const intl = useIntl()
  const objective = useRecoilValue(objectiveSelector(keyResultID))

  const owner = useRecoilValue(ownerSelector(keyResultID))
  const myself = useRecoilValue(myselfAtom)

  const progress = objective?.status?.progress ?? 0
  const confidence = objective?.status?.confidence ?? 0
  const isObjectiveLoaded = Boolean(objective)

  const tooltipLabel = objective?.teamId
    ? intl.formatMessage(messages.teamOkrTooltipMessage, {
        team: objective?.team?.name,
      })
    : intl.formatMessage(messages.individualOkrTooltipMessage, {
        user: owner?.firstName,
      })

  const redirectToClick = objective?.teamId
    ? `/explore/${objective.teamId}`
    : owner?.id === myself?.id
    ? '/my-things'
    : `/profile/${owner?.id ?? ''}`

  return (
    <Flex gridGap={2} direction="column">
      <KeyResultSectionHeading>{intl.formatMessage(messages.label)}</KeyResultSectionHeading>

      <Flex gridGap={3} alignItems="center">
        {isDraft ? (
          <DraftPen desc="draft pen" />
        ) : (
          <CircularProgress
            confidence={confidence}
            progress={progress}
            isLoaded={isObjectiveLoaded}
          />
        )}

        {isKeyResultPage ? (
          <Box color="new-gray.900">
            <Skeleton
              isLoaded={isObjectiveLoaded}
              {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
            >
              <Text fontSize={14} fontWeight={500}>
                {objective?.title}
              </Text>
            </Skeleton>
          </Box>
        ) : (
          <Tooltip label={tooltipLabel} placement="top-start" maxW="lg">
            <Box
              color="new-gray.900"
              cursor="pointer"
              _hover={{
                color: 'new-gray.700',
              }}
            >
              <Skeleton
                isLoaded={isObjectiveLoaded}
                {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
              >
                <IntlLink href={redirectToClick}>
                  <Text fontSize={14} fontWeight={500}>
                    {objective?.title}
                  </Text>
                </IntlLink>
              </Skeleton>
            </Box>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionObjective
