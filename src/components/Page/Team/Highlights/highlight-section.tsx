import { Grid, GridProps, Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'
import { keyResultsHighlightsType } from 'src/state/recoil/team/highlight/key-results-highlights-type'

import messages from './messages'
import { CARD_TYPES } from './utils/card-types'
import { highlightCardTheme } from './utils/theme'

export type HighlightCard = {
  type: CARD_TYPES
  quantity: number
  usersIds?: string[]
}

interface HighlightSectionProperties {
  title: string
  data?: HighlightCard[]
  gridTemplate: GridProps['templateColumns']
}

const HighlightSection = ({ title, data, gridTemplate }: HighlightSectionProperties) => {
  const intl = useIntl()
  const setHighlightModalConfig = useSetRecoilState(configHighlightModal)
  const setKeyResultHighlightType = useSetRecoilState(keyResultsHighlightsType)

  const handleOpenModal = useCallback(
    (item: HighlightCard) => {
      if (item.type !== CARD_TYPES.KRMEMBERS) {
        setKeyResultHighlightType(item.type)
      }

      setHighlightModalConfig({
        isOpen: true,
        type: item.type,
        usersIds: item.usersIds ?? undefined,
      })
    },

    [setHighlightModalConfig, setKeyResultHighlightType],
  )

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
    <VStack>
      <Text w="100%" fontSize={14} color="new-gray.800" fontWeight="medium">
        {title}
      </Text>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {data?.map((item) => (
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
            onClick={() => (item.quantity > 0 ? handleOpenModal(item) : undefined)}
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
        ))}
      </Grid>
    </VStack>
  )
}

export default HighlightSection
