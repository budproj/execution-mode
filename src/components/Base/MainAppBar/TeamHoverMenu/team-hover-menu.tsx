import { useQuery } from '@apollo/client'
import { Box, Divider, Flex, Grid, Heading, GridItem, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { CircleArrowRight } from 'src/components/Icon'
import TeamCardList from 'src/components/Team/CardList'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import IntlLink from '../../IntlLink'

import messages from './messages'
import queries from './queries.gql'

interface TeamMenuProperties {
  onMouseLeave: any
  onMouseEnter: any
  isHovered: any
}

interface GetOtherTeamsQuery {
  teams: GraphQLConnection<Team>
}

const TeamHoverMenu = ({ onMouseEnter, onMouseLeave, isHovered }: TeamMenuProperties) => {
  const intl = useIntl()

  const { data } = useQuery<GetOtherTeamsQuery>(queries.GET_OTHER_TEAMS)
  const [teams, setEdges] = useConnectionEdges<Team>()

  useEffect(() => {
    if (data) {
      setEdges(data.teams.edges)
    }
  }, [data, setEdges])

  return (
    <Flex
      transition="0.5s"
      visibility={isHovered ? 'visible' : 'hidden'}
      top="78px"
      position="absolute"
      width="100%"
      bg="new-gray.400"
      paddingX="72px"
      zIndex={1000}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <Box position="relative" width="100%" mb="24px" mt="34px" overflow="hidden">
        <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
          {intl.formatMessage(messages.teamMenuTitle)}
        </Heading>
        <Divider />
        <Grid
          visibility={isHovered ? 'visible' : 'hidden'}
          mt="24px"
          mb="24px"
          gridGap={10}
          gridTemplateColumns="repeat(3, 1fr)"
        >
          <TeamCardList isFromHoverMenu parentWidth={1080} teamFilter="" />
        </Grid>
        <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
          {intl.formatMessage(messages.otherTeamsTitle)}
        </Heading>
        <Divider />
        <Grid mt="24px" gridGap={10} gridTemplateColumns="repeat(5, 1fr)">
          {teams.map((team) => {
            return (
              <GridItem
                key={team.id}
                width="fit-content"
                _hover={{ opacity: 0.7 }}
                transition="0.5s"
                color="gray.500"
                cursor="pointer"
                visibility={isHovered ? 'visible' : 'hidden'}
              >
                <IntlLink href={`/explore/${team.id}`}>{team.name}</IntlLink>
              </GridItem>
            )
          })}
          <GridItem
            width="fit-content"
            _hover={{ opacity: 0.7 }}
            transition="0.5s"
            color="brand.500"
            cursor="pointer"
            visibility={isHovered ? 'visible' : 'hidden'}
          >
            <IntlLink href="/explore">
              <Flex alignItems="center">
                <Text marginRight="5px">Ver Todos</Text>
                <CircleArrowRight desc={intl.formatMessage(messages.arrowIconDescription)} />
              </Flex>
            </IntlLink>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  )
}

export default TeamHoverMenu
