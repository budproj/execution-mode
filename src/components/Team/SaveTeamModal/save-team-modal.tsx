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
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { SelectMenu } from 'src/components/Base'
import { KeyResultOwnerSelectMenu } from 'src/components/KeyResult/OwnerSelectMenu/wrapper'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { isEditTeamModalOpenAtom, isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'
import meAtom from 'src/state/recoil/user/me'

import { TeamSelect } from '../Select/wrapper'
import { TEAM_GENDER } from '../constants'
import { Team } from '../types'

import messages from './messages'
import queries from './queries.gql'

interface AddSubteamMutationResult {
  createTeam: {
    name: string
    description: string
    gender: TEAM_GENDER
    ownerID: string
    parentID: string
  }
}

interface SaveTeamModalProperties {
  teamId?: Team['id']
}

const getTeamIdFromRouter = (router: NextRouter) => {
  if (Array.isArray(router.query.id)) throw new Error('Cannot parse string array')
  return router.query.id
}

export const SaveTeamModal = ({ teamId }: SaveTeamModalProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const [{ isModalOpen, isEditingTeamId }, setIsEditTeamModalOpen] =
    useRecoilState(isEditTeamModalOpenAtom)

  const preloadedTeamId = teamId ?? isEditingTeamId ?? getTeamIdFromRouter(router)

  const currentUserID = useRecoilValue(meAtom)
  const team = useRecoilValue(teamAtomFamily(preloadedTeamId))
  const setShouldUpdateObjectives = useSetRecoilState(isReloadNecessary)
  const [childTeams, setChildTeamEdges] = useConnectionEdges<Team>()

  const [owner, setOwner] = useState('')
  const [parentTeam, setParentTeam] = useState<Partial<Team>>({})
  const [name, setName] = useState(isEditingTeamId ? team?.name : '')
  const [description, setDescription] = useState(isEditingTeamId ? team?.description : '')

  const childTeamsIds = childTeams.map((childTeam) => childTeam.id)

  const handleCloseModal = useCallback(() => {
    setIsEditTeamModalOpen({ isModalOpen: false, isEditingTeamId: undefined })
  }, [setIsEditTeamModalOpen])

  useEffect(() => {
    if (team) {
      setChildTeamEdges(team.teams?.edges)
      setName(team?.name)
      setDescription(team?.description)

      if (team?.parent) {
        setParentTeam(team.parent)
      }

      const ownerID = isEditingTeamId ? team?.ownerId ?? '' : currentUserID ?? ''
      setOwner(ownerID)
    }
  }, [team, setChildTeamEdges, isEditingTeamId, currentUserID])

  const [saveOrUpdateTeam, { loading }] = useMutation<AddSubteamMutationResult>(
    isEditingTeamId ? queries.UPDATE_TEAM : queries.CREATE_TEAM,
    {
      onCompleted: () => {
        setShouldUpdateObjectives(true)
        handleCloseModal()
      },
    },
  )

  const handleChangeParentTeam = (id: string | string[], name?: string | string[]) => {
    if (Array.isArray(id) || Array.isArray(name)) throw new Error('Cannot parse string array')
    setParentTeam({ id, name })
  }

  const executeSaveOrUpdateTeam = () => {
    if (isEditingTeamId) {
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
    <Modal isOpen={isModalOpen} size="md" onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent maxW="33em">
        <ModalHeader p="1.85em 2.3em 0 2.3em">
          <Heading as="h1" fontSize="3xl" color="black.900" fontWeight="400">
            {intl.formatMessage(
              isEditingTeamId ? messages.editTeamHeader : messages.addSubteamHeader,
            )}
          </Heading>
          {!isEditingTeamId && (
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
                defaultValue={isEditingTeamId ? team?.name : undefined}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{intl.formatMessage(messages.descriptionLabel)}</FormLabel>
              <Textarea
                placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
                defaultValue={isEditingTeamId ? team?.description : undefined}
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
            {!team?.isCompany && isEditingTeamId ? (
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
              onClick={handleCloseModal}
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
