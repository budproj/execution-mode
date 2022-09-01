import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import getConfig from 'src/config'
import { pendingRoutinesAtom } from 'src/state/recoil/routine/pending-routines'

const config = getConfig()
export const usePendingRoutines = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [routines, setPendingRoutines] = useRecoilState(pendingRoutinesAtom)
  const routinesApi = config.publicRuntimeConfig.api.routines

  const getPendingRoutines = async () => {
    const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    fetch(`${routinesApi}/pending`, {
      method: 'GET',
      headers,
    })
      .then(async (response) => response.json())
      .then((pendingRoutines) => {
        setPendingRoutines(pendingRoutines)
      })
  }

  useEffect(() => {
    getPendingRoutines()
  }, [])

  return routines
}
