/* eslint react/prop-types: 0 */

import React from 'react'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'

import {
  LastRetrospectiveAnswerColumn,
  UserKeyResultsChecklistsColumn,
  UserKeyResultsOverviewColumn,
  UserLastAccessColumn,
} from './Columns'
import { mockedTableData } from './mocked-table-data'
import { TeamIndicators } from './types'

const IndicatorsTable = () => {
  const columns: Array<Column<TeamIndicators>> = [
    {
      Header: 'Progresso em krs.',
      accessor: 'userKeyResultsOverview',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsOverviewColumn
          userId={value.userId}
          progress={value.progress}
          latestCheckIn={value.latestCheckIn}
          delta={value.delta}
        />
      ),
    },
    {
      Header: 'Último acesso',
      accessor: 'lastAccess',
      Cell: ({ cell: { value } }) => <UserLastAccessColumn userId={value.userId} />,
    },
    {
      Header: 'Check-list',
      accessor: 'checklist',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsChecklistsColumn total={value.total} checked={value.checked} />
      ),
    },
    {
      Header: 'Retrospectiva',
      accessor: 'lastRetrospectiveAnswer',
      Cell: ({ cell: { value } }) => <LastRetrospectiveAnswerColumn userId={value.userId} />,
    },
  ]

  return <TableBase columns={columns} data={mockedTableData} />
}

export default IndicatorsTable
