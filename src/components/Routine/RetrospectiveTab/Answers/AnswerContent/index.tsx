import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/history-answers'

const AnswerContent = () => {
  // Ao inves de receber answer, vou receber o answerId, e vou dá-lhe um useEffect aqui que faz o request com os dados deste
  // answerId para montar a tela com os dados em questão
  const answerDetailed = useRecoilValue(answerDetailedAtom)

  const feelindAnswer = answerDetailed.answers.find((answer) => answer.type === 'roadblock')

  return (
    <VStack align="flex-start" padding={10}>
      <HistoryAnswers answers={answerDetailed.history} />
      {answerDetailed.answers.map((answer) => (
        <RoutineAnswerCard key={answer.id} answerData={answer} />
      ))}
    </VStack>
  )
}

export default AnswerContent
