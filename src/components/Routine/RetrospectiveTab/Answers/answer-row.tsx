import { Flex, Text, Avatar, AvatarBadge, Box } from '@chakra-ui/react'
import { format, isToday } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { Clock } from 'src/components/Icon'
import { useGetEmoji } from 'src/components/Routine/hooks'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

interface Answer {
  id: string
  name: string
  picture: string
  latestStatusReply: string
  timestamp: Date
}

interface AnswerRowComponentProperties {
  teamId: string
  answer: Answer
}

const AnswerRowComponent = ({ teamId, answer }: AnswerRowComponentProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const [formattedRelativeDate] = useRelativeDate(new Date(answer.timestamp))
  const isTheDateToday = isToday(new Date(answer.timestamp))

  const { getEmoji } = useGetEmoji()

  const setActiveAnswer = (answerId: Answer['id']) => {
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
    }
  }

  return (
    <Flex
      key={answer.id}
      cursor={answer.id ? 'pointer' : 'auto'}
      marginBottom={5}
      onClick={() => setActiveAnswer(answer.id)}
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
            <Text color="new-gray.700">
              <Clock desc={intl.formatMessage(messages.clockIconDescription)} fill="new-gray.300" />{' '}
              {isTheDateToday
                ? `${intl.formatMessage(messages.hourPrefix, { today: isTheDateToday })} ${format(
                    new Date(answer.timestamp),
                    "kk'h'mm",
                  )}`
                : `${formattedRelativeDate ? formattedRelativeDate : ''} ${intl.formatMessage(
                    messages.hourPrefix,
                    { today: isTheDateToday },
                  )} ${format(new Date(answer.timestamp), "kk'h'mm")} `}
              {/* <ThinkingBalloon
                marginLeft={5}
                desc={intl.formatMessage(messages.thinkingBalloonDescription)}
              />{' '}
              5 */}
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
