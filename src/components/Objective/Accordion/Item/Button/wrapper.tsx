import { AccordionButton, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { Objective } from 'src/components/Objective/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'
import { objectiveContext, ObjectiveMode } from 'src/state/recoil/objective/context'

import { RadioProgress } from '../../../../Base/RadioProgress/wrapper'

import { EditMode } from './edit-mode'
import messages from './messages'
import { ViewMode } from './view-mode'

export interface ObjectiveAccordionButtonProperties {
  objective?: Partial<Objective>
  teamID?: string
  confidenceTag?: ConfidenceTag
  isLoaded?: boolean
  isDisabled?: boolean
}

export const ObjectiveAccordionButton = ({
  objective,
  teamID,
  confidenceTag,
  isLoaded,
  isDisabled,
}: ObjectiveAccordionButtonProperties) => {
  const context = useRecoilValue(objectiveContext(objective?.id))
  const intl = useIntl()

  const roundedProgress = Math.round(objective?.status?.progress ?? 0)

  return (
    <AccordionButton p={0} gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
      <TooltipWithDelay label={intl.formatMessage(messages.progressTooltip)} placement="top-end">
        <Box>
          <RadioProgress
            progress={roundedProgress}
            isLoaded={isLoaded}
            size={14}
            color={confidenceTag?.color.variants.sharp.primary}
            trackColor={confidenceTag?.color.variants.sharp.light}
            isDisabled={isDisabled}
          />
        </Box>
      </TooltipWithDelay>

      {context.mode === ObjectiveMode.EDIT && !isDisabled ? (
        <EditMode objective={objective} />
      ) : (
        <ViewMode
          isLoaded={isLoaded}
          teamID={teamID}
          objective={objective}
          isDisabled={isDisabled}
        />
      )}
    </AccordionButton>
  )
}
