import { useContext, useEffect, useState, useMemo, useCallback } from 'react'

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
  const [teamRoutineHighlightsData, setTeamRoutineHighlightsData] = useState<RequestReturnMapped[]>(
    [],
  )
  const { servicesPromise } = useContext(ServicesContext)

  const fetchData = useCallback(async () => {
    const { routines } = await servicesPromise
    setIsLoading(true)
    try {
      const results: RequestReturnMapped[] = []
      for await (const userId of usersIds) {
        const { data: routineData } = await routines.get<UserRoutineDataProperties>(
          `/answers/overview/user/${userId}`,
        )
        results.push({ data: routineData ?? [], userId })
        await delay(350)
      }

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

  const memoizedValue = useMemo(
    () => ({ isLoading, teamRoutineHighlightsData }),
    [isLoading, teamRoutineHighlightsData],
  )

  return memoizedValue
}

// eslint-disable-next-line no-promise-executor-return
const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
