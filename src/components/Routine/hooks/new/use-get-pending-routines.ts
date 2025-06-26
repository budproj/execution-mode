import { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { pendingRoutinesAtom } from 'src/state/recoil/routine/pending-routines'

export const usePendingRoutines = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const [routines, setPendingRoutines] = useRecoilState(pendingRoutinesAtom)

  const getPendingRoutines = async () => {
    const { routines } = await servicesPromise
    const pendingRoutines = await routines.getPendingRoutines()
    if (pendingRoutines) setPendingRoutines(pendingRoutines)
  }

  useEffect(() => {
    getPendingRoutines()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { routines, getPendingRoutines }
}
