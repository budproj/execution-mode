import { Flex, Box, Avatar, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const NamedAvatar = (): ReactElement => (
  <Flex alignItems="center" justifyContent="flex-end" gridGap={15}>
    <Avatar name="Bruno Delorence" />

    <Box>
      <Text color="gray.600" fontWeight={500}>
        Bruno Delorence
      </Text>
      <Text fontSize="sm" color="gray.600">
        Apple
      </Text>
    </Box>
  </Flex>
)

export default NamedAvatar
