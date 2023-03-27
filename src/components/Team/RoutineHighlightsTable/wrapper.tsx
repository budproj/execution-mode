/* eslint react/prop-types: 0 */

import { Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'
import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'
import { User } from 'src/components/User/types'

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
  usersIds: Array<User['id']>
  cardType: CARD_TYPES
}

const TeamRoutineHighlightsTable = ({
  usersIds,
  cardType,
}: TeamRoutineHighlightsTableProperties) => {
  const intl = useIntl()
  const { teamRoutineHighlightsData, isLoading: isTableDataLoading } =
    useGetRoutineHighlightsData(usersIds)

  const tableData = teamRoutinesHighlightsDataMapper.toFront(teamRoutineHighlightsData, cardType)

  const showTableContent = !isTableDataLoading || tableData.length > 0

  const columnHeaderTitle = (columnAccessor: string) => (
    <Text color="new-gray.800" fontWeight="500" fontSize="12px">
      {intl.formatMessage(messages.teamHighlightsTableColumnHeaderMessage, { columnAccessor })}
    </Text>
  )

  const columns: Array<Column<RoutineHightlightsTable>> = [
    {
      Header: columnHeaderTitle('user'),
      accessor: 'user',
      Cell: ({ cell: { value } }) => <RoutineHightlightsTableUserColumn userId={value.userId} />,
    },
    {
      Header: columnHeaderTitle('team'),
      accessor: 'team',
      Cell: ({ cell: { value } }) => <RoutineHightlightsTableTeamColumn userId={value.userId} />,
    },
    {
      Header: columnHeaderTitle(cardType),
      accessor: 'custom',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableCustomColumn
          cardType={value.cardType}
          userId={value.userId}
          lastUserRoutineAnswer={value.lastUserRoutineAnswer}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastRetrospective'),
      accessor: 'lastRetrospective',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableLastRetrospectiveColumn
          userId={value.userId}
          feeling={cardType === 'feeling' ? undefined : value.feeling}
          productivity={cardType === 'productivity' ? undefined : value.productivity}
          roadBlock={cardType === 'roadblock' ? undefined : value.roadBlock}
          lastRetrospetiveAnswerId={value.lastRetrospetiveAnswerId}
        />
      ),
    },
    {
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'lastAccess',
      Cell: ({ cell: { value } }) => (
        <RoutineHightlightsTableLastAccessColumn userId={value.userId} />
      ),
    },
  ]

  return showTableContent ? (
    <TableBase
      columns={columns}
      data={tableData}
      headStyles={{
        borderTop: '0.5px solid #e8eefc',
      }}
    />
  ) : (
    <IndicatorsTableSkeleton cardType={cardType} />
  )
}

export default TeamRoutineHighlightsTable
