import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import RoutineDrawer from '../Drawer/Base/drawer'
import RoutineFormQuestion from '../Drawer/Questions'

import { retrospectiveRoutineFormQuestiosMock } from './utils/mocked'

const RetrospectiveRoutine = () => {
  const [isRoutineDrawerOpen, setIsRoutineDrawerOpen] = useRecoilState(routineDrawerOpened)
  const showedQuestion = useRecoilValue(retrospectiveRoutineIndexQuestionAtom)
  const [answers, setAnswers] = useRecoilState(retrospectiveRoutineListAtom)

  const selectAnswer = (questionId: string) => {
    const selectedAnswer = answers.find((answer) => answer.questionId === questionId)

    return selectedAnswer?.questionAnswer
  }

  const setAnswer = (questionId: string, questionAnswer: string) => {
    const exist = Boolean(selectAnswer(questionId))

    const filteredAnswers = exist
      ? answers.filter((answer) => answer.questionId !== questionId)
      : answers

    const answer = { questionId, questionAnswer }

    setAnswers([...filteredAnswers, answer])
  }

  const retrospectiveFormQuestions = retrospectiveRoutineFormQuestiosMock.map(
    (retrospectiveQuestion, index) => {
      const { id, type, heading, content, conditional, properties } = retrospectiveQuestion

      return (
        <RoutineFormQuestion
          key={id}
          id={id}
          type={type}
          properties={properties}
          content={content}
          conditional={conditional}
          answer={selectAnswer(id)}
          setAnswer={setAnswer}
          heading={heading}
          formQuestionIndex={index}
        />
      )
    },
  )

  return (
    <RoutineDrawer
      isOpen={isRoutineDrawerOpen}
      formSize={retrospectiveFormQuestions.length}
      onClose={() => setIsRoutineDrawerOpen(false)}
    >
      {retrospectiveFormQuestions[showedQuestion.currentQuestionIndex]}
    </RoutineDrawer>
  )
}

export default RetrospectiveRoutine
