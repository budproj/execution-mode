import { Flex, Text, Avatar, AvatarBadge, Box } from '@chakra-ui/react'
import { format, isToday } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'
import { Clock } from 'src/components/Icon'
import ThinkingBalloon from 'src/components/Icon/ThinkingBalloon'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { Team } from 'src/components/Team/types'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

interface AnswerRowComponentProperties {
  teamId: Team['id']
  answer: {
    id: string
    user: string
    feeling: number
    createdAt: string
    comments: number
  }
}

const AnswerRowComponent = ({ teamId, answer }: AnswerRowComponentProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate] = useRelativeDate(new Date(answer.createdAt))
  const isTheDateToday = isToday(new Date(answer.createdAt))

  const { getEmoji } = useGetEmoji()

  return (
    // TODO: change link (before and after must not be static)
    <IntlLink
      passHref
      href={`/explore/${teamId}#retrospectiva?answerId=${answer.id}&before=2022-01-20&after=2022-01-01`}
    >
      <Flex key={answer.id} marginBottom={5}>
        <Avatar
          width="45px"
          height="45px"
          src="https://static.wikia.nocookie.net/rickandmorty/images/a/a6/Rick_Sanchez.png"
          marginRight="15px"
        >
          <AvatarBadge border="10.5px solid white" boxSize="20px">
            {true ? (
              getEmoji({ felling: answer.feeling, size: '20px' })
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
                <Clock
                  desc={intl.formatMessage(messages.clockIconDescription)}
                  fill="new-gray.300"
                />
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
                />
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
                />
                sem resposta
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </IntlLink>
  )
}

export default AnswerRowComponent
