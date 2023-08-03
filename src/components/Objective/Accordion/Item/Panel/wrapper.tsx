/* eslint-disable react/no-children-prop */
import { AccordionPanel, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

  const formattedDescriptionText = useMemo(() => {
    return String(description)?.replace(/^(\s*)(-|\*)\s(.*)$/gm, '$1• $3\n')
  }, [description])

  return (
    <AccordionPanel p={0} maxWidth="100%">
      {isExpanded && (
        <>
          {formattedDescriptionText && !isEditing && (
            <Text fontSize="14px" fontWeight={400} color="new-gray.700" pt={6} pb={3} pl={2}>
              <ReactMarkdown
                children={formattedDescriptionText}
                skipHtml
                remarkPlugins={[remarkGfm]}
              />
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
        </>
      )}
    </AccordionPanel>
  )
}
