import { Stack } from '@chakra-ui/layout'
import { AccordionIcon, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { AccordionEntryMode } from '../../../../../state/recoil/objective/accordion'
import { PercentageProgressIncreaseTag } from '../../../../Base'
import TooltipWithDelay from '../../../../Base/TooltipWithDelay'
import { Objective } from '../../../types'
import { ObjectiveAccordionMenu } from '../../Menu/wrapper'

import messages from './messages'

interface ActionBoxModeProperties {
  accordionIndex: number
  isLoaded?: boolean
  objective?: Partial<Objective>
  teamID?: string
  accordionID?: string
}

interface ActionBoxProperties extends ActionBoxModeProperties {
  mode?: AccordionEntryMode
}

const ViewModeActionBox = ({
  isLoaded,
  objective,
  accordionID,
  accordionIndex,
  teamID,
}: ActionBoxModeProperties) => {
  const intl = useIntl()

  return (
    <Stack justifyContent="flex-end" direction="row" alignItems="center" spacing="8">
      <Stack spacing={4} direction="row" alignItems="stretch">
        <TooltipWithDelay label={intl.formatMessage(messages.progressTagTooltip)} placement="top">
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
              value={objective?.progressIncreaseSinceLastWeek}
              prefix={intl.formatMessage(messages.progressTagLabel)}
            />
          </Skeleton>
        </TooltipWithDelay>

        <ObjectiveAccordionMenu
          teamID={teamID}
          objectiveID={objective?.id}
          isLoaded={isLoaded}
          accordionID={accordionID}
          accordionIndex={accordionIndex}
        />
      </Stack>

      <AccordionIcon />
    </Stack>
  )
}

const EditModeActionBox = (properties: ActionBoxModeProperties) => <p>Edit mode</p>

export const ActionBox = ({ mode, ...rest }: ActionBoxProperties) =>
  mode === AccordionEntryMode.EDIT ? (
    <EditModeActionBox {...rest} />
  ) : (
    <ViewModeActionBox {...rest} />
  )
