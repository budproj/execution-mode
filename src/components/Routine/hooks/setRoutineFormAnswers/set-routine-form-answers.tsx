import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab/'
import { Team } from 'src/components/Team/types'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { isOpenRoutineRedirectTeamPage } from 'src/state/recoil/routine/opened-routine-redirect-team-drawer'
import { overviewDataAtom } from 'src/state/recoil/routine/overview-data'
import {
  RetrospectiveAnswer,
  retrospectiveRoutineListAtom,
} from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'
import { routineDatesRangeAtom } from 'src/state/recoil/routine/routine-dates-range'
import {
  retrospectiveRoutineSelector,
  routineFormQuestions,
} from 'src/state/recoil/routine/routine-form-questions'
import { routineAnswersReturnedData } from 'src/state/recoil/routine/user-teams'
import { answerSummaryLoadStateAtom } from 'src/state/recoil/routine/users-summary-load-state'

import { OverviewData } from '../../RetrospectiveTab/RoutinesOverview'
import { usePendingRoutines } from '../getPendingRoutine'
import { useFetchSummaryData } from '../useFetchSummaryData'

import submitAnswersMessages from './messages'

export const useRoutineFormAnswers = () => {
  const setUserTeams = useSetRecoilState(routineAnswersReturnedData)
  const { getPendingRoutines } = usePendingRoutines()

  const setIsAnswerSummaryLoading = useSetRecoilState(answerSummaryLoadStateAtom)
  const router = useRouter()
  const intl = useIntl()

  const { servicesPromise } = useContext(ServicesContext)

  const setRedirectTeamDrawerIsOpen = useSetRecoilState(isOpenRoutineRedirectTeamPage)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)
  const resetCurrentQuestionIndex = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const { query: routerQuery } = router
  const [id] = Array.isArray(routerQuery?.id) ? routerQuery?.id : [routerQuery?.id]

  const routerTab = Array.isArray(routerQuery?.activeTab)
    ? routerQuery?.activeTab[0]
    : routerQuery?.activeTab

  const retrospectiveTab = 'retrospective'

  const [answersSummary, setAnswerSummary] = useRecoilState(answerSummaryAtom)
  const { after, before } = useRecoilValue(routineDatesRangeAtom)
  const setRoutineOverviewData = useSetRecoilState(overviewDataAtom)
  const { fetchAnswers } = useFetchSummaryData()

  const refetchRoutineData = async (teamId: Team['id']) => {
    setIsAnswerSummaryLoading(true)
    const showedUsersIds = answersSummary.map((answer) => answer.userId)

    setAnswerSummary([])
    const { routines } = await servicesPromise

    const formattedData = await fetchAnswers({
      teamId,
      after,
      before,
      teamUsersIds: showedUsersIds,
    })

    if (formattedData) setAnswerSummary(formattedData)
    setIsAnswerSummaryLoading(false)

    const { data: answersOverview } = await routines.get<OverviewData>(
      `/answers/overview/${teamId}`,
      {
        params: { includeSubteams: false },
      },
    )
    if (answersOverview) setRoutineOverviewData(answersOverview)
    await getPendingRoutines()
  }

  const toaster = useToast()

  const [answers, setAnswers] = useRecoilState(retrospectiveRoutineListAtom)
  const formQuestions = useRecoilValue(routineFormQuestions)
  const filteredFormQuestions = useRecoilValue(retrospectiveRoutineSelector)
  const setShowedQuestion = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)
  const routineTabName = useRoutineTab()

  const setRoutineFormAnswers = async () => {
    const { routines } = await servicesPromise
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

    const answersThatShouldBeHidden: RetrospectiveAnswer[] = []
    for (const answer of answers) {
      const hiddenElement = mappedHiddenAnswers.find(
        ({ questionId }) => questionId === answer.questionId,
      )
      if (hiddenElement) answersThatShouldBeHidden.push(answer)
    }

    const { data: userTeams } = await routines.post<Team[]>('/answer', [
      ...answers.filter((answer) => !answersThatShouldBeHidden.includes(answer)),
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
        const userTeamId = userTeams[0].id

        if (userTeamId === id && routerTab === retrospectiveTab.toLocaleLowerCase()) {
          await refetchRoutineData(userTeamId)
        }

        router.push(`/explore/${userTeams[0].id}?activeTab=${routineTabName}`)
      }
    }
  }

  return { setRoutineFormAnswers }
}
