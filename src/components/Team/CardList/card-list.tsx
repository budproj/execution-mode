import { useQuery } from '@apollo/client'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import React, { memo, useEffect, useMemo } from 'react'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import { useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './Card'
import queries from './queries.gql'
import { GetTeamsQuery } from './types'

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
    const { data, loading, refetch } = useQuery<GetTeamsQuery>(
      isFromHoverMenu ? queries.GET_USER_TEAMS_AND_COMPANIES : queries.GET_TEAMS,
    )
    const [loadTeamsOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)
    const [teams, setTeamEdges] = useConnectionEdges<Team>()

    const filtredTeams = useMemo(() => {
      return teams.filter((team) =>
        team.name.toLocaleLowerCase().includes(teamFilter.toLocaleLowerCase()),
      )
    }, [teamFilter, teams])

    const orderedTeams = orderBy(filtredTeams, ['isCompany', 'name'], ['desc', 'asc'])

    const columnWidth = parentWidth / 3
    const rowHeight = 415

    const renderTeam = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
      const index = rowIndex * 3 + columnIndex
      const team = orderedTeams[index]

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
      if (wereTeamsLoaded) loadTeamsOnRecoil(orderedTeams)
    }, [wereTeamsLoaded, orderedTeams, loadTeamsOnRecoil])

    useEffect(() => {
      if (data) {
        if (isFromHoverMenu && data.me) {
          const uniqByTeamsAndCompanies = uniqBy(
            [...data.me.teams.edges, ...data.me.companies.edges],
            'node.id',
          )
          // WARNING: Tive que realizar este uniqby pois atualmente existe a possibilidade de você estar em uma empresa e não estar no "time" da empresa, e vice-versa, ou seja, causava de aparecer duas vezes a empresa na listagem. Ao mesmo tempo, não pude mexer nisso no back-end pois iria ocasionar em alterações em diversas partes da plataforma.

          setTeamEdges(uniqByTeamsAndCompanies)

          return
        }

        setTeamEdges(data.teams.edges)
      }
    }, [data, setTeamEdges, isFromHoverMenu])

    if (isFromHoverMenu) {
      return (
        <Grid
          mt="24px"
          mb="24px"
          gridGap={10}
          gridTemplateColumns="repeat(2, 1fr)"
          onClick={setIsHovered}
        >
          {orderedTeams.map((team) => {
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
      )
    }

    return wereTeamsLoaded ? (
      <FixedSizeGrid
        width={parentWidth}
        height={rowHeight * Math.ceil(orderedTeams.length / 3)}
        columnCount={3}
        rowCount={Math.ceil(orderedTeams.length / 3)}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        style={{ overflow: 'visible' }}
      >
        {renderTeam}
      </FixedSizeGrid>
    ) : (
      <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
        {emptyState.map(() => (
          <TeamCard key={Math.random()} />
        ))}
      </Grid>
    )
  },
)

export default TeamCardList
