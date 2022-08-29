import { Flex, Text, IconButton, GridItem, Divider, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from 'src/components/Base/Button'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { ArrowRight } from 'src/components/Icon'
import BrilliantBellIcon from 'src/components/Icon/BrilliantBell'
import ThreeLayersIcon from 'src/components/Icon/ThreeLayers'

import AnswerRowComponent from './answer-row'
import messages from './messages'

export const emojisKeys = {
  1: '/images/sad-emoji.svg',
  2: '/images/unhappy-emoji.svg',
  3: '/images/neutral-emoji.svg',
  4: '/images/smile-emoji.svg',
  5: '/images/happy-emoji.svg',
}

interface AnswersComponentProperties {
  answers: Array<{
    id: number
    user: string
    feeling: keyof typeof emojisKeys
    createdAt: string
    comments: number
  }>
}

const AnswersComponent = ({ answers }: AnswersComponentProperties) => {
  const intl = useIntl()
  const [search, setSearch] = useState('')
  const [filteredAnswers, setFilteredAnswers] = useState(answers)

  useEffect(() => {
    setFilteredAnswers(answers.filter((answer) => answer.user.toLowerCase().includes(search)))
  }, [answers, search])

  return (
    <GridItem padding="25px 25px 30px 20px" display="flex" flexDirection="column">
      <Flex width="100%" marginBottom="25px">
        <IconButton
          background="new-gray.200"
          aria-label={intl.formatMessage(messages.arrowLeftIconDescription)}
          borderRadius="10px 0px 0px 10px"
          icon={
            <ArrowRight
              transform="rotate(180deg)"
              desc={intl.formatMessage(messages.arrowLeftIconDescription)}
              fill="new-gray.700"
            />
          }
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
          Semana 29 18/jul a 22/jul
        </Text>
        <IconButton
          borderRadius="0px 10px 10px 0px"
          background="new-gray.200"
          aria-label={intl.formatMessage(messages.arrowRightIconDescription)}
          icon={
            <ArrowRight
              desc={intl.formatMessage(messages.arrowRightIconDescription)}
              fill="new-gray.700"
            />
          }
        />
      </Flex>
      <Divider />
      <Flex gap="5px" marginTop="20px" marginBottom="30px">
        <SearchBar placeholder="Buscar" borderRadius="10px" onSearch={setSearch} />
        <IconButton
          borderRadius="10px"
          background="new-gray.200"
          aria-label="aaaa"
          icon={
            <ThreeLayersIcon
              desc={intl.formatMessage(messages.threeLayersIconDescription)}
              width="30px"
            />
          }
        />
      </Flex>
      {filteredAnswers.map((answer) => {
        return <AnswerRowComponent key={answer.id} answer={answer} />
      })}
      <Box textAlign="center" marginTop="auto">
        <Divider />
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
        />
      </Box>
    </GridItem>
  )
}

export default AnswersComponent
