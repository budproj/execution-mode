import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import messages from 'src/components/Cycle/ActionModals/UpdateCycleModal/messages'
import { Team } from 'src/components/Team/types'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { isOpenRoutineRedirectTeamPage } from 'src/state/recoil/routine/opened-routine-redirect-team-drawer'
import {
  RetrospectiveAnswer,
  retrospectiveRoutineListAtom,
} from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'
import {
  retrospectiveRoutineSelector,
  routineFormQuestions,
} from 'src/state/recoil/routine/routine-form-questions'
import { routineAnswersReturnedData } from 'src/state/recoil/routine/user-teams'

import { FormQuestion } from '../../Drawer/Questions/types'

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

  const setRoutineFormAnswers = useCallback(async () => {
    const { routines } = await servicesPromise

    const requiredQuestionsIDs = formQuestions.filter(({ required }) => required === true)

    let unansweredRequiredQuestions: FormQuestion

    const overrideAnswers: RetrospectiveAnswer[] = []

    const allRequiredAnswersHaveBeenFilled = requiredQuestionsIDs.every((requiredQuestion) => {
      const answer = answers.find(({ questionId }) => questionId === requiredQuestion.id)
      console.log({ requiredQuestion })

      if (!answer && !requiredQuestion.hidden) {
        unansweredRequiredQuestions = requiredQuestion
      }

      if (!answer && requiredQuestion.hidden) {
        const newAnswer = [
          {
            questionId: requiredQuestion.id,
            value: '',
            hidden: true,
          },
        ]

        overrideAnswers.push(...newAnswer)
      }

      return requiredQuestion?.hidden ? true : Boolean(answer?.value)
    })

    if (allRequiredAnswersHaveBeenFilled) {
      const { data } = await routines.post<Team[]>('/answer', [...answers, ...overrideAnswers])

      if (data) {
        setIsRoutineDrawerOpen(false)
        setAnswers(() => [])

        if (data.length > 1) {
          setUserTeams(data)
          resetCurrentQuestionIndex(0)
          setRedirectTeamDrawerIsOpen(true)
        } else {
          router.push(`/explore/${data[0].id}#retrospectiva`)
        }
      } else {
        toaster({
          title: intl.formatMessage(messages.unknownErrorToastMessage),
          status: 'error',
        })
      }
    } else {
      setShowedQuestion(() => filteredFormQuestions.indexOf(unansweredRequiredQuestions))
      toaster({
        title: intl.formatMessage(submitAnswersMessages.aRequiredQuestionHasNotBeenAnswered),
        status: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { setRoutineFormAnswers }
}
