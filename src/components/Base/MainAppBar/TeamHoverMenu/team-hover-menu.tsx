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
  setIsHovered: any
}

interface GetOtherTeamsQuery {
  teams: GraphQLConnection<Team>
}

const TeamHoverMenu = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  setIsHovered,
}: TeamMenuProperties) => {
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
      opacity={isHovered ? 1 : 0}
      backgroundColor="rgba(0,0,0,0.7)"
      height="100%"
      position="absolute"
      top="78px"
      width="100%"
      transition="0.4s all ease-out"
      pointerEvents={isHovered ? 'auto' : 'none'}
    >
      <Flex
        borderBottomLeftRadius="10px"
        borderBottomRightRadius="10px"
        transition="0.4s all ease-out"
        position="absolute"
        width="100%"
        bg="gray.50"
        paddingX="72px"
        zIndex={1000}
        pointerEvents={isHovered ? 'auto' : 'none'}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <Grid
          position="relative"
          width="100%"
          mb="24px"
          mt="34px"
          gridTemplateColumns="2fr 1fr"
          gridGap={10}
        >
          <Box>
            <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
              {intl.formatMessage(messages.teamMenuTitle)}
            </Heading>
            <Divider />
            <TeamCardList
              isFromHoverMenu
              parentWidth={1080}
              teamFilter=""
              setIsHovered={() => setIsHovered(false)}
            />
          </Box>
          <Box>
            <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
              {intl.formatMessage(messages.otherTeamsTitle)}
            </Heading>
            <Divider />
            <Grid overflow="visible" mt="24px" gridGap={10} gridTemplateColumns="repeat(2, 1fr)">
              {teams.map((team) => {
                return (
                  <GridItem
                    key={team.id}
                    width="fit-content"
                    _hover={{ opacity: 0.7 }}
                    transition="0.4s"
                    color="gray.500"
                    cursor="pointer"
                    opacity={isHovered ? 1 : 0}
                    onClick={() => setIsHovered(false)}
                  >
                    <IntlLink href={`/explore/${team.id}`} as={`/explore/${team.id}`}>
                      {team.name}
                    </IntlLink>
                  </GridItem>
                )
              })}
              <GridItem
                width="fit-content"
                _hover={{ opacity: 0.7 }}
                transition="0.4s"
                color="brand.500"
                cursor="pointer"
                opacity={isHovered ? 1 : 0}
                onClick={() => setIsHovered(false)}
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
        </Grid>
      </Flex>
    </Flex>
  )
}

export default TeamHoverMenu
