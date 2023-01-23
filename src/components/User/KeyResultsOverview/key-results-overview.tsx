import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import differenceInDays from 'date-fns/differenceInDays'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import SliderWithFilledTrack from 'src/components/Base/SliderWithFilledTrack'
import keyResultCheckInMessages from 'src/components/KeyResult/List/Body/Columns/KeyResult/messages'
import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'
import selectUser from 'src/state/recoil/user/selector'

import { UserKeyResultsOverviewProperties } from './wrapper'

const KeyResultsOverview = ({
  userId,
  progress,
  latestCheckIn,
  delta,
}: UserKeyResultsOverviewProperties) => {
  const intl = useIntl()

  const latestUserCheckin = latestCheckIn ? new Date(Number(latestCheckIn)) : undefined

  const isOutdatedCheckins = latestUserCheckin
    ? differenceInDays(Date.now(), latestUserCheckin) > 6
    : true

  const prefixMessage = isOutdatedCheckins
    ? keyResultCheckInMessages.outdatedUpdateTextPrefix
    : keyResultCheckInMessages.lastUpdateTextPrefix

  const user = useRecoilValue(selectUser(userId))

  const updateTextColor = isOutdatedCheckins ? 'red.500' : 'gray.300'

  const userKeyResultsProgress = progress ?? 0

  return (
    <HStack gap={2}>
      <Avatar name={user?.fullName} src={user?.picture} objectFit="none" />
      <VStack alignItems="flex-start">
        <Flex width="100%" justifyContent="space-between">
          <Text color="new-gray.800" fontSize={16}>
            {user?.fullName}
          </Text>
          <Text color="brand.500" fontWeight="medium" fontSize={14}>
            {intl.formatNumber(userKeyResultsProgress / 100, { style: 'percent' })}
          </Text>
        </Flex>
        <SliderWithFilledTrack w="100%" minW={194} maxW={232} value={userKeyResultsProgress} />
        <Flex alignItems="center" maxW={194}>
          <UpdateIcon
            isOutdated={latestCheckIn && isOutdatedCheckins ? isOutdatedCheckins : true}
            updateTextColor={updateTextColor}
          />
          <LastUpdateText
            date={latestUserCheckin}
            wordBreak="normal"
            textOverflow="clip"
            color={updateTextColor}
            prefix={intl.formatMessage(prefixMessage)}
          />
        </Flex>
      </VStack>
      <PercentageProgressIncreaseTag
        forcePositiveSignal
        showSignalArrow
        value={delta?.progress}
        fontSize="12px"
        fontWeight="medium"
        alignItems="center"
        justifyContent="center"
        display="flex"
        position="relative"
        border="1px solid"
        borderColor="white"
        padding={1}
        gridGap={0.5}
      />
    </HStack>
  )
}

export default KeyResultsOverview
