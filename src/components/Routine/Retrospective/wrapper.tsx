import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

import RoutineDrawer from '../Drawer/Base/drawer'
import NumericalScale from '../Drawer/Questions/numerical-scale'
import OpenEndend from '../Drawer/Questions/open-endend'
import Satisfaction from '../Drawer/Questions/satisfaction'

import RetrospectiveExplanatory from './retrospective-explaned'

const RetrospectiveRoutine = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showedQuestion, setShowedQuestion] = useState(1)

  // Vou ter um arrayMap contendo os diferentes tipos de perguntas (children) que posso passar para o Drawer
  // No Drawer, vou ter um botão de passar, que aparece mediante o index do children que está nele (posso passar como prop)]
  // Esse botão executa uma função que é passada via prop

  const questions = new Map([
    [1, <RetrospectiveExplanatory key={1} />],
    [2, <Satisfaction key={2} question="Como você se sentiu essa semana?" />],
    [3, <OpenEndend key={3} question="Qual o principal motivo da sua resposta?" />],
    [4, <NumericalScale key={4} question="O quão produtiva você sente que foi a sua semana?" />],
    [5, <OpenEndend key={3} question="O que atrapalhou sua produtividade?" />],
    [
      6,
      <NumericalScale key={3} question="Quanta clareza você está sentindo sobre a estratégia?" />,
    ],
    [
      7,
      <OpenEndend
        key={5}
        question="Quais são as coisas mais importantes que você fez essa semana?"
        description="Conte sobre o que foram suas prioridades e as coisas que te deixaram com mais orgulho. Usar tópicos pode ajudar bastante também."
      />,
    ],
    [8, <OpenEndend key={6} question="E para a próxima semana, quais são suas prioridades?" />],
  ])

  const handleClose = () => {
    setIsOpen(false)
  }

  const afterQ = () => {
    setShowedQuestion((actual) => actual + 1)
  }

  const comeBack = () => {
    setShowedQuestion((actual) => actual - 1)
  }

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>ABRE ESSA BAGACA</Button>}
      <RoutineDrawer
        isOpen={isOpen}
        index={showedQuestion}
        onClose={handleClose}
        onPass={afterQ}
        onBack={comeBack}
      >
        {questions.get(showedQuestion)}
      </RoutineDrawer>
    </>
  )
}

export default RetrospectiveRoutine
