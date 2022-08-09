import { useMutation } from '@apollo/client/react/hooks'
import {
  Box,
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
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'

import { TeamSelect } from '../Select/wrapper'
import { TEAM_GENDER } from '../constants'
import { Team } from '../types'

import messages from './messages'
import queries from './queries.gql'

interface SaveTeamModalProperties {
  teamId?: string
  isOpen: boolean
  isEditing?: boolean
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

const getTeamIdFromRouter = (router: NextRouter) => {
  if (Array.isArray(router.query.id)) throw new Error('Cannot parse string array')
  return router.query.id
}

export const SaveTeamModal = ({ teamId, isOpen, onClose, isEditing }: SaveTeamModalProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const preloadedTeamId = teamId ?? getTeamIdFromRouter(router)

  const currentUserID = useRecoilValue(meAtom)
  const team = useRecoilValue(teamAtomFamily(preloadedTeamId))
  const setShouldUpdateObjectives = useSetRecoilState(isReloadNecessary)
  const [childTeams, setChildTeamEdges] = useConnectionEdges<Team>()

  const [owner, setOwner] = useState(currentUserID)
  const [parentTeam, setParentTeam] = useState<Partial<Team>>({})
  const [name, setName] = useState(isEditing ? team?.name : '')
  const [description, setDescription] = useState(isEditing ? team?.description : '')

  const childTeamsIds = childTeams.map((childTeam) => childTeam.id)

  useEffect(() => {
    if (team) {
      setChildTeamEdges(team.teams?.edges)
      setName(team?.name)
      setDescription(team?.description)

      if (team?.parent) {
        setParentTeam(team.parent)
      }

      if (team?.ownerId && isEditing) {
        setOwner(team.ownerId)
      }
    }
  }, [team, setChildTeamEdges, isEditing])

  const [saveOrUpdateTeam, { loading }] = useMutation<AddSubteamMutationResult>(
    isEditing ? queries.UPDATE_TEAM : queries.CREATE_TEAM,
    {
      onCompleted: () => {
        setShouldUpdateObjectives(true)
        onClose()
      },
    },
  )

  const handleChangeParentTeam = (id: string | string[], name?: string | string[]) => {
    if (Array.isArray(id) || Array.isArray(name)) throw new Error('Cannot parse string array')
    setParentTeam({ id, name })
  }

  const executeSaveOrUpdateTeam = () => {
    if (isEditing) {
      void saveOrUpdateTeam({
        variables: {
          name: name === '' ? undefined : name,
          description: description === '' ? undefined : description,
          ownerId: owner,
          id: team?.id,
          parentId: parentTeam?.id,
        },
      })
      return
    }

    void saveOrUpdateTeam({
      variables: {
        name,
        description,
        gender: TEAM_GENDER.NEUTRAL,
        ownerID: owner,
        parentID: team?.id,
      },
    })
  }

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="33em">
        <ModalHeader p="1.85em 2.3em 0 2.3em">
          <Heading as="h1" fontSize="3xl" color="black.900" fontWeight="400">
            {intl.formatMessage(isEditing ? messages.editTeamHeader : messages.addSubteamHeader)}
          </Heading>
          {!isEditing && (
            <Text color="new-gray.900" fontWeight="400" fontSize="lg">
              {intl.formatMessage(messages.addSubteamHeaderDescription, { teamname: team?.name })}
            </Text>
          )}
        </ModalHeader>

        <ModalBody pl="2.3em" pr="2.3em">
          <Stack spacing={6}>
            <FormControl>
              <FormLabel>{intl.formatMessage(messages.teamNameLabel)}</FormLabel>
              <Input
                defaultValue={isEditing ? team?.name : undefined}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{intl.formatMessage(messages.descriptionLabel)}</FormLabel>
              <Textarea
                placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
                defaultValue={isEditing ? team?.description : undefined}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{intl.formatMessage(messages.leaderLabel)}</FormLabel>
              <KeyResultOwnerSelectMenu
                value={owner}
                avatarSubtitleType="role"
                placement="bottom"
                isLazy={false}
                onChange={setOwner}
              />
            </FormControl>
            {!team?.isCompany && isEditing ? (
              <FormControl>
                <FormLabel>{intl.formatMessage(messages.parentTeam)}</FormLabel>
                <SelectMenu
                  matchWidth
                  isLazy
                  closeOnSelect
                  placeholder={<Text color="new-gray.800">{parentTeam.name}</Text>}
                  value={parentTeam?.id ?? ''}
                  onChange={handleChangeParentTeam}
                >
                  <Box p={4} maxH="full" h="full">
                    <TeamSelect
                      teamIDsBlacklist={team?.id ? [team?.id, ...childTeamsIds] : []}
                      onSelect={(id, name) => () => handleChangeParentTeam(id, name)}
                    />
                  </Box>
                </SelectMenu>
              </FormControl>
            ) : undefined}
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
              onClick={executeSaveOrUpdateTeam}
            >
              {intl.formatMessage(messages.save)}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
