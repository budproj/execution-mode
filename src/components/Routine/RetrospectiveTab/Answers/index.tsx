import { Flex, Text, IconButton, GridItem, Divider, Box, Spinner } from '@chakra-ui/react'
import { format, add, sub } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { Button } from 'src/components/Base/Button'
import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { ArrowRight } from 'src/components/Icon'
import BrilliantBellIcon from 'src/components/Icon/BrilliantBell'

import { AnswerSummary } from '../types'

import AnswerRowComponent from './AnswerRow'
import messages from './messages'
import { useLogic } from './use-logic'

interface AnswersComponentProperties {
  teamId: string
  after: Date
  before: Date
  week: number
  dataAnswers: AnswerSummary[] | undefined
  loadingAnswers: boolean
  loadMore: boolean
  usersSelected: string[]
  setNewDate: (newDate: Date) => Promise<void>
  handleViewMore?: () => void
  setUsersSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const ScrollableItem = getScrollableItem()

const AnswersComponent = ({
  teamId,
  after,
  before,
  week,
  dataAnswers,
  loadingAnswers,
  loadMore,
  usersSelected,
  setNewDate,
  handleViewMore,
  setUsersSelected,
}: AnswersComponentProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const {
    search,
    SEARCH_CHARACTERS_LIMIT,
    showAnswerNowButton,
    filteredAnswers,
    loadingSearch,
    dispatchChangeTimePeriod,
    isNextWeekDisabled,
    handleSearch,
    setIsRoutineDrawerOpen,
    dispatchAnswerNowFormClick,
  } = useLogic({
    teamId,
    before,
    after,
    router,
    dataAnswers,
    loadingAnswers,
    usersSelected,
    setUsersSelected,
  })

  return (
    <GridItem padding="25px 25px 30px 20px" display="flex" flexDirection="column">
      {/* Seletor de semana */}
      <Flex width="100%" height="38px" marginBottom="25px" marginTop="6px">
        <IconButton
          background="new-gray.200"
          aria-label={intl.formatMessage(messages.arrowLeftIconDescription)}
          borderRadius="10px 0px 0px 10px"
          height="38px"
          icon={
            <ArrowRight
              transform="rotate(180deg)"
              desc={intl.formatMessage(messages.arrowLeftIconDescription)}
              fill="new-gray.700"
            />
          }
          onClick={() => {
            setNewDate(sub(after, { weeks: 1 }))
            dispatchChangeTimePeriod({})
          }}
        />
        <Text
          color="new-gray.800"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          background="new-gray.100"
          marginX="3px"
        >
          {intl.formatMessage(messages.weekText)} {week} (
          {format(new Date(after), 'dd/MMM', { locale: pt })} a{' '}
          {format(new Date(before), 'dd/MMM', { locale: pt })})
        </Text>
        <IconButton
          borderRadius="0px 10px 10px 0px"
          background="new-gray.200"
          aria-label={intl.formatMessage(messages.arrowRightIconDescription)}
          height="38px"
          isDisabled={isNextWeekDisabled(before)}
          icon={
            <ArrowRight
              desc={intl.formatMessage(messages.arrowRightIconDescription)}
              fill="new-gray.700"
            />
          }
          onClick={() => {
            setNewDate(add(after, { weeks: 1 }))
            dispatchChangeTimePeriod({})
          }}
        />
      </Flex>

      <Divider borderColor="new-gray.400" />

      {/* Pesquisa de usuário */}
      <Flex gap="5px" marginTop="20px" marginBottom="30px">
        <SearchBar placeholder="Buscar" borderRadius="10px" height="38px" onSearch={handleSearch} />
      </Flex>

      {/* Lista de respostas por usuários */}
      <ScrollableItem id="scrollable-list-users" maxH="700px" p="0 12px">
        {filteredAnswers.map((answer) => (
          <AnswerRowComponent key={answer.id} answer={answer} />
        ))}
        {(loadingAnswers || loadingSearch) && (
          <Flex justify="center" py={4}>
            <Spinner size="lg" />
          </Flex>
        )}
        {!loadingAnswers && loadMore && (
          <Button
            width="100%"
            marginTop="20px"
            marginBottom="20px"
            label="Ver mais"
            onClick={handleViewMore}
          />
        )}
        <Box
          id="list-bottom"
          display={search.length >= SEARCH_CHARACTERS_LIMIT ? 'none' : 'block'}
        />
      </ScrollableItem>

      {/* Botão de resposta */}
      {showAnswerNowButton && (
        <Box textAlign="center" marginTop="auto">
          <Divider borderColor="new-gray.400" />
          <Text color="red.500" fontWeight="500" fontSize="14px" marginY="10px">
            <BrilliantBellIcon
              desc={intl.formatMessage(messages.redBellIconDescription)}
              marginRight={2}
              marginBottom={1.5}
            />
            {intl.formatMessage(messages.notAnsweredText)}
          </Text>
          <Button
            width="100%"
            label={intl.formatMessage(messages.answerNowButton)}
            color="white"
            backgroundColor="brand.500"
            padding="13px 0px"
            _hover={{ background: 'brand.400', color: 'black.50' }}
            onClick={() => {
              setIsRoutineDrawerOpen(true)
              dispatchAnswerNowFormClick({})
            }}
          />
        </Box>
      )}
    </GridItem>
  )
}

export default AnswersComponent
