import { useContext, useEffect } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const usePendingRoutines = () => {
  const { servicesPromise } = useContext(ServicesContext)
  // Const [routines, setPendingRoutines] = useRecoilState(pendingRoutinesAtom)

  const getPendingRoutines = async () => {
    const { routines } = await servicesPromise
    const { data: pendingRoutines } = await routines.get('/pending')
    // SetPendingRoutines(pendingRoutines)
  }

  useEffect(() => {
    getPendingRoutines()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return 'ds'
}
