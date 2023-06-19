import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

import { WandIcon } from 'src/components/Icon'

import { KeyResultSectionHeading } from '../Heading/wrapper'

export interface KeyResultSummarizeSectionProperties {
  isLoading?: boolean
  result?: boolean
}

const KeyResultSummarizeSection = ({ isLoading, result }: KeyResultSummarizeSectionProperties) => {
  isLoading = true
  result = true
  return (
    <Box>
      <KeyResultSectionHeading>EVOLUÇÃO DO RESULTADO CHAVE</KeyResultSectionHeading>

      {result ? (
        <Box marginTop="20px">
          <Text color="new-gray.700">
            Este resultado-chave foi bem recebido e visto como um objetivo importante para a
            empresa. @Patricia Carmen levantou a questão sobre o prazo e a comunicação aos
            funcionários, já @Rafael Oliveira sugeriu a validação das personas e critérios para MQL
            por meio de pesquisa de satisfação e comparação de resultados históricos de conversão e
            retenção de clientes. Com relação ao progresso do Resultado-chave, a meta é chegar de 0%
            a 30% de aumento no volume de leads no topo de funil, e a empresa já atingiu 90% dessa
            meta. Foram implementadas algumas das iniciativas propostas na revisão, como a validação
            de personas e critérios para MQL e o plano de ação para aumentar o volume de leads.
          </Text>

          <Text fontSize="12px" marginTop="18px" fontStyle="italic" color="pink.500">
            Todas as informações abaixo foram geradas por Inteligencia Artificial e são baseada nas
            interações que foram realizadas até o momento
          </Text>
        </Box>
      ) : isLoading ? (
        <Flex flexDirection="column" alignItems="center" marginTop="20px">
          <Image width="85px" src="/icons/wand_big.gif" />
          <Text color="gray.500">Escolhendo o melhor baralho para mágica</Text>
        </Flex>
      ) : (
        <Button border="1px solid #F53D7A" borderRadius="5px" width="100%" marginTop="20px">
          <WandIcon width="24px" height="24px" marginRight="5px" desc="ícone de varinha" />
          <Text color="pink.500">Entenda melhor este resultado-chave</Text>
        </Button>
      )}
    </Box>
  )
}

export default KeyResultSummarizeSection
