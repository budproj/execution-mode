import { useCallback, useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { User } from 'src/components/User/types'

import { UserRoutineDataProperties } from '../../types'

export type RequestReturnMapped = {
  data: UserRoutineDataProperties
  userId: User['id']
}

interface UseGetRoutineHighlightsDataReturn {
  isLoading: boolean
  teamRoutineHighlightsData: RequestReturnMapped[]
}

export const useGetRoutineHighlightsData = (
  usersIds: Array<User['id']>,
): UseGetRoutineHighlightsDataReturn => {
  const [isLoading, setIsLoading] = useState(false)

  const { servicesPromise } = useContext(ServicesContext)
  const [teamRoutineHighlightsData, setTeamRoutineHighlightsData] = useState<RequestReturnMapped[]>(
    [],
  )

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      setIsLoading(true)
      const { routines } = await servicesPromise
      const results = await Promise.all(
        usersIds.map(async (userId) => {
          const { data: routineData } = await routines.get<UserRoutineDataProperties>(
            `/answers/overview/user/${userId}`,
          )

          const newResult = { data: routineData ?? [], userId }

          return newResult
        }),
      )
      setTeamRoutineHighlightsData(results)
    } catch (error: unknown) {
      console.error('Error fetching highlights table content', error)
    } finally {
      setIsLoading(false)
    }
  }, [servicesPromise, usersIds])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { isLoading, teamRoutineHighlightsData }
}
