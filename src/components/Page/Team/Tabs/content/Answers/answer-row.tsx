import { Flex, Text, Avatar, AvatarBadge, Image, Box } from '@chakra-ui/react'
import { format, isToday } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import { Clock } from 'src/components/Icon'
import ThinkingBalloon from 'src/components/Icon/ThinkingBalloon'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export const emojisKeys = {
  1: '/images/sad-emoji.svg',
  2: '/images/unhappy-emoji.svg',
  3: '/images/neutral-emoji.svg',
  4: '/images/smile-emoji.svg',
  5: '/images/happy-emoji.svg',
}

interface AnswerRowComponentProperties {
  answer: {
    id: number
    user: string
    feeling: keyof typeof emojisKeys
    createdAt: string
    comments: number
  }
}

const AnswerRowComponent = ({ answer }: AnswerRowComponentProperties) => {
  const intl = useIntl()
  const emoji = emojisKeys[answer.feeling]
  const [formattedRelativeDate] = useRelativeDate(new Date(answer.createdAt))
  const isTheDateToday = isToday(new Date(answer.createdAt))

  return (
    <Flex key={answer.id} marginBottom={5}>
      <Avatar
        width="45px"
        height="45px"
        src="https://static.wikia.nocookie.net/rickandmorty/images/a/a6/Rick_Sanchez.png"
        marginRight="15px"
      >
        <AvatarBadge border="none" boxSize="20px">
          {true ? (
            <Image width="20px" height="20px" src={emoji} />
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
        {true ? (
          <>
            <Text color="new-gray.900" fontWeight="450" fontSize="16px">
              {answer.user}
            </Text>
            <Text color="new-gray.700">
              <Clock desc={intl.formatMessage(messages.clockIconDescription)} fill="new-gray.300" />{' '}
              {isTheDateToday
                ? `${intl.formatMessage(messages.hourPrefix, { today: isTheDateToday })} ${format(
                    new Date(answer.createdAt),
                    "kk'h'mm",
                  )}`
                : `${formattedRelativeDate ? formattedRelativeDate : ''} ${intl.formatMessage(
                    messages.hourPrefix,
                    { today: isTheDateToday },
                  )} ${format(new Date(answer.createdAt), "kk'h'mm")} `}
              <ThinkingBalloon
                marginLeft={5}
                desc={intl.formatMessage(messages.thinkingBalloonDescription)}
              />{' '}
              {answer.comments}
            </Text>
          </>
        ) : (
          <>
            <Text color="new-gray.600" fontWeight="450" fontSize="16px">
              {answer.user}
            </Text>
            <Text color="new-gray.500">
              <Clock
                desc={intl.formatMessage(messages.clockIconDescription)}
                fill="new-gray.200"
                stroke="#99A4C2"
              />{' '}
              sem resposta
            </Text>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default AnswerRowComponent
