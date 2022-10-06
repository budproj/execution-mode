import { Flex, Text, Avatar, AvatarBadge, Box } from '@chakra-ui/react'
import { format, isToday } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'
import { Clock } from 'src/components/Icon'
import { useGetEmoji } from 'src/components/Routine/hooks'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

interface AnswerRowComponentProperties {
  teamId: string
  answer: {
    id: string
    name: string
    picture: string
    latestStatusReply: string
    timestamp: Date
  }
}

const AnswerRowComponent = ({ teamId, answer }: AnswerRowComponentProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate] = useRelativeDate(new Date(answer.timestamp))
  const isTheDateToday = isToday(new Date(answer.timestamp))

  const { getEmoji } = useGetEmoji()

  return (
    <IntlLink passHref href={`/explore/${teamId}#retrospectiva?answerId=${answer.id}`}>
      <Flex key={answer.id} marginBottom={5}>
        <Avatar width="45px" height="45px" src={answer.picture} marginRight="15px">
          <AvatarBadge border="10.5px solid white" boxSize="20px">
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
                <Clock
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
    </IntlLink>
  )
}

export default AnswerRowComponent
