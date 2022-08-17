import { Box, List, ListItem, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

interface SatisfactionProperties {
  question: string
}

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid #b5c0db;
    border-radius: 3px;

    & p {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #e8eefc;
      width: 18px;
      height: 18px;
      background-color: #525f7f;
      font-size: 14px;
      border-radius: 3px;
      margin: 6px;
    }
  }
`

const Satisfaction = ({ question }: SatisfactionProperties) => {
  return (
    <Stack>
      <Text as="h2" color="new-gray.900" fontSize={21} fontWeight="bold">
        {question}
      </Text>

      <List display="flex" alignItems="center" justifyContent="space-around">
        <StyledListItem>
          <Text>Tristão</Text>
          <Box>
            <Text>1</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Text>Tristin</Text>
          <Box>
            <Text>2</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Text>Mlk neutro</Text>
          <Box>
            <Text>3</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Text>Felizin</Text>
          <Box>
            <Text>4</Text>
          </Box>
        </StyledListItem>
        <StyledListItem>
          <Text>Felizão maluco</Text>
          <Box>
            <Text>5</Text>
          </Box>
        </StyledListItem>
      </List>
    </Stack>
  )
}

export default Satisfaction
