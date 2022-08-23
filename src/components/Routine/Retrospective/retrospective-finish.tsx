import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { ArrowRight } from 'src/components/Icon'

import ExplanatoryText from '../Drawer/Questions/explanatory-text'

const RedirectStyledButton = styled(Button)`
  border-color: #b5c0db;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  max-width: fit-content;
  font-weight: medium;
  color: #525f7f;
  border-width: 2px;
`

const RetrospectiveFinish = () => {
  return (
    <ExplanatoryText>
      <Stack>
        <Text as="h2" color="new-gray.900" fontWeight="bold" fontSize={21}>
          Pronto!
        </Text>
        <Text color="new-gray.700" fontSize={18}>
          Sua resposta foi registrada e já está disponível para visualização nos times dos quais
          você faz parte.
          <p />
          <br />
          <br /> Para a página de qual deles você deseja ir?
        </Text>
        <Flex pt={8} gap={3}>
          <Button
            borderColor="new-gray.500"
            padding={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={18}
            maxW="fit-content"
            fontWeight="medium"
            color="new-gray.800"
            borderWidth={2}
          >
            Produto <ArrowRight ml={2} w={2} fill="current" desc="sada" />
          </Button>

          <RedirectStyledButton>
            Marketing e Vendas <ArrowRight ml={2} w={2} fill="current" desc="sada" />
          </RedirectStyledButton>
        </Flex>
      </Stack>
    </ExplanatoryText>
  )
}

export default RetrospectiveFinish
