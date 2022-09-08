import { useCallback, useContext } from 'react'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { retrospectiveRoutineListAtom } from 'src/state/recoil/routine/retrospective-routine-answers'

export const useRoutineFormAnswers = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const answers = useRecoilValue(retrospectiveRoutineListAtom)

  const setRoutineFormAnswers = useCallback(async () => {
    const { routines } = await servicesPromise
    const { data } = await routines.post('/answer-form', [...answers])

    return data
  }, [])

  return { setRoutineFormAnswers }
}
