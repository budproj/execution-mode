import {
  Flex,
  Stack,
  Text,
  Grid,
  Divider,
  ButtonGroup,
  Button,
  IconButton,
  useDisclosure,
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { CircleArrowRight } from 'src/components/Icon'
import CircleIcon from 'src/components/Icon/Circle'
import GearIcon from 'src/components/Icon/Gear'
import messages from 'src/components/Page/Team/Tabs/content/messages'
import { NotificationSettingsModal } from 'src/components/Routine/NotificationSettings'
import { Team } from 'src/components/Team/types'

import AnswersComponent from './Answers'
import RetrospectiveTabContentView from './retrospective-tab-content-view'
import { useLogic } from './use-logic'

interface RetrospectiveTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const RetrospectiveTabContent = ({ teamId, isLoading }: RetrospectiveTabContentProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    toggleNotifcation,
    canEditTeam,
    teamOptedOut,
    after,
    before,
    week,
    handleViewMore,
    handleGetNoCurrentAnswers,
  } = useLogic(teamId, router)

  return (
    <Stack spacing={10}>
      {/* Cabeçario Retrospectiva */}
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Text fontSize={28} fontWeight="medium" color="new-gray.800">
            {intl.formatMessage(messages.tabRetrospectivePageTitle)}
          </Text>
          <Text
            fontSize={14}
            color="new-gray.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {intl.formatMessage(messages.tabRetrospectivePageDescription, {
              link: (
                <Link
                  isExternal
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml={1}
                  gap={1}
                  target="_blank"
                  href="https://www.loom.com/share/4e69b3a0269a4b60ab2f4a290c64abae"
                  verticalAlign="middle"
                >
                  {intl.formatMessage(messages.learnMoreRetrospectiveMessage)}
                  <CircleArrowRight
                    alignContent="center"
                    desc={intl.formatMessage(messages.learnMoreRetrospectiveIcon)}
                  />
                </Link>
              ),
            })}
          </Text>
        </Stack>
        {/* Botão de lembrete */}
        {canEditTeam && !isLoading ? (
          <Stack>
            <ButtonGroup isAttached size="sm" variant="outline" onClick={onOpen}>
              <Button
                borderTopLeftRadius="10px"
                borderBottomLeftRadius="10px"
                bgColor="#fff"
                borderColor="new-gray.400"
                borderWidth="1px"
                fontSize="14px"
                _hover={{}}
                _focus={{}}
              >
                <CircleIcon desc="teste" fill={teamOptedOut ? 'red.500' : 'green.500'} mr={3} />
                {intl.formatMessage(
                  teamOptedOut ? messages.routineSettingsInactive : messages.routineSettingsActive,
                )}
              </Button>
              <IconButton
                borderColor="new-gray.400"
                borderWidth="1px"
                borderLeft={0}
                aria-label={intl.formatMessage(messages.routineSettingsButton)}
                bgColor="#fff"
                borderTopRightRadius="10px"
                borderBottomRightRadius="10px"
                _hover={{ backgroundColor: 'initial' }}
                _active={{ backgroundColor: 'initial' }}
                _focus={{}}
                icon={<GearIcon fill="gray.500" w="16px" h="auto" desc="teste" mx={3} />}
              />
            </ButtonGroup>
          </Stack>
        ) : undefined}
      </Flex>
      {/* Conteudo da Retro */}
      <Grid w="100%" templateColumns="370px 0px 1fr" minHeight="750px" bg="white" borderRadius={15}>
        <AnswersComponent
          after={after}
          before={before}
          week={week}
          teamId={teamId}
          handleViewMore={handleViewMore}
          onGetNoCurrentAnswers={handleGetNoCurrentAnswers}
        />

        <Divider orientation="vertical" borderColor="new-gray.400" />
        <RetrospectiveTabContentView
          after={after}
          before={before}
          week={week}
          teamId={teamId}
          isLoaded={!isLoading}
        />
      </Grid>
      {/* Modal que controla as notificações da retro */}
      <NotificationSettingsModal
        isOpen={isOpen}
        teamOptedOut={teamOptedOut}
        onClose={onClose}
        onToggle={toggleNotifcation}
      />
    </Stack>
  )
}

export default RetrospectiveTabContent
