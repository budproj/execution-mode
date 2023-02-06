/* eslint react/prop-types: 0 */

import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'
import { useRecoilValue } from 'recoil'

import TableBase from 'src/components/Base/Table'
import { teamIndicatorsTableData } from 'src/state/recoil/team/indicators/team-indicators-table-data'

import {
  LastRetrospectiveAnswerColumn,
  UserKeyResultsCheckinsColumn,
  UserKeyResultsChecklistsColumn,
  UserKeyResultsOverviewColumn,
  UserLastAccessColumn,
} from './Columns'
import IndicatorsTableSkeleton from './indicators-table-skeleton'
import messages from './messages'
import { TeamIndicators } from './types'

interface IndicatorsTableProperties {
  loading: boolean
}

const IndicatorsTable = ({ loading }: IndicatorsTableProperties) => {
  const intl = useIntl()
  const tableData = useRecoilValue(teamIndicatorsTableData)

  const showTableContent = !loading || tableData.length > 0

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
        <UserLastAccessColumn
          isLoaded={!loading}
          userId={value.userId}
          lastDateAccess={value.lastDateAccess}
        />
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
        <LastRetrospectiveAnswerColumn
          isLoaded={!loading}
          userId={value.userId}
          lastRetrospetiveAnswerId={value.lastRetrospetiveAnswerId}
          feeling={value.feeling}
          productity={value.productity}
          roadblock={value.roadblock}
        />
      ),
    },
  ]

  return showTableContent ? (
    <TableBase columns={columns} data={tableData} />
  ) : (
    <IndicatorsTableSkeleton />
  )
}

export default IndicatorsTable
