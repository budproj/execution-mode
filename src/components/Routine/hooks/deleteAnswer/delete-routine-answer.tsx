import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab/'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { overviewDataAtom } from 'src/state/recoil/routine/overview-data'

import { OverviewData } from '../../RetrospectiveTab/RoutinesOverview'
import { AnswerType } from '../../RetrospectiveTab/retrospective-tab-content'
import { usePendingRoutines } from '../getPendingRoutine'

import messages from './messages'

export const useDeleteRoutineAnswer = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const { getPendingRoutines } = usePendingRoutines()
  const intl = useIntl()

  const toaster = useToast()
  const router = useRouter()

  const queryPath = router.query?.id
  const [id] = Array.isArray(queryPath) ? queryPath : [queryPath]
  const [answerSummary, setAnswerSummary] = useRecoilState(answerSummaryAtom)
  const setRoutineOverviewData = useSetRecoilState(overviewDataAtom)

  const routineTabName = useRoutineTab()

  const deleteRoutineAnswer = async (answerId: AnswerType['id']) => {
    const { routines } = await servicesPromise

    const refetchRoutineData = async () => {
      const answerSummaryFiltered = answerSummary.map((answer) =>
        answer.id === answerId
          ? {
              userId: answer.userId,
              name: answer.name,
              picture: answer.picture,
            }
          : answer,
      )
      setAnswerSummary(answerSummaryFiltered)

      const { data: answersOverview } = await routines.get<OverviewData>(
        `/answers/overview/${id ?? ''}`,
        {
          params: { includeSubteams: false },
        },
      )
      if (answersOverview) setRoutineOverviewData(answersOverview)
      await getPendingRoutines()
    }

    try {
      await routines.delete(`/answer/${answerId}`)

      await refetchRoutineData()
      toaster({
        title: intl.formatMessage(messages.successDeleteToastMessage),
        status: 'success',
      })

      if (id) router.push(`/explore/${id}?activeTab=${routineTabName}`)
    } catch {
      toaster({
        title: intl.formatMessage(messages.warningDeleteToastMessage),
        status: 'error',
      })
    }
  }

  return { deleteRoutineAnswer }
}
