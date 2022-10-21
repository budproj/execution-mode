import { Button, Flex, Link, Stack, Text, Grid, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { CircleArrowRight } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'

import messages from '../../Page/Team/Tabs/content/messages'

import AnswersComponent from './Answers'
import RetrospectiveTabContentView from './retrospective-tab-content-view'

export type AnswerType = {
  id: string
  user: string
  feeling: number
  createdAt: string
  comments: number
}

const data: AnswerType[] = [
  {
    id: '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
    user: 'Lucas Vilela',
    feeling: 1,
    createdAt: '2022-8-27 09:09:00',
    comments: 3,
  },
]

interface RetrospectiveTabContent {
  teamId: Team['id']
  answerQuery: string
}

const RetrospectiveTabContent = ({ answerQuery, teamId }: RetrospectiveTabContent) => {
  const intl = useIntl()
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

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
          onClick={() => {
            setIsRoutineDrawerOpen(() => true)
          }}
        >
          {intl.formatMessage(messages.tabRetrospectiveAnswerButton)}
        </Button>
      </Flex>
      <Grid w="100%" templateColumns="370px 0px 1fr" minHeight="750px" bg="white" borderRadius={15}>
        <AnswersComponent teamId={teamId} answers={data} />
        <Divider orientation="vertical" borderColor="new-gray.400" />
        <RetrospectiveTabContentView teamId={teamId} answers={data} answerQuery={answerQuery} />
      </Grid>
    </Stack>
  )
}

export default RetrospectiveTabContent
