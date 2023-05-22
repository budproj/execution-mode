import { AccordionPanel, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import ConfirmPublishingDialog from 'src/components/Objective/OKRsPublishingFlow/ConfirmPublishingDialog/confirm-publishing-dialog'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { ObjectiveContext, ObjectiveViewMode } from 'src/state/recoil/objective/context'

import { ObjectiveKeyResults } from './key-results'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
  teamID?: Team['id']
  isDisabled?: boolean
  description?: string
  isDraft?: boolean
  context?: ObjectiveContext
}

export const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
  isDisabled,
  teamID,
  description,
  isDraft,
  context,
}: ObjectiveAccordionPanelProperties) => {
  const isEditing = context?.mode === ObjectiveViewMode.EDIT
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <AccordionPanel p={0} maxWidth="100%">
        {isExpanded && (
          <>
            {description && !isEditing && (
              <Text fontSize="14px" fontWeight={400} color="new-gray.700" pt={6} pb={3} pl={2}>
                {description}
              </Text>
            )}
            <ObjectiveKeyResults
              isDraft={isDraft}
              objectiveID={objectiveID}
              mode={context?.mode}
              context={context}
              isDisabled={isDisabled}
              teamID={teamID}
            />
            <Button onClick={() => setIsDialogOpen(true)}>Publicar OKR</Button>
          </>
        )}
      </AccordionPanel>
      <ConfirmPublishingDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  )
}
