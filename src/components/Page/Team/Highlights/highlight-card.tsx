import { Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { HighlightCard } from './highlight-section'
import messages from './messages'
import { CARD_TYPES } from './utils/card-types'
import { highlightCardTheme } from './utils/theme'

interface HighLightCardProperties {
  item: HighlightCard
}

export const HighLightCardComponent = ({ item }: HighLightCardProperties) => {
  const intl = useIntl()

  const setHighlightModalConfig = useSetRecoilState(configHighlightModal)

  const handleOpenModal = useCallback(
    (item: HighlightCard) => {
      setHighlightModalConfig({
        isOpen: true,
        type: item.type,
        usersIds: item.usersIds ?? undefined,
      })
    },
    [setHighlightModalConfig],
  )
  const eventMap = new Map([
    [CARD_TYPES.FEELING, EventType.FEELING_HIGHLIGHT_CLICK],
    [CARD_TYPES.PRODUCTIVITY, EventType.PRODUCTIVITY_HIGHLIGHT_CLICK],
    [CARD_TYPES.ROADBLOCK, EventType.ROADBLOCK_HIGHLIGHT_CLICK],
    [CARD_TYPES.CHECKIN, EventType.CHECKIN_HIGHLIGHT_CLICK],
    [CARD_TYPES.CONFIDENCE, EventType.CONFIDENCE_HIGHLIGHT_CLICK],
    [CARD_TYPES.KRMEMBERS, EventType.KRMEMBERS_HIGHLIGHT_CLICK],
    [CARD_TYPES.BARRIER, EventType.BARRIER_HIGHLIGHT_CLICK],
  ])

  const eventTypeCard = eventMap.get(item.type) as EventType

  const { dispatch } = useEvent(eventTypeCard)

  const cardTitle = new Map([
    [CARD_TYPES.FEELING, intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.FEELING })],
    [
      CARD_TYPES.PRODUCTIVITY,
      intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.PRODUCTIVITY }),
    ],
    [CARD_TYPES.ROADBLOCK, intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.ROADBLOCK })],
    [CARD_TYPES.CHECKIN, intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.CHECKIN })],
    [
      CARD_TYPES.CONFIDENCE,
      intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.CONFIDENCE }),
    ],
    [CARD_TYPES.KRMEMBERS, intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.KRMEMBERS })],
    [CARD_TYPES.BARRIER, intl.formatMessage(messages.cardTitle, { type: CARD_TYPES.BARRIER })],
  ])

  return (
    <VStack
      key={item.type}
      cursor={item.quantity >= 1 ? 'pointer' : 'default'}
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      bg={highlightCardTheme[item.type].bg}
      height="80px"
      lineHeight="100%"
      color={highlightCardTheme[item.type].color}
      transition="background-color .4s"
      _hover={{
        bg: highlightCardTheme[item.type].hover,
      }}
      borderRadius={9}
      onClick={() => {
        if (item.quantity > 0) {
          handleOpenModal(item)
        }

        dispatch({})
      }}
    >
      <Text
        flex={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={11}
        fontWeight="bold"
        maxW={120}
        wordBreak="break-word"
      >
        {cardTitle.get(item.type)?.toUpperCase()}
      </Text>
      <Text
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="start"
        lineHeight={0}
        fontSize={28}
        fontWeight="medium"
      >
        {item.quantity}
      </Text>
    </VStack>
  )
}
