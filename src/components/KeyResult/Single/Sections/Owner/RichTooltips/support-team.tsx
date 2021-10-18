import { Box, Heading, Text, HeadingProps } from '@chakra-ui/react'
import React from 'react'

const TooltipHeading = (properties: HeadingProps) => (
  <Heading
    as="h3"
    fontSize="sm"
    pt={4}
    textTransform="uppercase"
    fontWeight={500}
    color="brand.200"
    {...properties}
  />
)

export const KeyResultTooltipSupportTeam = () => (
  <Box pb={2}>
    <Text>
      O time de apoio é uma ou mais pessoas que apoiam o responsável em um resultado-chave. No Bud,
      isso significa:
    </Text>

    <TooltipHeading>CHECK-INS:</TooltipHeading>
    <Text>
      O time de apoio tambem pode fazer check-in nos resultados-chave dos quais participam.
    </Text>

    <TooltipHeading>ACESSO DE EDIÇÃO:</TooltipHeading>
    <Text>Tambem podem editar informações como título, descrição e meta.</Text>

    <TooltipHeading>NOTIFICAÇÕES:</TooltipHeading>
    <Text>
      As notificações relacionadas a este resultado-chave, como novos comentários, também serão
      enviadas ao time de apoio.
    </Text>
  </Box>
)
