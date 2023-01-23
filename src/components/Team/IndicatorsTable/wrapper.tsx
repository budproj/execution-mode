/* eslint react/prop-types: 0 */

import { Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'

import { Team } from '../types'

import {
  LastRetrospectiveAnswerColumn,
  UserKeyResultsCheckinsColumn,
  UserKeyResultsChecklistsColumn,
  UserKeyResultsOverviewColumn,
  UserLastAccessColumn,
} from './Columns'
import { useGetTeamIndicators } from './hooks/getTeamIndicatorsData/get-team-indicators'
import messages from './messages'
import { TeamIndicators } from './types'

interface IndicatorsTableProperties {
  teamId: Team['id']
}

const IndicatorsTable = ({ teamId }: IndicatorsTableProperties) => {
  const intl = useIntl()
  const { data: teamIndicatorsTableData, loading } = useGetTeamIndicators(teamId)

  const columnHeaderTitle = (columnAccessor: string) =>
    intl.formatMessage(messages.teamIndicatorsTableColumnHeaderMessage, { columnAccessor })

  const columns: Array<Column<TeamIndicators>> = [
    {
      Header: columnHeaderTitle('userKeyResultsOverview'),
      accessor: 'userKeyResultsOverview',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsOverviewColumn
          isLoaded={!loading}
          userId={value.userId}
          progress={value.progress}
          latestCheckIn={value.latestCheckIn}
          delta={value.delta}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'lastAccess',
      Cell: ({ cell: { value } }) => (
        <UserLastAccessColumn isLoaded={!loading} userId={value.userId} />
      ),
    },
    {
      Header: columnHeaderTitle('checkin'),
      accessor: 'checkin',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsCheckinsColumn
          isLoaded={!loading}
          userId={value.userId}
          totalOfDoneCheckIns={value.totalOfDoneCheckIns}
          totalOfKeyResultsThatNeedsCheckIn={value.totalOfKeyResultsThatNeedsCheckIn}
        />
      ),
    },
    {
      Header: columnHeaderTitle('checklist'),
      accessor: 'checklist',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsChecklistsColumn
          userId={value.userId}
          isLoaded={!loading}
          checked={value.checked}
          total={value.total}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastRetrospectiveAnswer'),
      accessor: 'lastRetrospectiveAnswer',
      Cell: ({ cell: { value } }) => (
        <LastRetrospectiveAnswerColumn isLoaded={!loading} userId={value.userId} />
      ),
    },
  ]

  return teamIndicatorsTableData ? (
    <TableBase columns={columns} data={teamIndicatorsTableData} />
  ) : (
    <Box>Nothing to see</Box>
  )
}

export default IndicatorsTable
