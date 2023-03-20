/* eslint react/prop-types: 0 */

import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'
import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'
import { User } from 'src/components/User/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import {
  RoutineHightlightsTableCustomColumn,
  RoutineHightlightsTableLastAccessColumn,
  RoutineHightlightsTableLastRetrospectiveColumn,
  RoutineHightlightsTableTeamColumn,
  RoutineHightlightsTableUserColumn,
} from './Columns'
import { useGetRoutineHighlightsData } from './hooks/getTeamRoutineHighlightsData/get-team-routine-highlights-data'
import IndicatorsTableSkeleton from './indicators-table-skeleton'
import messages from './messages'
import { RoutineHightlightsTable } from './types'
import { teamRoutinesHighlightsDataMapper } from './utils/data-mappers'

interface TeamRoutineHighlightsTableProperties {
  loading: boolean
  usersIds: Array<User['id']>
  cardType: CARD_TYPES
}

const TeamRoutineHighlightsTable = ({
  loading,
  usersIds,
  cardType,
}: TeamRoutineHighlightsTableProperties) => {
  const { dispatch: dispatchIndicatorsCheckListClick } = useEvent(
    EventType.INDICATORS_CHECKLIST_CLICK,
  )

  const intl = useIntl()
  const { teamRoutineHighlightsData, isLoading: isTableDataLoading } =
    useGetRoutineHighlightsData(usersIds)

  const tableData = teamRoutinesHighlightsDataMapper.toFront(teamRoutineHighlightsData, cardType)

  const showTableContent = (!loading && !isTableDataLoading) || tableData.length > 0

  const columnHeaderTitle = (columnAccessor: string) =>
    intl.formatMessage(messages.teamIndicatorsTableColumnHeaderMessage, { columnAccessor })

  const columns: Array<Column<RoutineHightlightsTable>> = [
    {
      Header: columnHeaderTitle('userKeyResultsOverview'),
      accessor: 'user',
      Cell: ({ cell: { value } }) => <RoutineHightlightsTableUserColumn userId={value.userId} />,
    },
    {
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'team',
      Cell: ({ cell: { value } }) => <RoutineHightlightsTableTeamColumn userId={value.userId} />,
    },
    {
      Header: columnHeaderTitle('checkin'),
      accessor: 'custom',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableCustomColumn
          cardType={value.cardType}
          userId={value.userId}
          lastRoutineAnswerId={value.lastRoutineAnswerId}
        />
      ),
    },
    {
      Header: columnHeaderTitle('checklist'),
      accessor: 'lastRetrospective',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableLastRetrospectiveColumn
          userId={value.userId}
          isLoaded={!loading}
          onClick={() => dispatchIndicatorsCheckListClick({})}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastRetrospectiveAnswer'),
      accessor: 'lastAccess',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableLastAccessColumn
          isLoaded={value.isLoaded}
          lastDateAccess={value.lastDateAccess}
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

export default TeamRoutineHighlightsTable
