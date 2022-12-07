import { Grid, GridProps, Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { CARD_TYPES } from './utils/card-types'
import { highlightCardTheme } from './utils/theme'

export type HighlightCard = {
  type: CARD_TYPES
  quantity: number
  usersIds: string[]
}

interface HighlightSectionProperties {
  title: string
  data?: HighlightCard[]
  gridTemplate: GridProps['templateColumns']
}

const HighlightSection = ({ title, data, gridTemplate }: HighlightSectionProperties) => {
  const setHighlightModalConfig = useSetRecoilState(configHighlightModal)

  const handleOpenModal = useCallback(
    (item: HighlightCard) => {
      setHighlightModalConfig({ isOpen: true, type: item.type, usersIds: item.usersIds })
    },
    [setHighlightModalConfig],
  )

  const cardTitle = new Map([
    [CARD_TYPES.FEELING, 'desanimados'],
    [CARD_TYPES.PRODUCTIVITY, 'baixa produtividade'],
    [CARD_TYPES.ROADBLOCK, 'bloqueio'],
    [CARD_TYPES.CHECKIN, 'check-in atrasado'],
    [CARD_TYPES.CONFIDENCE, 'baixa confiança'],
    [CARD_TYPES.KRMEMBERS, 'membros sem krs'],
    [CARD_TYPES.BARRIER, 'barreira'],
  ])

  return (
    <VStack>
      <Text w="100%" fontSize={14} color="new-gray.800" fontWeight="medium">
        {title}
      </Text>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {data?.map((item) => (
          <VStack
            key={cardTitle.get(item.type)}
            cursor={item.quantity > 0 ? 'pointer' : 'auto'}
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
            onClick={() => (item.quantity > 0 ? handleOpenModal(item) : false)}
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
