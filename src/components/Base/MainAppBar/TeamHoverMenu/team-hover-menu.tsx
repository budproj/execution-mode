import { useQuery } from '@apollo/client'
import { Box, Divider, Flex, Grid, Heading, GridItem, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
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

const StyledFlex = styled(Flex)`
  // animation: fade 1s linear;

  // @keyframes fade {
  //   0%,
  //   100% {
  //     opacity: 0;
  //   }
  //   50% {
  //     opacity: 1;
  //   }
  // }
`

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
    <StyledFlex
      transition="0.5s all ease-out"
      opacity={isHovered ? 1 : 0}
      position="absolute"
      top="78px"
      width="100%"
      bg="new-gray.400"
      paddingX="72px"
      zIndex={1000}
      pointerEvents={isHovered ? 'auto' : 'none'}
      transform={isHovered ? 'translateY(0)' : 'translateY(-30px)'}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <Box position="relative" width="100%" mb="24px" mt="34px" overflow="hidden">
        <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
          {intl.formatMessage(messages.teamMenuTitle)}
        </Heading>
        <Divider />
        <Grid
          opacity={isHovered ? 1 : 0}
          mt="24px"
          mb="24px"
          gridGap={10}
          gridTemplateColumns="repeat(3, 1fr)"
          onClick={() => setIsHovered(false)}
        >
          <TeamCardList isFromHoverMenu parentWidth={1080} teamFilter="" />
        </Grid>
        <Heading fontWeight={500} fontSize="24px" color="gray.500" mb="10px">
          {intl.formatMessage(messages.otherTeamsTitle)}
        </Heading>
        <Divider />
        <Grid overflow="visible" mt="24px" gridGap={10} gridTemplateColumns="repeat(5, 1fr)">
          {teams.map((team) => {
            return (
              <GridItem
                key={team.id}
                width="fit-content"
                _hover={{ opacity: 0.7 }}
                transition="0.5s"
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
            transition="0.5s"
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
    </StyledFlex>
  )
}

export default TeamHoverMenu
