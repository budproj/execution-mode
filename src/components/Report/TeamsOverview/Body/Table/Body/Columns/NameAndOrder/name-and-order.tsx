import { Flex, GridItem, Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Team } from 'src/components/Team/types'

export interface TeamsOverviewBodyTableBodyColumnNameAndOrderProperties {
  order: number
  team?: Team
}

const TeamsOverviewBodyTableBodyColumnNameAndOrder = ({
  order,
  team,
}: TeamsOverviewBodyTableBodyColumnNameAndOrderProperties) => {
  const intl = useIntl()
  const isLoaded = Boolean(team)

  return (
    <GridItem>
      <Flex gridGap={4} alignItems="center">
        <Flex
          borderRadius="full"
          bg="brand.50"
          w={10}
          h={10}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="brand.500" fontSize="md" fontWeight={700}>
            {intl.formatNumber(order, { minimumIntegerDigits: 2 })}
          </Text>
        </Flex>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 21)}>
          <Heading as="h3" fontSize="md" fontWeight={400} color="black.900">
            {team?.name}
          </Heading>
        </Skeleton>
      </Flex>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyColumnNameAndOrder
