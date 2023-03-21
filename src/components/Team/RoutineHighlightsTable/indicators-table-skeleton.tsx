import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'
import KeyResultsOverviewSkeleton from 'src/components/User/KeyResultsOverview/key-results-overview.skeleton'

import messages from './messages'
import { teamHighlightsTableSkeletonData } from './mocked-table-data'

type teamHighlightsTableSkeletonColumns = {
  user: string
  team: string
  custom: string
  lastRetrospective: string
  lastAccess: string
}

const IndicatorsTableSkeleton = () => {
  const intl = useIntl()

  const columnHeaderTitle = (columnAccessor: string) =>
    intl.formatMessage(messages.teamHighlightsTableColumnHeaderMessage, { columnAccessor })

  const fakeTableData = teamHighlightsTableSkeletonData(4)

  const columns: Array<Column<teamHighlightsTableSkeletonColumns>> = [
    {
      Header: columnHeaderTitle('user'),
      accessor: 'user',
      Cell: () => <KeyResultsOverviewSkeleton />,
    },
    {
      Header: columnHeaderTitle('team'),
      accessor: 'team',
      Cell: () => <SkeletonText noOfLines={2} width="80%" skeletonHeight={4} />,
    },
    {
      Header: columnHeaderTitle('custom'),
      accessor: 'custom',
      Cell: () => <SkeletonCircle size="1.4em" />,
    },
    {
      Header: columnHeaderTitle('lastRetrospective'),
      accessor: 'lastRetrospective',
      Cell: () => (
        <Flex alignItems="center" gap={2}>
          <Skeleton w="1.4em" h="1.4em" borderRadius="50%" />
          <SkeletonText noOfLines={1} w="2.4em" skeletonHeight={6} />
        </Flex>
      ),
    },
    {
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'lastAccess',
      Cell: () => <SkeletonText noOfLines={2} width="80%" skeletonHeight={4} />,
    },
  ]

  return <TableBase columns={columns} data={fakeTableData} />
}

export default IndicatorsTableSkeleton
