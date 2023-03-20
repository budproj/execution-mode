import { useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { UserRoutineDataProperties } from 'src/components/Page/Team/Highlights/modals/UsersTeamList'
import { User } from 'src/components/User/types'

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

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
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

      setTeamRoutineHighlightsData((previous) => [...previous, ...results])
      setIsLoading(false)
    }

    fetchData()
  }, [servicesPromise, usersIds])

  return { isLoading, teamRoutineHighlightsData }
}
