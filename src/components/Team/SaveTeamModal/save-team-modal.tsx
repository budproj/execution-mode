import { useMutation } from '@apollo/client/react/hooks'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { SelectMenu } from 'src/components/Base'
import { KeyResultOwnerSelectMenu } from 'src/components/KeyResult/OwnerSelectMenu/wrapper'
import { isReloadNecessary } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'

import { TeamSelect } from '../Select/wrapper'
import { TEAM_GENDER } from '../constants'

import queries from './queries.gql'

interface SaveTeamModalProperties {
  isOpen: boolean
  onClose: () => void
}

interface AddSubteamMutationResult {
  createTeam: {
    name: string
    description: string
    gender: TEAM_GENDER
    ownerID: string
    parentID: string
  }
}

export const SaveTeamModal = ({ isOpen, onClose }: SaveTeamModalProperties) => {
  const currentUserID = useRecoilValue(meAtom)
  const [owner, setOwner] = useState(currentUserID)
  const [teamId, setTeamId] = useState<string>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const setShouldUpdateObjectives = useSetRecoilState(isReloadNecessary)

  const [addSubteam, { loading }] = useMutation<AddSubteamMutationResult>(queries.CREATE_TEAM, {
    onCompleted: () => {
      setShouldUpdateObjectives(true)
      onClose()
    },
  })

  const handleChangeTeam = (teamId: string | string[]) => {
    if (Array.isArray(teamId)) throw new Error('Cannot parse string array')
    setTeamId(teamId)
  }

  const executeAddTeam = () => {
    console.log('alguma coisa', {
      variables: {
        name,
        description,
        gender: TEAM_GENDER.NEUTRAL,
        ownerID: owner,
        parentID: teamId,
      },
    })
    void addSubteam({
      variables: {
        name,
        description,
        gender: TEAM_GENDER.NEUTRAL,
        ownerID: owner,
        parentID: teamId,
      },
    })
  }

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="33em">
        <ModalHeader p="1.85em 2.3em 0 2.3em">
          <Heading as="h1" fontSize="3xl" color="black.900" fontWeight="400">
            Adicionar subtime
          </Heading>
        </ModalHeader>

        <ModalBody pl="2.3em" pr="2.3em">
          <FormControl>
            <FormLabel>Nome do time:</FormLabel>
            <Input onChange={(event) => setName(event.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Descrição:</FormLabel>
            <Textarea
              placeholder="Em uma frase, qual é a missão deste time?"
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Líder:</FormLabel>
            <KeyResultOwnerSelectMenu
              value={owner}
              avatarSubtitleType="role"
              placement="top"
              onChange={setOwner}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Este time está dentro de:</FormLabel>
            <SelectMenu value={teamId} onChange={handleChangeTeam}>
              <TeamSelect onSelect={(teamId) => () => handleChangeTeam(teamId)} />
            </SelectMenu>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" justifyContent="space-around">
            <Button
              pr="5em"
              pl="5em"
              variant="outline"
              colorScheme="brand"
              size="lg"
              fontSize="md"
              fontWeight="400"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              pr="5em"
              pl="5em"
              variant="solid"
              colorScheme="brand"
              size="lg"
              fontSize="md"
              fontWeight="400"
              isLoading={loading}
              onClick={executeAddTeam}
            >
              Salvar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
