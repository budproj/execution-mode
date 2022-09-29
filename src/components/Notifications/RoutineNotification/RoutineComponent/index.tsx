import { Flex, Text, Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { Button } from 'src/components/Base/Button'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import { CalendarColored } from 'src/components/Icon'
import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'
import { PendingRoutine } from 'src/components/Routine/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'

import messages from './messages'

interface RoutineComponentProperties {
  routine: PendingRoutine
}

const RoutineComponent = ({ routine }: RoutineComponentProperties) => {
  const { dispatch } = useEvent(EventType.NOTIFICATION_ROUTINE_CLICK)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

  const intl = useIntl()

  const isOutdatedText =
    routine.daysOutdated >= 1
      ? intl.formatMessage(messages.answerRoutineOutdatedText)
      : intl.formatMessage(messages.answerRoutineTodayText)

  return (
    <>
      <Divider borderColor="new-gray.400" />
      <Flex padding="18px 0px" alignItems="center">
        <Box marginRight="20px" background="red.100" padding={2} borderRadius="50%" display="flex">
          <CalendarColored
            desc={intl.formatMessage(messages.calendarIconDescription)}
            width="25px"
            height="25px"
          />
        </Box>

        <Box flex="1">
          <Text fontWeight="400" color="new-gray.900">
            {routine.name}
          </Text>
          <Flex alignItems="center">
            <UpdateIcon isFilled isOutdated updateTextColor="red.500" />
            <LastUpdateText color="red.500" lineHeight="normal" customMessage={isOutdatedText} />
          </Flex>
        </Box>
        <Box>
          <Button
            marginLeft={10}
            variant="solid"
            padding="7px 13px"
            fontSize={12}
            label={intl.formatMessage(messages.answerRoutineButton)}
            onClick={() => {
              setIsRoutineDrawerOpen(() => true)
              dispatch({})
            }}
          />
        </Box>
      </Flex>
    </>
  )
}

export default RoutineComponent
