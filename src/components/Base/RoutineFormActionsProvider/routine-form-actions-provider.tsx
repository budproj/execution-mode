import React, { createContext, ReactElement, useContext } from 'react'
import { useRecoilState } from 'recoil'

import { useRoutineFormAnswers } from 'src/components/Routine/hooks/setRoutineFormAnswers/set-routine-form-answers'
import { currentRoutinePropertiesAtom } from 'src/state/recoil/routine/current-routine-properties'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'

interface RoutinesFormContextData {
  afterQuestion(): void
  comeBack(): void
  handleClick(): void
}

export const RoutinesFormContext = createContext<RoutinesFormContextData>(
  {} as RoutinesFormContextData,
)

interface ChildrenProperty {
  children: ReactElement
}

export const RoutinesFormActionsProvider = ({ children }: ChildrenProperty) => {
  const [{ size }] = useRecoilState(currentRoutinePropertiesAtom)
  const [currentQuestionIndex, setShowedQuestion] = useRecoilState(
    retrospectiveRoutineIndexQuestionAtom,
  )

  const { setRoutineFormAnswers } = useRoutineFormAnswers()

  const afterQuestion = () => {
    setShowedQuestion((currentValue) => currentValue + 1)
  }

  const comeBack = () => {
    setShowedQuestion((currentQuestionIndex) => currentQuestionIndex - 1)
  }

  const handleClick = () => {
    if (size && currentQuestionIndex < size - 1) afterQuestion()
    if (size && currentQuestionIndex === size - 1) setRoutineFormAnswers()
  }

  return (
    <RoutinesFormContext.Provider value={{ afterQuestion, comeBack, handleClick }}>
      {children}
    </RoutinesFormContext.Provider>
  )
}

export function useRoutinesFormActions(): RoutinesFormContextData {
  const context = useContext(RoutinesFormContext)

  if (!context) {
    throw new Error('useRoutinesFormActions must be used within an RoutineFormActionsProvider')
  }

  return context
}
