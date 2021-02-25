import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

import TeamTag from 'src/components/Team/Tag'
import UserAvatarEmptyState from 'src/components/User/AvatarEmptyState'

const SettingsAccountHeader = () => (
  <Flex gridGap={4} alignItems="center">
    <UserAvatarEmptyState size="xl" />

    <Flex direction="column" gridGap={4}>
      <Flex direction="column" gridGap={1}>
        <Heading as="h2" color="black.900" fontSize="xl" fontWeight={500}>
          Daniel De Lucca
        </Heading>

        <Text color="gray.400" fontSize="md" fontWeight={400}>
          Engenheiro de Software Sênior
        </Text>
      </Flex>

      <Flex gridGap={2} alignItems="flex-start">
        <TeamTag>Produto</TeamTag>
        <TeamTag>Marketing</TeamTag>
      </Flex>
    </Flex>
  </Flex>
)

export default SettingsAccountHeader
