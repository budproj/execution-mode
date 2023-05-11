import { useMutation } from '@apollo/client'
import { Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Button } from 'src/components/Base/Button'
import { Objective, ObjectiveMode } from 'src/components/Objective/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import queries from './queries.gql'

export interface DraftButtonsProperties {
  objectiveID?: string
  isObjectiveWithKeyResults?: boolean
}

interface UpdateObjectiveMutationResult {
  updateObjective: Partial<Objective>
}

export const DraftButtons = ({
  objectiveID,
  isObjectiveWithKeyResults = false,
}: DraftButtonsProperties) => {
  const toast = useToast()
  const intl = useIntl()

  const [loadObjectiveOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [updateObjective] = useMutation<UpdateObjectiveMutationResult>(
    queries.UPDATE_DRAFT_OBJECTIVE,
    {
      onCompleted: (data) => {
        loadObjectiveOnRecoil(data.updateObjective)
        toast({
          title: 'Objetivo publicado!',
          status: 'success',
        })
      },
    },
  )

  const handleSubmit = async () => {
    await updateObjective({
      variables: {
        objectiveID,
        mode: ObjectiveMode.PUBLISHED,
      },
    })
  }

  return (
    <Flex
      width="100%"
      alignSelf="flex-end"
      alignItems="flex-end"
      justifyContent="flex-end"
      paddingTop="24px"
      borderTop={isObjectiveWithKeyResults ? undefined : '1px'}
      borderColor="new-gray.400"
    >
      <Button
        label="Criar resultado-chave"
        marginRight="10px"
        padding="10px"
        bg="brand.500"
        _hover={{ background: 'brand.400', color: 'black.50' }}
        color="white"
      />
      <Button
        isDisabled={!isObjectiveWithKeyResults}
        label="Publicar"
        padding="10px"
        bg="green.500"
        _hover={{ background: 'green.400', color: 'black.50' }}
        color="white"
        onClick={handleSubmit}
      />
    </Flex>
  )
}
