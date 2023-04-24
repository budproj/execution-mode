import { AccordionButton, Box } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { DraftPen } from 'src/components/Icon'
import { Objective, ObjectiveMode } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { ConfidenceTag } from 'src/state/hooks/useConfidenceTag/hook'
import { ObjectiveContext, ObjectiveViewMode } from 'src/state/recoil/objective/context'

import { RadioProgress } from '../../../../Base/RadioProgress/wrapper'

import { EditMode, EditModeValues } from './edit-mode'
import messages from './messages'
import { ViewMode } from './view-mode'

export interface ObjectiveAccordionButtonProperties {
  objective?: Partial<Objective>
  userID?: User['id']
  teamID?: Team['id']
  confidenceTag?: ConfidenceTag
  isLoaded?: boolean
  isDisabled?: boolean
  context?: ObjectiveContext
  forwardedRef?: React.Ref<FormikProps<EditModeValues>>
}

export const ObjectiveAccordionButton = ({
  objective,
  userID,
  teamID,
  confidenceTag,
  isLoaded,
  isDisabled,
  context,
  forwardedRef,
}: ObjectiveAccordionButtonProperties) => {
  const intl = useIntl()

  const roundedProgress = Math.round(objective?.status?.progress ?? 0)

  const isDraft = objective?.mode === ObjectiveMode.DRAFT

  return (
    <AccordionButton maxWidth="100%" p={0} gridGap={4} _hover={{}} _focus={{ boxShadow: 'none' }}>
      {context?.mode === ObjectiveViewMode.EDIT && !isDisabled ? (
        <EditMode forwardedRef={forwardedRef} objective={objective} />
      ) : (
        <>
          {isDraft ? (
            <DraftPen width="40px" height="40px" desc="" />
          ) : (
            <TooltipWithDelay
              label={intl.formatMessage(messages.progressTooltip)}
              placement="top-end"
            >
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
          )}
          <ViewMode
            isLoaded={isLoaded}
            teamID={teamID}
            userID={userID}
            objective={objective}
            isDisabled={isDisabled}
          />
        </>
      )}
    </AccordionButton>
  )
}
