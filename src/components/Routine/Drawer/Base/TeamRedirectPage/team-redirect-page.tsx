import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import { ArrowRight } from 'src/components/Icon'
import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab/'
import { isOpenRoutineRedirectTeamPage } from 'src/state/recoil/routine/opened-routine-redirect-team-drawer'
import { routineAnswersReturnedData } from 'src/state/recoil/routine/user-teams'

import RoutineDrawer from '../drawer'

import messages from './messages'

const TeamRedirectPage = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenRoutineRedirectTeamPage)
  const userTeams = useRecoilValue(routineAnswersReturnedData)
  const intl = useIntl()
  const routineTabName = useRoutineTab()
  const queryClient = useQueryClient()

  const redirectToTeam = (teamId: string) => {
    setIsOpen(false)
    queryClient.invalidateQueries({ queryKey: [`routines:getAnswer:${teamId}`] })
  }

  return (
    <RoutineDrawer isOpen={isOpen} formSize={1} onClose={() => setIsOpen(false)}>
      <Box>
        <Text color="new-gray.700" fontSize={18} whiteSpace="pre-line">
          {intl.formatMessage(messages.callToActionPageDescription, {
            title: (
              <strong style={{ color: '#364059', fontSize: '21px' }}>
                {intl.formatMessage(messages.title)}
              </strong>
            ),
          })}
        </Text>

        <Flex gap={6}>
          {userTeams?.map((team) => (
            <IntlLink key={team.id} href={`/explore/${team?.id}?activeTab=${routineTabName}`}>
              <Button
                mt={12}
                fontSize={18}
                fontWeight="medium"
                color="#525F7F"
                p={3}
                outline="2px solid #B5C0DB"
                rightIcon={
                  <ArrowRight
                    fill="current"
                    fontSize="11px"
                    desc={intl.formatMessage(messages.title)}
                  />
                }
                onClick={() => redirectToTeam(team.id)}
              >
                {team.name}
              </Button>
            </IntlLink>
          ))}
        </Flex>
      </Box>
    </RoutineDrawer>
  )
}

export default TeamRedirectPage
