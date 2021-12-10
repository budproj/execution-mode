import { useMutation } from '@apollo/client/react/hooks'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { NextRouter, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { SelectMenu } from 'src/components/Base'
import { KeyResultOwnerSelectMenu } from 'src/components/KeyResult/OwnerSelectMenu/wrapper'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'

import { TeamSelect } from '../Select/wrapper'
import { TEAM_GENDER } from '../constants'

import messages from './messages'
import queries from './queries.gql'

interface SaveTeamModalProperties {
  teamId?: string
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

interface TeamState {
  id?: string
  name?: string
}

const getTeamIdFromRouter = (router: NextRouter) => {
  if (Array.isArray(router.query.id)) throw new Error('Cannot parse string array')
  return router.query.id
}

export const SaveTeamModal = ({ teamId, isOpen, onClose }: SaveTeamModalProperties) => {
  const router = useRouter()
  const preloadedTeamId = teamId ?? getTeamIdFromRouter(router)

  const intl = useIntl()

  const currentUserID = useRecoilValue(meAtom)
  const preloadedTeam = useRecoilValue(teamAtomFamily(preloadedTeamId))
  const [owner, setOwner] = useState(currentUserID)
  const [team, setTeam] = useState<TeamState>(preloadedTeam ?? {})
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (preloadedTeam) setTeam(preloadedTeam)
  }, [preloadedTeam])

  useEffect(() => {
    if (currentUserID) setOwner(currentUserID)
  }, [currentUserID])

  const setShouldUpdateObjectives = useSetRecoilState(isReloadNecessary)

  const [addSubteam, { loading }] = useMutation<AddSubteamMutationResult>(queries.CREATE_TEAM, {
    onCompleted: () => {
      setShouldUpdateObjectives(true)
      onClose()
    },
  })

  const handleChangeTeam = (id: string | string[], name?: string | string[]) => {
    if (Array.isArray(id) || Array.isArray(name)) throw new Error('Cannot parse string array')
    setTeam({ id, name })
  }

  const executeAddTeam = () => {
    console.log('alguma coisa', {
      variables: {
        name,
        description,
        gender: TEAM_GENDER.NEUTRAL,
        ownerID: owner,
        parentID: team.id,
      },
    })
    void addSubteam({
      variables: {
        name,
        description,
        gender: TEAM_GENDER.NEUTRAL,
        ownerID: owner,
        parentID: team.id,
      },
    })
  }

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="33em">
        <ModalHeader p="1.85em 2.3em 0 2.3em">
          <Heading as="h1" fontSize="3xl" color="black.900" fontWeight="400">
            {intl.formatMessage(messages.addSubteamHeader)}
          </Heading>
          <Text color="new-gray.900" fontWeight="400" fontSize="lg">
            {intl.formatMessage(messages.addSubteamHeaderDescription, { teamname: team.name })}
          </Text>
        </ModalHeader>

        <ModalBody pl="2.3em" pr="2.3em">
          <Stack spacing={6}>
            <FormControl>
              <FormLabel>{intl.formatMessage(messages.teamNameLabel)}</FormLabel>
              <Input onChange={(event) => setName(event.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>{intl.formatMessage(messages.descriptionLabel)}</FormLabel>
              <Textarea
                placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{intl.formatMessage(messages.leaderLabel)}</FormLabel>
              <KeyResultOwnerSelectMenu
                value={owner}
                avatarSubtitleType="role"
                placement="top"
                onChange={setOwner}
              />
            </FormControl>

            {false && (
              <FormControl>
                <FormLabel>{intl.formatMessage(messages.parentTeam)}</FormLabel>
                <SelectMenu
                  matchWidth
                  isLazy
                  placeholder={<MenuItem color="new-gray.800">{team.name}</MenuItem>}
                  value={team.name}
                  onChange={handleChangeTeam}
                >
                  <Box p={4} maxH="full" h="full">
                    <TeamSelect onSelect={(id, name) => () => handleChangeTeam(id, name)} />
                  </Box>
                </SelectMenu>
              </FormControl>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter pb="2.3em">
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
              {intl.formatMessage(messages.cancel)}
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
              {intl.formatMessage(messages.save)}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
