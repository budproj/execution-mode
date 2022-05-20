import { useQuery } from '@apollo/client'
import { Button, Flex, Box, Divider, Text, HStack, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import HistoryIcon from 'src/components/Icon/History'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import { PageHeader } from '../../../Base/PageHeader/wrapper'
import { TeamSectionWrapper } from '../../Team/Section/wrapper'

import messages from './messages'
import queries from './queries.gql'

interface IndividualOkrPageProperties {
  intl: ReturnType<typeof useIntl>
  userID: string
  handleLineClick: (id: KeyResult['id']) => void
}

const IndividualOkrPage = ({ handleLineClick, intl, userID }: IndividualOkrPageProperties) => {
  const { data } = useQuery(queries.LIST_USERS_WITH_INDIVIDUAL_OKR)

  const [users, setUsers] = useConnectionEdges<User>(data?.users?.edges)

  useEffect(() => {
    if (data) {
      setUsers(data.users.edges)
    }
  }, [data, setUsers])

  return (
    <PageContent background="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <PageHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading color="new-gray.800" mt={1}>
              {intl.formatMessage(messages.individualOKRTitle)}
            </Heading>
            <Text color="new-gray.600" fontWeight={500} mt={3}>
              {intl.formatMessage(messages.individualOKRSubTitle)}
            </Text>
          </Box>

          <Flex>
            <Button
              marginRight="8px"
              background="#E8EEFC"
              leftIcon={<HistoryIcon fill="currentcolor" desc="Ícone de histórico" />}
            >
              Histórico
            </Button>
            <Button background="brand.500" color="white">
              Criar objetivo
            </Button>
          </Flex>
        </Flex>
      </PageHeader>

      <HStack align="stretch" spacing="4rem" flex="1" w="100%">
        <Box flexBasis="60%" maxWidth="60%">
          {userID ? (
            <KeyResultsActiveAndOwnedByUser userID={userID} onLineClick={handleLineClick} />
          ) : undefined}
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
        </Box>

        <TeamSectionWrapper minWidth="367px" title="Colegas com OKR's individuais">
          <SelectUserfromList users={users} avatarSubtitleType="role" />
        </TeamSectionWrapper>
      </HStack>
    </PageContent>
  )
}

export default IndividualOkrPage
