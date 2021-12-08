import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { SelectMenu } from 'src/components/Base'

import { KeyResultOwnerSelectMenu } from 'src/components/KeyResult/OwnerSelectMenu/wrapper'
import meAtom from 'src/state/recoil/user/me'

import { TeamSearch } from '../Search/wrapper'
import { TeamSelect } from '../Select/wrapper'

interface SaveTeamModalProperties {
  isOpen: boolean
  onClose: () => void
}

export const SaveTeamModal = ({ isOpen, onClose }: SaveTeamModalProperties) => {
  const currentUserID = useRecoilValue(meAtom)
  const [owner, setOwner] = useState(currentUserID)
  const [teamId, setTeamId] = useState<string>()

  const handleChangeTeam = (teamId: string | string[]) => {
    if (Array.isArray(teamId)) throw new Error('Cannot parse string array')
    setTeamId(teamId)
    onClose()
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
            <Input />
          </FormControl>

          <FormControl>
            <FormLabel>Descrição:</FormLabel>
            <Textarea placeholder="Em uma frase, qual é a missão deste time?" />
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

          {/* <FormControl> */}
          {/* <FormLabel>Este time está dentro de:</FormLabel> */}
          <SelectMenu onChange={handleChangeTeam}>
              <TeamSelect onSelect={(teamId) => () => setTeamId(teamId)} />
          </SelectMenu>
          {/* <TeamSelectMenu value={team} placement="top" onChange={setTeam} /> */}
          {/* </FormControl> */}
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
            >
              Salvar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
