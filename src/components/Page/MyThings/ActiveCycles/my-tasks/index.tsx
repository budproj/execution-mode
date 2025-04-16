import {
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useOwnerKRData } from 'src/components/KeyResult/hooks/use-get-owner-key-results'
import { User } from 'src/components/User/types'

import messages from '../../../Profile/messages'

import MyTasksEmptyState from './empty-state'
import { TaskSkeletons } from './skeletons'
import Tasks from './tasks'

interface UserTasksProperties {
  userID: User['id']
  username?: User['firstName']
}

const MyTasks = ({ userID, username }: UserTasksProperties) => {
  const intl = useIntl()
  const { data: KeyResultData, isLoading, refetch } = useOwnerKRData(userID, '0')

  if (isLoading) {
    return <TaskSkeletons isLoaded={!isLoading} />
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
          px={0}
        >
          <Flex flex="1" textAlign="left">
            <Heading
              as="h2"
              fontSize="xl"
              textTransform="uppercase"
              fontWeight="bold"
              color="new-gray.800"
            >
              {intl.formatMessage(messages.taskTitle)}
            </Heading>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={0}>
          {KeyResultData!.length > 0 ? (
            <Tasks items={KeyResultData!} onUpdate={refetch} />
          ) : (
            <MyTasksEmptyState username={username} />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default MyTasks
