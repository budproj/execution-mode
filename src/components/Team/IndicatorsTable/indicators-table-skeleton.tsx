import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Column } from 'react-table'

import TableBase from 'src/components/Base/Table'
import KeyResultsOverviewSkeleton from 'src/components/User/KeyResultsOverview/key-results-overview.skeleton'
import LastRetrospectiveAnswerSkeleton from 'src/components/User/LastRetrospectiveAnswerOverview/last-retrospective-answer.skeleton'

import messages from './messages'
import { indicatorsTableSkeletonData } from './mocked-table-data'

type indicatorsTableSkeletonColumns = {
  userKeyResultsOverviewSkeleton: string
  checkinSkeleton: string
  checklistSkeleton: string
  lastAccessSkeleton: string
  lastRetrospectiveAnswerSkeleton: string
}

const IndicatorsTableSkeleton = () => {
  const intl = useIntl()

  const columnHeaderTitle = (columnAccessor: string) =>
    intl.formatMessage(messages.teamIndicatorsTableColumnHeaderMessage, { columnAccessor })

  const fakeTableData = indicatorsTableSkeletonData(4)

  const columns: Array<Column<indicatorsTableSkeletonColumns>> = [
    {
      Header: columnHeaderTitle('userKeyResultsOverview'),
      accessor: 'userKeyResultsOverviewSkeleton',
      Cell: () => <KeyResultsOverviewSkeleton />,
    },
    {
      Header: columnHeaderTitle('lastAccess'),
      accessor: 'lastAccessSkeleton',
      Cell: () => <SkeletonText noOfLines={2} width="80%" skeletonHeight={4} />,
    },
    {
      Header: columnHeaderTitle('checkin'),
      accessor: 'checkinSkeleton',
      Cell: () => (
        <Flex alignItems="center" gap={2}>
          <Skeleton w="1.4em" h="1.4em" borderRadius="50%" />
          <SkeletonText noOfLines={1} w="2.4em" skeletonHeight={6} />
        </Flex>
      ),
    },
    {
      Header: columnHeaderTitle('checklist'),
      accessor: 'checklistSkeleton',
      Cell: () => (
        <Flex alignItems="center" gap={2}>
          <Skeleton w="1.4em" h="1.4em" borderRadius="50%" />
          <SkeletonText noOfLines={1} w="2.4em" skeletonHeight={6} />
        </Flex>
      ),
    },
    {
      Header: columnHeaderTitle('lastRetrospectiveAnswer'),
      accessor: 'lastRetrospectiveAnswerSkeleton',
      Cell: () => <LastRetrospectiveAnswerSkeleton numberOfElements={3} />,
    },
  ]

  return <TableBase columns={columns} data={fakeTableData} />
}

export default IndicatorsTableSkeleton
