import { Button, HStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  objectiveContext,
  ObjectiveMode,
  setObjectiveToMode,
} from 'src/state/recoil/objective/context'

import { Objective } from '../../types'

import messages from './messages'

interface CreateObjectiveWorkflow {
  objectiveId?: Objective['id']
  handleNextStep?: () => void
}

const CreateObjectiveWorkflow = ({ objectiveId, handleNextStep }: CreateObjectiveWorkflow) => {
  const toast = useToast()
  const intl = useIntl()
  const context = useRecoilValue(objectiveContext(objectiveId))
  const setObjectiveIDToEditdMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.EDIT))
  const setObjectiveToViewMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.VIEW))

  const handleObjectiveToDraftMode = () => {
    setObjectiveToViewMode(objectiveId)
    toast({
      title: 'Agora seu objeto está em modo rascunho!',
      status: 'success',
    })
  }

  const handleNextWorkflowStep = () => {
    if (handleNextStep && context.mode === ObjectiveMode.EDIT) handleNextStep()

    if (context.mode === ObjectiveMode.FILLED) handleObjectiveToDraftMode()
  }

  return (
    <HStack justifyContent="flex-end" w="100%">
      {context.mode === ObjectiveMode.FILLED && (
        <Button
          p={4}
          bg="brand.500"
          borderRadius={5}
          fontSize={14}
          fontWeight={500}
          color="brand.50"
          _hover={{ backgroundColor: 'brand.400' }}
          onClick={() => setObjectiveIDToEditdMode(objectiveId)}
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
        {intl.formatMessage(messages.nextStepButton)}
      </Button>
    </HStack>
  )
}

export default CreateObjectiveWorkflow
