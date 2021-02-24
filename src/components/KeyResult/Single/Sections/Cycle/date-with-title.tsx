import { ColorProps, Flex, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

export interface CycleDateWithTitleProperties {
  label: MessageDescriptor
  isLoaded: boolean
  color?: ColorProps['color']
  date?: Date
}

const DateWithTitle = ({ isLoaded, label, date, color }: CycleDateWithTitleProperties) => {
  const intl = useIntl()

  return (
    <Flex alignItems="flex-start" direction="column">
      <Text fontWeight={300} color="black.300">
        {intl.formatMessage(label)}
      </Text>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 20)}>
        <Text color={color}>{intl.formatDate(date)}</Text>
      </Skeleton>
    </Flex>
  )
}

DateWithTitle.defaultProps = {
  color: 'black.300',
  isLoaded: true,
}

export default DateWithTitle
