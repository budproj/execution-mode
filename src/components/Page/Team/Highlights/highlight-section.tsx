import { Grid, GridProps, Text, VStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { configHighlightModal } from 'src/state/recoil/team/highlight/is-open-highlight-modal'

import { CARD_TYPES } from './utils/card-types'
import { highlightCardTheme } from './utils/theme'

export type HightlightCard = {
  type: CARD_TYPES
  title: string
  quantity: number
}

interface HighlightSectionProperties {
  title: string
  data: HightlightCard[]
  gridTemplate: GridProps['templateColumns']
}

const HighlightSection = ({ title, data, gridTemplate }: HighlightSectionProperties) => {
  const setHighlightModalConfig = useSetRecoilState(configHighlightModal)

  const handleOpenModal = useCallback(
    (type) => {
      setHighlightModalConfig({ isOpen: true, type })
    },
    [setHighlightModalConfig],
  )

  return (
    <VStack>
      <Text w="100%" fontSize={14} color="new-gray.800" fontWeight="medium">
        {title}
      </Text>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {data.map((item) => (
          <VStack
            key={item.title}
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
            onClick={item.quantity >= 1 ? () => handleOpenModal(item.type) : undefined}
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
              {item.title.toUpperCase()}
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
