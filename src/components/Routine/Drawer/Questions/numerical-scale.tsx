import { Box, List, ListItem, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

interface SatisfactionProperties {
  question: string
}

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & div {
    display: flex;

    border: 2px solid #b5c0db;
    border-radius: 4px;

    & p {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #e8eefc;
      width: 33px;
      height: 33px;
      background-color: #525f7f;
      font-size: 14px;
      border-radius: 4px;
      margin: 14px;
    }
  }
`

const NumericalScale = ({ question }: SatisfactionProperties) => {
  return (
    <Stack gap={10}>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
        {question}
      </Text>

      <List display="flex" alignItems="flex-start" justifyContent="space-between">
        <StyledListItem>
          <Box>
            <Text>1</Text>
          </Box>
          <Text fontSize={18} color="new-gray.800">
            Pouco
          </Text>
        </StyledListItem>
        <StyledListItem>
          <Box>
            <Text>2</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Box>
            <Text>3</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Box>
            <Text>4</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Box>
            <Text>5</Text>
          </Box>
          <Text fontSize={18} color="new-gray.800">
            Muito
          </Text>
        </StyledListItem>
      </List>
    </Stack>
  )
}

export default NumericalScale
