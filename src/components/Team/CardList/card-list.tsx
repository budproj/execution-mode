import { useQuery } from '@apollo/client'
import { Box, Button, Grid, GridItem } from '@chakra-ui/react'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import { useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './Card'
import messages from './messages'
import queries from './queries.gql'
// Import { GetTeamsQuery } from './types'

export interface TeamCardListProperties {
  teamFilter: string
  numEmptyStateCards?: number
  parentWidth: number
  isFromHoverMenu?: boolean
  setIsHovered?: () => void
}

const TeamCardList = memo(
  ({
    teamFilter,
    numEmptyStateCards: numberEmptyStateCards = 3,
    parentWidth,
    isFromHoverMenu = false,
    setIsHovered,
  }: TeamCardListProperties) => {
    const [index, setIndex] = useState(3)
    const intl = useIntl()
    const { data, loading, refetch } = useQuery(
      isFromHoverMenu ? queries.GET_USER_TEAMS_AND_COMPANIES : queries.GET_TEAMS,
    )
    const [loadTeamsOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)
    const [teams, setTeamEdges] = useConnectionEdges<Team>()

    const filtredTeams = useMemo(() => {
      return teams.filter((team) =>
        team.name.toLocaleLowerCase().includes(teamFilter.toLocaleLowerCase()),
      )
    }, [teamFilter, teams])

    const orderedTeams = orderBy(filtredTeams, ['is_company', 'name'], ['desc', 'asc'])

    const orderedTeamsToRender = orderedTeams.slice(0, index)

    const columnWidth = parentWidth / 3
    const rowHeight = 415

    const renderTeam = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
      const index = rowIndex * 3 + columnIndex
      const team = orderedTeamsToRender[index]

      return (
        team && (
          <Box
            key={team.id}
            style={{
              ...style,
            }}
            overflow="visible"
            pr={columnIndex !== 0 && columnIndex % 2 === 0 ? '0px' : '30px'}
          >
            <TeamCard id={team.id} isFromHoverMenu={isFromHoverMenu} />
          </Box>
        )
      )
    }

    const wereTeamsLoaded = !loading && Boolean(teams)
    const emptyState = [...new Array(numberEmptyStateCards)]

    const [shouldUpdateTeams, setShouldUpdateTeams] = useRecoilState(isReloadNecessary)
    useEffect(() => {
      if (shouldUpdateTeams) {
        void refetch()
        setShouldUpdateTeams(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldUpdateTeams])

    useEffect(() => {
      if (wereTeamsLoaded) loadTeamsOnRecoil(orderedTeamsToRender)
    }, [wereTeamsLoaded, orderedTeamsToRender, loadTeamsOnRecoil])

    useEffect(() => {
      if (data) {
        if (isFromHoverMenu && data.me) {
          const uniqByTeamsAndCompanies = uniqBy([...data.me.get_teams.edges], 'node.id')
          // WARNING: Tive que realizar este uniqby pois atualmente existe a possibilidade de você estar em uma empresa e não estar no "time" da empresa, e vice-versa, ou seja, causava de aparecer duas vezes a empresa na listagem. Ao mesmo tempo, não pude mexer nisso no back-end pois iria ocasionar em alterações em diversas partes da plataforma.

          setTeamEdges(uniqByTeamsAndCompanies)

          return
        }

        setTeamEdges(data.teams.edges)
      }
    }, [data, setTeamEdges, isFromHoverMenu])

    if (isFromHoverMenu) {
      return wereTeamsLoaded ? (
        <Grid
          mt="24px"
          mb="24px"
          gridGap={10}
          gridTemplateColumns="repeat(2, 1fr)"
          onClick={setIsHovered}
        >
          {orderedTeamsToRender.map((team) => {
            return (
              <GridItem
                key={team.id}
                overflow="visible"
                // Pr={columnIndex !== 0 && columnIndex % 2 === 0 ? '0px' : '30px'}
              >
                <TeamCard id={team.id} isFromHoverMenu={isFromHoverMenu} />
              </GridItem>
            )
          })}
        </Grid>
      ) : (
        <Grid
          mt="24px"
          mb="24px"
          gridGap={10}
          gridTemplateColumns="repeat(2, 1fr)"
          onClick={setIsHovered}
        >
          {emptyState.map(() => (
            <TeamCard key={Math.random()} />
          ))}
        </Grid>
      )
    }

    return wereTeamsLoaded ? (
      <Box>
        <FixedSizeGrid
          width={parentWidth}
          height={rowHeight * Math.ceil(orderedTeamsToRender.length / 3)}
          columnCount={3}
          rowCount={Math.ceil(orderedTeamsToRender.length / 3)}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          style={{ overflow: 'visible' }}
        >
          {renderTeam}
        </FixedSizeGrid>

        <Box style={{ display: 'flex' }}>
          {index < orderedTeams.length && (
            <Button
              style={{ marginLeft: 'auto' }}
              _hover={{
                color: 'brand.500',
              }}
              onClick={() => {
                setIndex(index + 3)
                console.log(index)
              }}
            >
              {intl.formatMessage(messages.loadMore)}
            </Button>
          )}
        </Box>
      </Box>
    ) : (
      <Box>
        <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
          {emptyState.map(() => (
            <TeamCard key={Math.random()} />
          ))}
        </Grid>
        <Box style={{ display: 'flex' }}>
          {index < orderedTeams.length && (
            <Button
              style={{ marginLeft: 'auto' }}
              _hover={{
                color: 'brand.500',
              }}
              onClick={() => {
                setIndex(index + 3)
                console.log(index)
              }}
            >
              {intl.formatMessage(messages.loadMore)}
            </Button>
          )}
        </Box>
      </Box>
    )
  },
)

export default TeamCardList
