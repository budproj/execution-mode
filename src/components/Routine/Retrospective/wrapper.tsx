import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { retrospectiveRoutineListAtom } from 'src/state/recoil/routines/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routines/retrospective-showed-question'

import RoutineDrawer from '../Drawer/Base/drawer'
import NumericalScale from '../Drawer/Questions/numerical-scale'
import OpenEndend from '../Drawer/Questions/open-endend'
import Satisfaction from '../Drawer/Questions/satisfaction'
import YesOrNo from '../Drawer/Questions/yes-or-no'

import RetrospectiveExplanatory from './retrospective-explaned'
import RetrospectiveFinish from './retrospective-finish'

const RetrospectiveRoutine = () => {
  const [isOpen, setIsOpen] = useState(false)
  const showedQuestion = useRecoilValue(retrospectiveRoutineIndexQuestionAtom)
  const [answers, setAnswers] = useRecoilState(retrospectiveRoutineListAtom)

  const selectAnswer = (index: number) => {
    const selectedAnswer = answers.find((answer) => answer.answerIndex === index)

    return selectedAnswer?.answer
  }

  const setAnswer = (index: number, value: string) => {
    const exist = Boolean(selectAnswer(index))

    const filteredAnswers = exist
      ? answers.filter((answer) => answer.answerIndex !== index)
      : answers

    const answer = { answerIndex: index, answer: value }

    setAnswers([...filteredAnswers, answer])
  }

  const controlIndex = (indexRange: number, previousQuestionIndex: number) =>
    Number(selectAnswer(previousQuestionIndex)) <= indexRange ? 1 : 2

  const questions = new Map([
    [1, <RetrospectiveExplanatory key={1} />],
    [
      2,
      <Satisfaction
        key={2}
        question="Como você se sentiu essa semana?"
        answer={selectAnswer(2)}
        setAnswer={setAnswer}
        index={2}
      />,
    ],
    [
      3,
      <OpenEndend
        key={3}
        index={3}
        question="Qual o principal motivo da sua resposta?"
        answer={selectAnswer(3)}
        setAnswer={setAnswer}
      />,
    ],
    [
      4,
      <NumericalScale
        key={4}
        question="O quão produtiva você sente que foi a sua semana?"
        answer={selectAnswer(4)}
        indexRange={3}
        setAnswer={setAnswer}
        index={4}
      />,
    ],
    [
      5,
      <OpenEndend
        key={5}
        index={5}
        answer={selectAnswer(5)}
        setAnswer={setAnswer}
        question="O que atrapalhou sua produtividade?"
      />,
    ],
    [
      6,
      <NumericalScale
        key={6}
        question="Quanta clareza você está sentindo sobre a estratégia?"
        answer={selectAnswer(6)}
        setAnswer={setAnswer}
        indexRange={3}
        index={6}
      />,
    ],
    [
      7,
      <OpenEndend
        key={7}
        index={7}
        answer={selectAnswer(7)}
        setAnswer={setAnswer}
        question="O que sobre a estratégia não está claro para você?"
      />,
    ],
    [
      8,
      <OpenEndend
        key={8}
        index={8}
        answer={selectAnswer(8)}
        setAnswer={setAnswer}
        question="Quais são as coisas mais importantes que você fez essa semana?"
        previousIndexQuestion={controlIndex(3, 6)}
      />,
    ],
    [
      9,
      <OpenEndend
        key={9}
        index={9}
        answer={selectAnswer(9)}
        setAnswer={setAnswer}
        question="E para a próxima semana, quais são suas prioridades?"
      />,
    ],
    [
      10,
      <YesOrNo
        key={10}
        question="Alguma coisa bloqueia ou preocupa você?"
        answer={selectAnswer(10)}
        setAnswer={setAnswer}
        index={10}
      />,
    ],
    [
      11,
      <OpenEndend
        key={11}
        index={11}
        answer={selectAnswer(11)}
        setAnswer={setAnswer}
        question="O que te bloqueia ou te preocupa?"
      />,
    ],
    [
      12,
      <OpenEndend
        key={12}
        index={12}
        answer={selectAnswer(12)}
        setAnswer={setAnswer}
        question="Quer deixar algum recado para o time? :)"
        previousIndexQuestion={selectAnswer(10) === 'y' ? 1 : 2}
      />,
    ],
    [13, <RetrospectiveFinish key={13} />],
  ])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>ABRE ESSA BAGACA</Button>}
      <RoutineDrawer
        isOpen={isOpen}
        index={showedQuestion}
        formSize={questions.size}
        onClose={handleClose}
      >
        {questions.get(showedQuestion)}
      </RoutineDrawer>
    </>
  )
}

export default RetrospectiveRoutine
