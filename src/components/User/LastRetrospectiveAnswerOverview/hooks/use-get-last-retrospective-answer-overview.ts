import { useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

import { User } from '../../types'

export interface UserRetrospectiveAnswerOverviewDataProperties {
  lastRoutineAnswerId: string
  userId?: string
  roadBlock: string
  productivity: string
  feeling: string
}

export const useGetUserLastRetrospectiveAnswerOverview = (userId: User['id']) => {
  const { servicesPromise } = useContext(ServicesContext)

  const [userRoutineData, setUserRoutineData] =
    useState<UserRetrospectiveAnswerOverviewDataProperties>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getUserRoutineData() {
      const { routines } = await servicesPromise
      try {
        setIsLoaded(false)
        const { data: routineData } =
          await routines.get<UserRetrospectiveAnswerOverviewDataProperties>(
            `/answers/overview/user/${userId}`,
          )

        if (routineData) setUserRoutineData({ ...routineData, userId })
      } catch (error: unknown) {
        console.warn({ routine_or_amplitude_server_warning: error })
      } finally {
        setIsLoaded(true)
      }
    }

    getUserRoutineData()
  }, [servicesPromise, userId])

  return { data: userRoutineData, isLoaded }
}
