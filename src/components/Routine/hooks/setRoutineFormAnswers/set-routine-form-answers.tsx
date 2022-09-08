import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'
import { isOpenRoutineRedirectTeamPage } from 'src/state/recoil/routine/opened-routine-redirect-team-drawer'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'
import { retrospectiveRoutineIndexQuestionAtom } from 'src/state/recoil/routine/retrospective-showed-question'
import { routineAnswersReturnedData } from 'src/state/recoil/routine/user-teams'

export const useRoutineFormAnswers = () => {
  const setUserTeams = useSetRecoilState(routineAnswersReturnedData)
  const { servicesPromise } = useContext(ServicesContext)
  const setRedirectTeamDrawerIsOpen = useSetRecoilState(isOpenRoutineRedirectTeamPage)
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)
  const resetCurrentQuestionIndex = useSetRecoilState(retrospectiveRoutineIndexQuestionAtom)

  const router = useRouter()

  const answers = useRecoilValue(retrospectiveRoutineListAtom)

  const setRoutineFormAnswers = useCallback(async () => {
    const { routines } = await servicesPromise
    const { data } = await routines.post<Team[]>('/answer-form', [...answers])

    setIsRoutineDrawerOpen(false)
    if (data.length > 1) {
      setUserTeams(data)
      resetCurrentQuestionIndex(0)
      setRedirectTeamDrawerIsOpen(true)
    } else {
      router.push(`/explore/${data[0].id}#retrospectiva`)
    }
  }, [])

  return { setRoutineFormAnswers }
}
