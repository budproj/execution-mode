import { Stack, AccordionIcon, Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from '../../../../../../lib/chakra/build-skeleton-min-size'
import { PercentageProgressIncreaseTag } from '../../../../Base'
import TooltipWithDelay from '../../../../Base/TooltipWithDelay'
import { Objective } from '../../../types'
import { ObjectiveAccordionMenu } from '../../Menu/wrapper'

import messages from './messages'

interface ViewModeProperties {
  isLoaded?: boolean
  objective?: Partial<Objective>
  teamID?: string
  isDisabled?: boolean
}

export const ViewMode = ({ objective, isLoaded, teamID, isDisabled }: ViewModeProperties) => {
  const intl = useIntl()

  return (
    <Stack direction="row" flexGrow={1} alignItems="center">
      <Skeleton
        isLoaded={isLoaded}
        {...buildSkeletonMinSize(isLoaded ?? true, 300, 24, {
          loadedWidth: 'auto',
        })}
      >
        <Heading as="h4" fontSize="xl" fontWeight={400} textAlign="left" color="black.900">
          {objective?.title}
        </Heading>
      </Skeleton>

      <Stack
        justifyContent="flex-end"
        direction="row"
        alignItems="center"
        spacing="8"
        flexGrow={1}
        flexShrink={0}
      >
        {!isDisabled && (
          <Stack spacing={4} direction="row" alignItems="stretch">
            <TooltipWithDelay
              label={intl.formatMessage(messages.progressTagTooltip)}
              placement="top"
            >
              <Skeleton
                isLoaded={isLoaded}
                borderRadius={4}
                w={isLoaded ? 'auto' : 140}
                h={isLoaded ? 'auto' : 33}
              >
                <PercentageProgressIncreaseTag
                  forcePositiveSignal
                  bg="black.100"
                  h="full"
                  value={objective?.delta?.progress}
                  prefix={intl.formatMessage(messages.progressTagLabel)}
                />
              </Skeleton>
            </TooltipWithDelay>

            <ObjectiveAccordionMenu
              teamID={teamID}
              objectiveID={objective?.id}
              isLoaded={isLoaded}
            />
          </Stack>
        )}

        <AccordionIcon />
      </Stack>
    </Stack>
  )
}
