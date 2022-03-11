import { Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResult, KeyResultCheckMark } from 'src/components/KeyResult/types'

import MyTasksEmptyState from './empty-state'
import messages from './messages'
import Tasks from './tasks'

const MyTasks = () => {
  const intl = useIntl()
  const checkmarks: Array<Partial<KeyResultCheckMark>> = [
    { id: '19239123', description: 'blablabla' },
  ]
  const data = [
    {
      id: 'biruleibe',
      title: 'blablabla',
      checkList: {
        edges: checkmarks.map((item) => ({ node: item })),
      },
    },
  ] as Array<Partial<KeyResult>>

  return (
    <>
      <Text
        fontSize="xl"
        lineHeight="1.6rem"
        textTransform="uppercase"
        fontWeight="bold"
        color="new-gray.800"
      >
        {intl.formatMessage(messages.myTasksTitle)}
        <Tag variant="solid" colorScheme="brand" ml={3} textTransform="lowercase" fontWeight="bold">
          {intl.formatMessage(messages.newTag)}
        </Tag>
      </Text>
      {data.length > 0 ? <Tasks items={data} /> : <MyTasksEmptyState />}
    </>
  )
}

export default MyTasks
