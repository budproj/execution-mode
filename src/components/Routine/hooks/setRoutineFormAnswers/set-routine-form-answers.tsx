import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { isOpenRoutineRedirectTeamPage } from 'src/state/recoil/routine/opened-routine-redirect-team-drawer'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'
import {
  retrospectiveRoutineSelector,
  routineFormQuestions,
} from 'src/state/recoil/routine/routine-form-questions'
import { routineAnswersReturnedData } from 'src/state/recoil/routine/user-teams'

import submitAnswersMessages from './messages'

export const useRoutineFormAnswers = () => {
  const setUserTeams = useSetRecoilState(routineAnswersReturnedData)

  const { servicesPromise } = useContext(ServicesContext)
  const setRedirectTeamDrawerIsOpen = useSetRecoilState(isOpenRoutineRedirectTeamPage)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)
  const resetCurrentQuestionIndex = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const router = useRouter()
  const toaster = useToast()
  const intl = useIntl()

  const [answers, setAnswers] = useRecoilState(retrospectiveRoutineListAtom)
  const formQuestions = useRecoilValue(routineFormQuestions)
  const filteredFormQuestions = useRecoilValue(retrospectiveRoutineSelector)
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const setRoutineFormAnswers = async () => {
    const requiredQuestions = formQuestions.filter(
      (question) => question.required && !question.hidden,
    )
    const unansweredRequiredQuestion = requiredQuestions.find((requiredQuestion) => {
      return !answers.some((answer) => answer.questionId === requiredQuestion.id)
    })

    if (unansweredRequiredQuestion) {
      const unansweredRequiredQuestionIndex = filteredFormQuestions.findIndex(
        (question) => question.id === unansweredRequiredQuestion.id,
      )

      setShowedQuestion(unansweredRequiredQuestionIndex)
      toaster({
        title: intl.formatMessage(submitAnswersMessages.aRequiredQuestionHasNotBeenAnswered),
        status: 'error',
      })
      return
    }

    const hiddenQuestions = formQuestions.filter((question) => question.hidden)
    const mappedHiddenAnswers = hiddenQuestions.map((question) => ({
      questionId: question.id,
      value: '',
      hidden: true,
    }))

    const { routines } = await servicesPromise
    const { data: userTeams } = await routines.post<Team[]>('/answer', [
      ...answers,
      ...mappedHiddenAnswers,
    ])

    if (userTeams) {
      setIsRoutineDrawerOpen(false)
      setAnswers([])
      resetCurrentQuestionIndex(0)

      if (userTeams.length > 1) {
        setUserTeams(userTeams)
        setRedirectTeamDrawerIsOpen(true)
      } else {
        router.push(
          `/explore/${userTeams[0].id}?activeTab=retrospectiva`,
        )
      }
    }
  }

  return { setRoutineFormAnswers }
}
