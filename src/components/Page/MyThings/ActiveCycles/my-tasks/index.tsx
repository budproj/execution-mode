import { useQuery } from '@apollo/client'
import { Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResult } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import MyTasksEmptyState from './empty-state'
import messages from './messages'
import queries from './queries.gql'
import Tasks from './tasks'

const MyTasks = () => {
  const intl = useIntl()

  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()

  const { refetch } = useQuery(queries.GET_KRS_WITH_MY_CHECKMARKS, {
    onCompleted: (data) => {
      setKeyResults(data.me.keyResults.edges)
      loadKeyResults(keyResults)
    },
  })

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
      {keyResults.length > 0 ? (
        <Tasks items={keyResults} onUpdate={refetch} />
      ) : (
        <MyTasksEmptyState />
      )}
    </>
  )
}

export default MyTasks
