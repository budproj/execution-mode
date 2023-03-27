import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'
import { useGetEmoji } from 'src/components/Routine/hooks'

import { UserRoutineDataProperties } from '../../types'

import messages from './messages'

type IconProperties = Record<string, JSX.Element>

const useCustomColumnDefaultIcon = (
  type: CARD_TYPES,
  userRoutineData?: UserRoutineDataProperties,
) => {
  const intl = useIntl()

  const { getEmoji } = useGetEmoji()

  const icons: IconProperties = {
    feeling: getEmoji({ felling: Number(userRoutineData?.feeling), size: '40px' }),
    productivity: (
      <Flex alignItems="center" gap="5px">
        <Box
          borderRadius="50%"
          width="32px"
          height="32px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          background="blue.400"
        >
          <SuitcaseIcon
            boxSize="16px"
            desc={intl.formatMessage(messages.suitcaseIconDescription)}
          />
        </Box>
        <Text color="blue.400" fontWeight={700} fontSize="24px">
          {userRoutineData?.productivity}
        </Text>
      </Flex>
    ),
    roadblock: (
      <Box
        borderRadius="50%"
        width="32px"
        height="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="pink.500"
      >
        <PauseIcon
          boxSize="36px"
          fill="pink.500"
          desc={intl.formatMessage(messages.pauseIconDescription)}
        />
      </Box>
    ),
  }

  return icons[type]
}

export default useCustomColumnDefaultIcon
