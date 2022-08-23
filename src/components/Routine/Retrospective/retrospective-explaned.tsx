import { Stack, Text } from '@chakra-ui/react'
import React from 'react'

import SubmitAnswerButton from '../Drawer/Base/submit-answer-button'
import ExplanatoryText from '../Drawer/Questions/explanatory-text'

const RetrospectiveExplanatory = () => {
  return (
    <ExplanatoryText>
      <Stack>
        <Text as="h2" color="new-gray.900" fontWeight="bold" fontSize={21} mb={2}>
          Boas-vindas à sua Retrospectiva da Semana!
        </Text>
        <Text color="new-gray.700" fontSize={18}>
          Participar dessa rotina no Bud é uma excelente maneira de manter um bom alinhamento sobre
          as prioridades e o bem-estar de cada membro do time.
        </Text>

        <Text color="new-gray.700" fontSize={18} pt={6}>
          Esse questionário leva cerca de <b>2 minutos</b>:
        </Text>
        <Text color="new-gray.700" fontSize={18} pt={10} mb="20px !important">
          <b style={{ color: '#6F6EFF' }}>Lembre-se: </b> <p />
          Suas respostas ficarão visíveis para todos na empresa.
        </Text>
        <SubmitAnswerButton />
      </Stack>
    </ExplanatoryText>
  )
}

export default RetrospectiveExplanatory
