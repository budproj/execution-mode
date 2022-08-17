import { List, ListItem, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import ExplanatoryText from '../Drawer/Questions/explanatory-text'

const RetrospectiveExplanatory = () => {
  return (
    <ExplanatoryText>
      <Stack>
        <Text as="h2" color="new-gray.900" fontWeight="bold" fontSize={21}>
          Olá, tudo bem? Esse é o seu check-in semanal
        </Text>
        <Text color="new-gray.700" fontSize={18}>
          Agora você pode contar com a ajuda do seu time e líder para organizar as suas prioridades,
          e principalmente dar feedbacks e contribuições para você. Como funciona:
        </Text>
        <List>
          <ListItem>1. Você preenche esse check in semanal</ListItem>
          <ListItem>
            2. Tudo vai para uma página da sua equipe onde todos podem entender o que está
            acontecendo e se ajudarem.
          </ListItem>
          <ListItem>3. Na segunda-feira vamos lembrar você de checar as respostas</ListItem>
          <ListItem>
            4. Assim você contribui e também aproveita a ajuda de todos para evoluir e voar!
          </ListItem>
        </List>
      </Stack>
    </ExplanatoryText>
  )
}

export default RetrospectiveExplanatory
