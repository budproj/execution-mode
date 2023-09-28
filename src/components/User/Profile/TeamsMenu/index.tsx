import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Flex,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { StarIcon, StarIconOutlined } from 'src/components/Icon'
import ChevronDownIcon from 'src/components/Icon/ChevronDown'
import { GetTeamNameQuery } from 'src/components/Page/Team/types'
import { Team } from 'src/components/Team/types'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'
import meAtom from 'src/state/recoil/user/me'

import messages from '../messages'

import queries from './queries.gql'

interface TeamsMenuProfileProperties extends FlexProps {
  teams?: Array<Partial<Team>>
  mainTeamId?: Team['id']
  setMainTeam: any
}

interface UpdateTeamMutationProperties {
  updateMainTeam: {
    preferences: string
  }
}

export const TeamsMenuProfile = ({
  teams,
  mainTeamId,
  setMainTeam,
  ...rest
}: TeamsMenuProfileProperties) => {
  const teamsToMap = teams?.filter((team) => team.id !== mainTeamId)
  const myID = useRecoilValue(meAtom)
  const intl = useIntl()

  const { data: mainTeamRequest } = useQuery<GetTeamNameQuery>(queries.GET_TEAM_WITH_ID, {
    variables: { teamId: mainTeamId },
  })

  const [selectedDashboardTeam, setSelectedDashboardTeam] =
    useRecoilState(selectedDashboardTeamAtom)

  const isSelectedTeamTheMainTeam = selectedDashboardTeam?.id === mainTeamId

  const [updateTeam] = useMutation<UpdateTeamMutationProperties>(queries.UPDATE_USER_MAIN_TEAM, {
    onCompleted: (data) => {
      const parsedPreferences: { main_team: string } = JSON.parse(data.updateMainTeam.preferences)

      setMainTeam(parsedPreferences.main_team)
    },
  })

  const handleUpdateTeam = async () => {
    await updateTeam({
      variables: {
        userID: myID,
        main_team_id: selectedDashboardTeam?.id,
      },
    })
  }

  useEffect(() => {
    if (mainTeamRequest) {
      setSelectedDashboardTeam(mainTeamRequest.team)
    }
  }, [mainTeamRequest, setSelectedDashboardTeam])

  return (
    <Flex paddingTop={10} px={20} {...rest} justifyContent="space-between">
      <Menu>
        <MenuButton
          color="white"
          border="1px solid white"
          as={Button}
          rightIcon={<ChevronDownIcon desc="" color="white" fill="white" stroke="white" />}
          _hover={{ color: 'white' }}
          display="flex"
        >
          {selectedDashboardTeam?.name}
          {selectedDashboardTeam?.id === mainTeamId && (
            <StarIcon
              desc=""
              stroke="black"
              withCircle={false}
              fill="red"
              width={9}
              marginBottom={1}
            />
          )}
        </MenuButton>
        <MenuList>
          <MenuItem
            _hover={{ background: 'white' }}
            py={2}
            px={2}
            onClick={() => setSelectedDashboardTeam(mainTeamRequest?.team)}
          >
            <Flex
              _hover={{ bg: 'brand.100' }}
              transition="0.3s"
              width="100%"
              borderRadius="3px"
              paddingLeft="12px"
              alignItems="center"
              height="26px"
            >
              {mainTeamRequest?.team.name}
              <StarIcon desc="" stroke="black" withCircle={false} fill="red" width={9} />
            </Flex>
          </MenuItem>
          {teamsToMap?.map((team) => {
            return (
              <MenuItem
                key={team.id}
                _hover={{ background: 'none' }}
                py={2}
                onClick={() => setSelectedDashboardTeam(team)}
              >
                <Flex
                  _hover={{ bg: 'brand.100' }}
                  transition="0.3s"
                  width="100%"
                  borderRadius="3px"
                  paddingLeft="6px"
                  height="26px"
                  alignItems="center"
                >
                  {team.name}
                </Flex>
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
      <Flex
        marginLeft="auto"
        alignItems="center"
        justifyContent="center"
        as={Button}
        onClick={handleUpdateTeam}
      >
        {isSelectedTeamTheMainTeam ? (
          <>
            <Text color="white" fontWeight={500} marginRight={1}>
              {intl.formatMessage(messages.mainTeam)}
            </Text>

            <StarIcon desc="" withCircle={false} height={10} />
          </>
        ) : (
          <>
            <Text color="white" fontWeight={500} marginRight={1}>
              {intl.formatMessage(messages.makeMainTeam)}
            </Text>

            <StarIconOutlined desc="" height={7} _hover={{ fill: '#F1BF25' }} />
          </>
        )}
      </Flex>
    </Flex>
  )
}
