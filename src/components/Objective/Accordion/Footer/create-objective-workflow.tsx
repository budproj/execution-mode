import { useMutation } from '@apollo/client'
import { Button, HStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import queries from 'src/components/Objective/Accordion/Item/Button/queries.gql'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'
import {
  objectiveContext,
  ObjectiveViewMode,
  setObjectiveToMode,
} from 'src/state/recoil/objective/context'

import { Objective, ObjectiveMode } from '../../types'

import messages from './messages'

interface UpdateObjectiveMutationResult {
  updateObjective: Partial<Objective>
}

interface CreateObjectiveWorkflow {
  objectiveID?: Objective['id']
  handleNextStep?: () => void
}

const CreateObjectiveWorkflow = ({ objectiveID, handleNextStep }: CreateObjectiveWorkflow) => {
  const toast = useToast()
  const intl = useIntl()
  const context = useRecoilValue(objectiveContext(objectiveID))
  const setObjectiveIDToEditdMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.EDIT))
  const setObjectiveToViewMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.VIEW))

  const [loadObjectiveOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [updateObjective] = useMutation<UpdateObjectiveMutationResult>(
    queries.UPDATE_DRAFT_OBJECTIVE,
    {
      onCompleted: (data) => {
        loadObjectiveOnRecoil(data.updateObjective)
        toast({
          title: intl.formatMessage(messages.objectiveCreatedToastTitle),
          status: 'success',
        })
      },
    },
  )

  const handleSubmit = async () => {
    await updateObjective({
      variables: {
        objectiveID,
        mode: ObjectiveMode.DRAFT,
      },
    })
  }

  const handleObjectiveToDraftMode = async () => {
    await handleSubmit()
    setObjectiveToViewMode(objectiveID)
  }

  const handleNextWorkflowStep = () => {
    if (handleNextStep && context.mode === ObjectiveViewMode.EDIT) handleNextStep()

    if (context.mode === ObjectiveViewMode.FILLED) handleObjectiveToDraftMode()
  }

  return (
    <HStack justifyContent="flex-end" w="100%">
      {context.mode === ObjectiveViewMode.FILLED && (
        <Button
          p={4}
          bg="new-gray.300"
          borderRadius={5}
          fontSize={14}
          fontWeight={500}
          color="new-gray.800"
          _hover={{ backgroundColor: 'new-gray.400' }}
          onClick={() => setObjectiveIDToEditdMode(objectiveID)}
        >
          {intl.formatMessage(messages.goBackButton)}
        </Button>
      )}
      <Button
        p={4}
        bg="brand.500"
        borderRadius={5}
        fontSize={14}
        fontWeight={500}
        color="brand.50"
        _hover={{ backgroundColor: 'brand.400' }}
        onClick={handleNextWorkflowStep}
      >
        {intl.formatMessage(messages.nextStepButton, { mode: context.mode })}
      </Button>
    </HStack>
  )
}

export default CreateObjectiveWorkflow
