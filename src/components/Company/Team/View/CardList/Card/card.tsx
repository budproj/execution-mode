import { Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Team } from 'src/components/Company/types'
import CrownIcon from 'src/components/Icons/Crown'

import messages from './messages'

export interface TeamCardProperties {
  name?: Team['name']
  description?: Team['description']
  isCompany?: boolean
}

const TeamCard = ({ name, description, isCompany }: TeamCardProperties) => {
  const intl = useIntl()

  return (
    <Flex bg="gray.50" borderRadius="15px" py={6} px={10} direction="column" gridGap={4}>
      {isCompany && (
        <CrownIcon
          title={intl.formatMessage(messages.crownIconTitle)}
          desc={intl.formatMessage(messages.crownIconDesc)}
          w="34px"
          h="auto"
          position="absolute"
        />
      )}
      <Skeleton isLoaded={Boolean(name)} mt={8} w="80%" minH="40px">
        <Heading size="lg">{name}</Heading>
      </Skeleton>

      <SkeletonText isLoaded={Boolean(name)} noOfLines={2}>
        <Text color="gray.400">{description}</Text>
      </SkeletonText>
    </Flex>
  )
}

export default TeamCard
