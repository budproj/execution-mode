import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

import RoutineDrawer from '../Drawer/Base/drawer'
import RoutineFormQuestion from '../Drawer/Questions'
import { FormQuestion } from '../Drawer/Questions/types'
import { useRoutineFormQuestions } from '../hooks/new/use-get-routine-form'

const updateDependQuestions = (questionId: string, value: string) => (question: FormQuestion) => {
  if (question.conditional?.dependsOn !== questionId) {
    return question
  }

  const dependentQuestionType = question.conditional.type
  const dependentValue =
    question.conditional[dependentQuestionType as keyof FormQuestion['conditional']]

  if (dependentQuestionType === 'road_block') {
    const hiddenQuestion = value !== (dependentValue === true ? 'y' : 'n')

    return {
      ...question,
      hidden: hiddenQuestion,
    }
  }

  const hiddenQuestion = value > dependentValue
  return {
    ...question,
    hidden: hiddenQuestion,
  }
}

const RetrospectiveRoutine = () => {
  const [isRoutineDrawerOpen, setIsRoutineDrawerOpen] = useRecoilState(routineDrawerOpened)
  const { routinesFormQuestions: questions, setRoutinesFormQuestions } = useRoutineFormQuestions()

  const currentQuestionIndex = useRecoilValue(retrospectiveRoutineIndexQuestionAtom)
  const [answers, setAnswers] = useRecoilState(retrospectiveRoutineListAtom)

  const selectAnswer = (questionId: string) => {
    const selectedAnswer = answers.find((answer) => answer.questionId === questionId)

    return selectedAnswer?.value
  }

  const reviewQuestions = (questionId: string, value: string) => {
    setRoutinesFormQuestions((questions) => {
      const mappedQuestions = questions.map(updateDependQuestions(questionId, value))
      return mappedQuestions
    })
  }

  const setAnswer = (questionId: string, value: string, hidden?: boolean) => {
    const filteredAnswers = answers.filter((answer) => answer.questionId !== questionId)

    const answer = { questionId, value, hidden }

    setAnswers([...filteredAnswers, answer])
    reviewQuestions(questionId, value)
  }

  const retrospectiveFormQuestions = questions.map((retrospectiveQuestion, index) => {
    return (
      <RoutineFormQuestion
        key={retrospectiveQuestion.id}
        {...retrospectiveQuestion}
        formQuestionIndex={index}
        setAnswer={setAnswer}
        answer={selectAnswer(retrospectiveQuestion.id)}
      />
    )
  })

  return (
    <RoutineDrawer
      isOpen={isRoutineDrawerOpen}
      formSize={retrospectiveFormQuestions.length}
      onClose={() => setIsRoutineDrawerOpen(false)}
    >
      {retrospectiveFormQuestions[currentQuestionIndex]}
    </RoutineDrawer>
  )
}

export default RetrospectiveRoutine
