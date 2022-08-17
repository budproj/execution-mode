import { Box, Flex, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface ExplanatoryTextProperties {
  question: string
  description?: string
}

const OpenEndend = ({ question, description }: ExplanatoryTextProperties) => {
  return (
    <Stack align="center">
      <Box display="flex" flexDir="column" alignItems="left" width="100%" gap={2} marginBottom={16}>
        <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
          {question}
        </Text>
        {description && (
          <Text color="new-gray.700" fontSize={16}>
            {description}
          </Text>
        )}
      </Box>

      <Input
        variant="flushed"
        placeholder="Clique para começar a digitar"
        _placeholder={{ color: 'new-gray.500' }}
        fontSize={21}
        color="new-gray.800"
      />
      <Flex pt={2} color="new-gray.700" fontSize={15}>
        <b>Shift &#8593;&nbsp;</b> +&nbsp;<b>Enter &#x23CE; &nbsp;</b>para fazer quebra de linha
      </Flex>
    </Stack>
  )
}

export default OpenEndend
