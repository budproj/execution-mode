import { useQuery } from '@apollo/client'
import {
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult, KeyResultCheckMarkState } from 'src/components/KeyResult/types'
import { useGetMyTasksProperties } from 'src/components/Task/hooks/getTasks'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { myThingsTasksQuery } from 'src/state/recoil/task'

import MyTasksEmptyState from './empty-state'
import queries from './queries.gql'
import { TaskSkeletons } from './skeletons'
import Tasks from './tasks'

interface UserTasksProperties {
  userID: User['id']
  username?: User['firstName']
}

const MyTasks = ({ userID, username }: UserTasksProperties) => {
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()
  const { onlyUnchecked } = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)
  const [filteredKeyResults, setFilteredKeyResults] = useState([] as KeyResult[])

  const { refetch, loading } = useQuery(queries.GET_KRS_WITH_MY_CHECKMARKS, {
    variables: {
      ...(userID ? { userID } : {}),
    },
    onCompleted: (data) => {
      setKeyResults(data.user.keyResults.edges)
      loadKeyResults(keyResults)
    },
  })

  useEffect(() => {
    const filteredKeyResults = keyResults.map((keyResult) => {
      const checkListToShow = keyResult.checkList.edges.filter((checklist) =>
        onlyUnchecked ? checklist.node.state === KeyResultCheckMarkState.UNCHECKED : true,
      )

      return {
        ...keyResult,
        checkList: {
          ...keyResult.checkList,
          edges: checkListToShow,
        },
      }
    })

    setFilteredKeyResults(filteredKeyResults)
  }, [keyResults, setFilteredKeyResults, onlyUnchecked])

  if (loading) {
    return <TaskSkeletons isLoaded={!loading} />
  }

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border={0}>
        <AccordionButton
          _hover={{}}
          _focus={{ boxShadow: 'none' }}
          borderBottom="1px solid"
          borderBottomColor="new-gray.400"
          py={4}
        >
          <Flex flex="1" textAlign="left">
            <Heading
              as="h2"
              fontSize="xl"
              textTransform="uppercase"
              fontWeight="bold"
              color="new-gray.800"
            >
              Tarefas em OKRs
            </Heading>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          {keyResults.length > 0 ? (
            <Tasks items={filteredKeyResults} onUpdate={refetch} />
          ) : (
            <MyTasksEmptyState username={username} />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default MyTasks
