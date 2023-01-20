/* eslint react/prop-types: 0 */

import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'

import {
  LastRetrospectiveAnswerColumn,
  UserKeyResultsCheckinsColumn,
  UserKeyResultsChecklistsColumn,
  UserKeyResultsOverviewColumn,
  UserLastAccessColumn,
} from './Columns'
import messages from './messages'
import { mockedTableData } from './mocked-table-data'
import { TeamIndicators } from './types'

const IndicatorsTable = () => {
  const intl = useIntl()

  const columnHeaderTitle = (columnAccessor: string) =>
    intl.formatMessage(messages.teamIndicatorsTableColumnHeaderMessage, { columnAccessor })

  const columns: Array<Column<TeamIndicators>> = [
    {
      Header: columnHeaderTitle('userKeyResultsOverview'),
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
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'lastAccess',
      Cell: ({ cell: { value } }) => <UserLastAccessColumn userId={value.userId} />,
    },
    {
      Header: columnHeaderTitle('checkin'),
      accessor: 'checkin',
      Cell: ({ cell: { value } }) => (
        <UserKeyResultsCheckinsColumn
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
          checked={value.checked}
          total={value.total}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastRetrospectiveAnswer'),
      accessor: 'lastRetrospectiveAnswer',
      Cell: ({ cell: { value } }) => <LastRetrospectiveAnswerColumn userId={value.userId} />,
    },
  ]

  return <TableBase columns={columns} data={mockedTableData} />
}

export default IndicatorsTable
