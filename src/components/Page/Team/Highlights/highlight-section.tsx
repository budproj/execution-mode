import { Grid, GridProps, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { HighLightCardComponent } from './highlight-card'
import { CARD_TYPES } from './utils/card-types'

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
  return (
    <VStack>
      <Text w="100%" fontSize={14} color="new-gray.800" fontWeight="medium">
        {title}
      </Text>
      <Grid gap={3} w="100%" templateColumns={gridTemplate}>
        {data?.map((item) => (
          <HighLightCardComponent key={item.type} item={item} />
        ))}
      </Grid>
    </VStack>
  )
}

export default HighlightSection
