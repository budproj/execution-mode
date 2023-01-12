import React from 'react'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'
import UserOverview from 'src/components/User/Overview'

type Movie = {
  title: string
  director: string
  releaseYear: number
}

type ChecklistProgress = {
  total: number
  checked: number
}

type TeamIndicators = {
  userID: ChecklistProgress
  lastAccess: string
  checklist: string
  lastRetrospectiveAnswer: string
}

const IndicatorsTable = () => {
  const movies: TeamIndicators[] = [
    {
      userID: { checked: 1, total: 2 },
      lastAccess: '213421',
      checklist: '{ checked: 2, total: 5 }',
      lastRetrospectiveAnswer: 'dsa',
    },
  ]

  const columns: Array<Column<TeamIndicators>> = [
    {
      Header: 'Progresso em krs.',
      accessor: 'userID',
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => <UserOverview userID={value.checked.toString()} />,
    },
    {
      Header: 'Último acesso',
      accessor: 'lastAccess',
    },
    {
      Header: 'Check-list',
      accessor: 'checklist',
    },
    {
      Header: 'Retrospectiva',
      accessor: 'lastRetrospectiveAnswer',
    },
  ]

  return <TableBase columns={columns} data={movies} />
}

export default IndicatorsTable
