/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

export const postCreateTeamSettings = () => {
  const { servicesPromise } = useContext(ServicesContext)

  return async (companyId: Team['id']) => {
    const { routines } = await servicesPromise

    await routines.post(`/settings/${companyId}`, {})
  }
}
