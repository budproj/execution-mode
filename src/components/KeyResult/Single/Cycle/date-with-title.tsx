import { ColorProps, Flex, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'

export interface CycleDateWithTitleProperties {
  title: string
  color?: ColorProps['color']
  formattedDate?: string
  isLoaded?: boolean
}

const DateWithTitle = ({ isLoaded, title, formattedDate, color }: CycleDateWithTitleProperties) => (
  <Flex alignItems="flex-start" direction="column">
    <Text fontWeight={300} color="gray.300">
      {title}
    </Text>
    <Skeleton isLoaded={isLoaded}>
      <Text color={color}>{formattedDate ?? 'Sample date'}</Text>
    </Skeleton>
  </Flex>
)

DateWithTitle.defaultProps = {
  color: 'gray.300',
}

export default DateWithTitle
