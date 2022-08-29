import { Button, Flex, Link, Stack, Text, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { CircleArrowRight } from 'src/components/Icon'

import AnswersComponent, { emojisKeys } from './Answers'
import messages from './messages'

type AnswerType = {
  id: number
  user: string
  feeling: keyof typeof emojisKeys
  createdAt: string
  comments: number
}

const data: AnswerType[] = [
  {
    id: 1,
    user: 'Ana Fonseca',
    feeling: 5,
    createdAt: '2022-5-17 10:10:00',
    comments: 2,
  },
  {
    id: 2,
    user: 'Lucas Vilela',
    feeling: 1,
    createdAt: '2022-8-27 09:09:00',
    comments: 3,
  },
]

const RetrospectiveTabContent = () => {
  const intl = useIntl()

  return (
    <Stack spacing={10}>
      <Flex alignItems="center" justifyContent="space-between">
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
                  href="#"
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
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
        >
          {intl.formatMessage(messages.tabRetrospectiveAnswerButton)}
        </Button>
      </Flex>
      <Grid w="100%" templateColumns="370px 1fr" minHeight="750px" bg="white" borderRadius={15}>
        <AnswersComponent answers={data} />
        <GridItem background="blue">aaaa</GridItem>
      </Grid>
    </Stack>
  )
}

export default RetrospectiveTabContent
