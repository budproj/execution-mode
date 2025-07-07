import { Flex, Text, Avatar, AvatarBadge, Box } from '@chakra-ui/react'
import { format, isToday } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { Clock } from 'src/components/Icon'
import ThinkingBalloon from 'src/components/Icon/ThinkingBalloon'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import { AnswerSummary } from '../../types'
import messages from '../messages'

interface AnswerRowComponentProperties {
  answer: AnswerSummary
}

const AnswerRowComponent = ({ answer }: AnswerRowComponentProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const { dispatch } = useEvent(EventType.ROUTINE_ANSWER_ROW_CLICK)

  const [formattedRelativeDate] = useRelativeDate(new Date(answer.timestamp ?? ''))

  const isTheDateToday = answer.timestamp ? isToday(new Date(answer.timestamp)) : undefined

  const { getEmoji } = useGetEmoji()

  const setActiveAnswer = (answerId: AnswerSummary['id']) => {
    if (answerId) {
      router.push(
        {
          query: {
            ...(router?.query ?? {}),
            answerId,
          },
        },
        undefined,
        { shallow: true },
      )
      setTimeout(() => dispatch({}), 500)
    }
  }

  return (
    <Flex
      key={answer.id}
      cursor={answer.id ? 'pointer' : 'auto'}
      marginBottom={5}
      onClick={() => {
        setActiveAnswer(answer.id)
      }}
    >
      <Avatar width="45px" height="45px" src={answer.picture} marginRight="15px">
        <AvatarBadge
          border="2px solid white"
          boxSize="20px"
          bgColor="new-gray.200"
          padding={answer.latestStatusReply ? undefined : '10px'}
        >
          {answer.latestStatusReply ? (
            getEmoji({ felling: Number(answer.latestStatusReply), size: '20px' })
          ) : (
            <Clock
              desc={intl.formatMessage(messages.clockIconDescription)}
              fill="new-gray.200"
              stroke="#99A4C2"
            />
          )}
        </AvatarBadge>
      </Avatar>
      <Box>
        {answer.timestamp ? (
          <>
            <Text color="new-gray.900" fontWeight="450" fontSize="16px">
              {answer.name}
            </Text>
            <Text color="new-gray.700" display="flex" alignItems="center">
              <Clock
                marginRight={1}
                desc={intl.formatMessage(messages.clockIconDescription)}
                fill="new-gray.300"
              />{' '}
              {isTheDateToday
                ? `${intl.formatMessage(messages.hourPrefix, { today: isTheDateToday })} ${format(
                    new Date(answer.timestamp),
                    "kk'h'mm",
                  )}`
                : `${formattedRelativeDate ? formattedRelativeDate : ''} ${intl.formatMessage(
                    messages.hourPrefix,
                    { today: isTheDateToday },
                  )} ${format(new Date(answer.timestamp), "kk'h'mm")} `}
              {answer.commentCount ? (
                <>
                  <ThinkingBalloon
                    marginLeft={5}
                    marginRight={1}
                    desc={intl.formatMessage(messages.thinkingBalloonDescription)}
                  />
                  {answer.commentCount}
                </>
              ) : undefined}
            </Text>
          </>
        ) : (
          <>
            <Text color="new-gray.600" fontWeight="450" fontSize="16px">
              {answer.name}
            </Text>
            <Text color="new-gray.500">
              <Clock
                desc={intl.formatMessage(messages.clockIconDescription)}
                fill="new-gray.200"
                stroke="#99A4C2"
              />{' '}
              {intl.formatMessage(messages.noAnswerText)}
            </Text>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default AnswerRowComponent
